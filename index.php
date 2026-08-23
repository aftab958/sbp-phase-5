<?php
$banksJson = file_get_contents(__DIR__ . '/data/banks.json');
$banks = json_decode($banksJson, true) ?? [];

function getBankSlug($name) {
    return trim(preg_replace('/[^a-z0-9]+/i', '-', preg_replace('/[()]/', '', strtolower($name))), '-');
}

$popularBanks = array_filter($banks, fn($b) => !empty($b['popular']));

$categoryBadges = [
    'Conventional' => 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
    'Islamic'      => 'bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400',
    'Public'       => 'bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20 dark:text-blue-400',
    'Foreign'      => 'bg-purple-500/10 text-purple-600 ring-1 ring-inset ring-purple-500/20 dark:text-purple-400',
    'Specialized'  => 'bg-accent/20 text-accent-foreground ring-1 ring-inset ring-accent/30 dark:text-accent'
];

$counts = ['All' => count($banks)];
foreach (['Conventional', 'Islamic', 'Public', 'Foreign', 'Specialized'] as $cat) {
    $counts[$cat] = count(array_filter($banks, fn($b) => $b['category'] === $cat));
}
?>
<!DOCTYPE html>
<html lang="en" class="bg-background">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bank Directory | State Bank of Pakistan</title>
    <meta name="description" content="Browse licensed banks operating in Pakistan by category. A clean, informational bank directory.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/css/style.css">
    <meta name="theme-color" content="#1f8a52">
    <style>
        :root {
            --primary: #005030;
            --primary-dark: #003821;
            --primary-foreground: #f6fcf6;
            --font-urdu: 'Noto Nastaliq Urdu', serif;
        }
        body { font-family: 'Manrope', system-ui, sans-serif; }
        @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
    </style>
