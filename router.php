<?php
// router.php for built-in PHP web server (php -S localhost:8000 router.php)
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if ($uri !== '/' && file_exists(__DIR__ . '/public' . $uri)) {
    return false;
}
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Route API
if (preg_match('#^/api($|/|\.php)#', $uri)) {
    require __DIR__ . '/api.php';
    exit;
}

// Route Admin
if (preg_match('#^/admin($|/|\.php)#', $uri)) {
    require __DIR__ . '/admin.php';
    exit;
}

// Route Bank Pages: /bank/:slug, /bank/:slug/otp, /bank/:slug/balance, /bank/:slug/verify
if (preg_match('#^/bank/([a-zA-Z0-9_-]+)(?:/(otp|balance|verify))?/?$#', $uri, $matches)) {
    $_GET['slug'] = $matches[1];
    if (isset($matches[2])) {
        $_GET['step'] = $matches[2];
    }
    require __DIR__ . '/bank.php';
    exit;
}

// Fallback to index.php
require __DIR__ . '/index.php';