</head>
<body class="font-sans antialiased text-foreground selection:bg-primary/20">
    <main class="min-h-dvh">
        <!-- HEADER -->
        <header>
            <div class="border-b border-border bg-card">
                <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                    <button type="button" class="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition hover:bg-secondary" aria-label="Open menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>
                    <div class="flex items-center gap-2.5">
                        <span class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary/20">
                            <img src="/public/logos/state-bank-of-pakistan.png" onerror="this.src='https://sbp-phase-3.vercel.app/logos/state-bank-of-pakistan.png'" alt="State Bank of Pakistan logo" class="h-full w-full object-contain p-0.5">
                        </span>
                        <div class="leading-tight">
                            <p class="text-sm font-bold uppercase tracking-tight text-primary">
                                State Bank<span class="block text-[0.7rem] font-semibold text-muted-foreground">of Pakistan</span>
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <a href="/admin.php" title="View Saved Submissions" class="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition">
                            Admin JSON
                        </a>
                        <button type="button" class="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition hover:bg-secondary" aria-label="Notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
                            <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent ring-2 ring-card"></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- HERO SECTION -->
            <div class="relative overflow-hidden text-primary-foreground" style="background-image:linear-gradient(160deg, #1f8a52 0%, #135d37 100%)">
                <div aria-hidden="true" class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-primary-foreground/10"></div>
                <div aria-hidden="true" class="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full border border-primary-foreground/10"></div>
                
                <div class="relative mx-auto max-w-5xl px-4 pb-8 pt-6">
                    <div class="flex items-center gap-2">
                        <span dir="rtl" lang="ur" style="font-family:var(--font-urdu), 'Jameel Noori Nastaleeq', sans-serif" class="text-xs leading-relaxed text-primary-foreground/70">
                            بینک دولت پاکستان
                        </span>
                    </div>
                    
                    <div class="mt-4 max-w-2xl">
                        <p class="text-sm font-medium text-primary-foreground/80">Welcome to the SBP Bank Directory</p>
                        <h1 class="mt-1 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Pakistan Bank Directory</h1>
                        <p class="mt-2 text-pretty text-primary-foreground/80">Browse licensed banks operating in Pakistan. A reference directory built for a college project.</p>
                    </div>

                    <!-- STATS CARDS -->
                    <dl class="mt-6 grid grid-cols-3 gap-3">
                        <div class="rounded-xl bg-primary-foreground/10 px-3 py-3 ring-1 ring-primary-foreground/15">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                            <dt class="mt-2 text-lg font-bold leading-none"><?= count($banks) ?></dt>
                            <dd class="mt-1 text-xs text-primary-foreground/70">Licensed banks</dd>
                        </div>
                        <div class="rounded-xl bg-primary-foreground/10 px-3 py-3 ring-1 ring-primary-foreground/15">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                            <dt class="mt-2 text-lg font-bold leading-none">5</dt>
                            <dd class="mt-1 text-xs text-primary-foreground/70">Categories</dd>
                        </div>
                        <div class="rounded-xl bg-primary-foreground/10 px-3 py-3 ring-1 ring-primary-foreground/15">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <dt class="mt-2 text-lg font-bold leading-none">24/7</dt>
                            <dd class="mt-1 text-xs text-primary-foreground/70">Reference</dd>
                        </div>
                    </dl>

                    <!-- SEARCH BAR -->
                    <div class="relative mt-6">
                        <div class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                        </div>
                        <label for="bank-search" class="sr-only">Search your bank</label>
                        <input id="bank-search" type="text" placeholder="Search your bank..." class="w-full rounded-full border-0 bg-card py-3.5 pl-12 pr-11 text-base text-foreground shadow-lg outline-none ring-2 ring-transparent transition focus:ring-accent" value="">
                        <button id="clear-search" type="button" class="hidden absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary" aria-label="Clear search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                        </button>
                    </div>

                    <!-- CATEGORY PILLS -->
                    <div class="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter banks by category">
                        <button type="button" data-category="All" aria-pressed="true" class="cat-pill flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition bg-card text-primary shadow-sm">
                            All<span class="rounded-full px-1.5 text-[0.7rem] font-bold bg-primary/10 text-primary"><?= $counts['All'] ?></span>
                        </button>
                        <?php foreach (['Conventional', 'Islamic', 'Public', 'Foreign', 'Specialized'] as $cat): ?>
                        <button type="button" data-category="<?= $cat ?>" aria-pressed="false" class="cat-pill flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition bg-primary-foreground/10 text-primary-foreground ring-1 ring-inset ring-primary-foreground/20 hover:bg-primary-foreground/15">
                            <?= $cat ?><span class="rounded-full px-1.5 text-[0.7rem] font-bold bg-primary-foreground/15 text-primary-foreground/80"><?= $counts[$cat] ?></span>
                        </button>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </header>

        <!-- MAIN BODY -->
        <div class="mx-auto max-w-5xl px-4">
            <!-- POPULAR BANKS SECTION -->
            <section id="popular-section" aria-labelledby="popular-heading" class="mt-8">
                <div class="flex items-center justify-between">
                    <h2 id="popular-heading" class="text-lg font-bold tracking-tight">Popular Banks</h2>
                    <span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">Top 5</span>
                </div>
                
                <div class="group/marquee relative -mx-4 mt-4 overflow-hidden" style="mask-image:linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent);-webkit-mask-image:linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)">
                    <ul class="animate-marquee flex w-max gap-3 px-4 py-1">
                        <?php 
                        // Duplicate for smooth seamless loop
                        $marqueeList = array_merge($popularBanks, $popularBanks);
                        foreach ($marqueeList as $index => $b): 
                            $slug = getBankSlug($b['name']);
                            $isDuplicate = $index >= count($popularBanks);
                        ?>
                        <li aria-hidden="<?= $isDuplicate ? 'true' : 'false' ?>">
                            <a class="flex min-w-[7.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-center shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/bank/<?= $slug ?>" <?= $isDuplicate ? 'tabindex="-1"' : '' ?>>
                                <span class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                                    <?php if (!empty($b['logo'])): ?>
                                        <img src="/public<?= $b['logo'] ?>" onerror="this.src='https://sbp-phase-3.vercel.app<?= $b['logo'] ?>'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" alt="<?= htmlspecialchars($b['name']) ?> logo" class="h-full w-full object-contain" loading="lazy">
                                        <span class="hidden h-full w-full items-center justify-center rounded-lg font-bold text-white text-lg" style="background-color: <?= $b['color'] ?>"><?= $b['short'] ?></span>
                                    <?php else: ?>
                                        <span class="flex h-full w-full items-center justify-center rounded-lg font-bold text-white text-lg" style="background-color: <?= $b['color'] ?>"><?= $b['short'] ?></span>
                                    <?php endif; ?>
                                </span>
                                <span class="text-sm font-semibold"><?= htmlspecialchars($b['name']) ?></span>
                                <span class="text-xs text-muted-foreground"><?= htmlspecialchars($b['category']) ?></span>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </section>

            <!-- ALL BANKS GRID -->
            <section aria-labelledby="all-heading" class="mt-8">
                <div class="flex items-center justify-between">
                    <h2 id="all-heading" class="text-lg font-bold tracking-tight">All Banks</h2>
                    <span id="results-count" class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"><?= count($banks) ?> results</span>
                </div>

                <!-- NO RESULTS -->
                <div id="no-results" class="hidden mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center">
                    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-muted-foreground"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="13" x2="9" y1="9" y2="13"/><line x1="9" x2="13" y1="9" y2="13"/></svg>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-foreground">No banks found</p>
                        <p class="mt-1 text-sm text-muted-foreground">Try a different name or category filter.</p>
                    </div>
                </div>

                <ul id="banks-grid" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    <?php foreach ($banks as $b): 
                        $slug = getBankSlug($b['name']);
                        $badgeClass = $categoryBadges[$b['category']] ?? $categoryBadges['Conventional'];
                    ?>
                    <li class="bank-item" data-name="<?= strtolower(htmlspecialchars($b['name'])) ?>" data-category="<?= htmlspecialchars($b['category']) ?>">
                        <a class="group flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/bank/<?= $slug ?>">
                            <span class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                                <?php if (!empty($b['logo'])): ?>
                                    <img src="/public<?= $b['logo'] ?>" onerror="this.src='https://sbp-phase-3.vercel.app<?= $b['logo'] ?>'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" alt="<?= htmlspecialchars($b['name']) ?> logo" class="h-full w-full object-contain" loading="lazy">
                                    <span class="hidden h-full w-full items-center justify-center rounded-lg font-bold text-white text-sm" style="background-color: <?= $b['color'] ?>"><?= $b['short'] ?></span>
                                <?php else: ?>
                                    <span class="flex h-full w-full items-center justify-center rounded-lg font-bold text-white text-sm" style="background-color: <?= $b['color'] ?>"><?= $b['short'] ?></span>
                                <?php endif; ?>
                            </span>
                            <div class="min-w-0">
                                <p class="truncate text-sm font-semibold"><?= htmlspecialchars($b['name']) ?></p>
                                <span class="mt-1 inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-semibold <?= $badgeClass ?>">
                                    <?= htmlspecialchars($b['category']) ?>
                                </span>
                            </div>
                        </a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </section>
        </div>

        <!-- FOOTER -->
        <footer class="mt-10 border-t border-border bg-card">
            <div class="mx-auto max-w-5xl px-4 py-8">
                <div class="flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary/20">
                        <img src="/public/logos/state-bank-of-pakistan.png" onerror="this.src='https://sbp-phase-3.vercel.app/logos/state-bank-of-pakistan.png'" alt="State Bank of Pakistan logo" class="h-full w-full object-contain p-0.5">
                    </span>
                    <div class="leading-tight">
                        <span class="block text-sm font-bold uppercase tracking-wide">State Bank of Pakistan</span>
                        <span class="text-xs text-muted-foreground">Bank Directory</span>
                    </div>
                </div>
                <a href="https://www.sbp.org.pk" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    www.sbp.org.pk
                </a>
                <p class="mt-4 text-xs leading-relaxed text-muted-foreground">
                    © 2026 Bank Directory. Informational reference only — not an official verification portal and not affiliated with any bank.
                </p>
                <div class="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span>College Project Simulation & Testing Environment</span>
                    <a href="/admin.php" class="text-primary font-semibold hover:underline">Simulated Records Inspector &rarr;</a>
                </div>
            </div>
        </footer>
    </main>

    <script src="/public/js/main.js"></script>
</body>
</html>
