// Animate sidebar on load and add hover effect handled by CSS.
// Control showing page sections except for login/create account showing modals.
// Implement play button animation and controlling audio/video playback.

document.addEventListener("DOMContentLoaded", function() {
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const topLinks = document.querySelectorAll(".top-link");
    const pageSections = document.querySelectorAll(".page-section");

    const loginModal = document.getElementById('loginModal');
    const createAccountModal = document.getElementById('createAccountModal');
    const logoutSection = document.getElementById('logout');

    const openLoginBtn = document.getElementById('openLogin');
    const openCreateBtn = document.getElementById('openCreateAccount');
    const openLogoutBtn = document.getElementById('openLogout');

    const loginCloseBtn = document.getElementById('loginClose');
    const createCloseBtn = document.getElementById('createClose');

    function showSection(id) {
        pageSections.forEach(section => {
            if(section.id === id) {
                section.classList.remove("hidden");
                section.classList.add("visible");
            } else {
                section.classList.add("hidden");
                section.classList.remove("visible");
            }
        });
    }

    // Show home by default on page load
    showSection('home');

    // Sidebar link clicks:
    sidebarLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            if (link.id === 'openLogin') {
                loginModal.classList.remove('hidden');
                showSection('home');
            } else if (link.id === 'openCreateAccount') {
                createAccountModal.classList.remove('hidden');
                showSection('home');
            } else if (link.id === 'openLogout') {
                // Show logout confirmation instead of immediate logout
                logoutSection.classList.remove('hidden');
                showSection('logout');
                loginModal.classList.add('hidden');
                createAccountModal.classList.add('hidden');
            } else {
                const page = link.getAttribute('data-page');
                if(page) {
                    showSection(page);
                }
                loginModal.classList.add('hidden');
                createAccountModal.classList.add('hidden');
                logoutSection.classList.add('hidden');
            }
        });
    });

    // Top links scroll to section
    topLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            showSection(targetId);
            loginModal.classList.add('hidden');
            createAccountModal.classList.add('hidden');
            logoutSection.classList.add('hidden');
        });
    });

    // Close modal events
    function setupModalClose(modal, closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.add('hidden');
        });
        modal.addEventListener("click", e => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    setupModalClose(loginModal, loginCloseBtn);
    setupModalClose(createAccountModal, createCloseBtn);

    // Logout confirmation buttons
    const confirmLogoutBtn = document.getElementById('confirmLogout');
    const cancelLogoutBtn = document.getElementById('cancelLogout');

    confirmLogoutBtn.addEventListener('click', () => {
        alert("You have been logged out.");
        logoutSection.classList.add('hidden');
        showSection('home');
    });

    cancelLogoutBtn.addEventListener('click', () => {
        logoutSection.classList.add('hidden');
        showSection('home');
    });

    // Stub login submit
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        alert("Logged in successfully!");
        loginModal.classList.add('hidden');
        showSection('home');
    });

    // Stub create account submit
    const createAccountForm = document.getElementById('createAccountForm');
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        alert("Account created successfully!");
        createAccountModal.classList.add('hidden');
        showSection('home');
    });

    // FAQ Answer logic
    const faqAskBtn = document.getElementById("faqAskBtn");
    const faqQuestionInput = document.getElementById("faqQuestion");
    const faqAnswerDisplay = document.getElementById("faqAnswer");

    if (faqAskBtn && faqQuestionInput && faqAnswerDisplay) {
        faqAskBtn.addEventListener("click", () => {
            const question = faqQuestionInput.value.trim().toLowerCase();
            let answer = "Sorry, I don't have an answer for that. Please contact support.";

            if (question.includes("upload")) {
                answer = "To upload songs, go to the 'Create New Account' or 'Login' and then use the upload feature.";
            } else if (question.includes("download")) {
                answer = "You can download songs by clicking the play button and then the download option.";
            } else if (question.includes("privacy")) {
                answer = "Your privacy is fully respected - only you can see your account information.";
            } else if (question.includes("login")) {
                answer = "Use your email and password at the Login section.";
            } else if (question.includes("account")) {
                answer = "You can create a new account using the 'Create New Account' section.";
            }

            faqAnswerDisplay.textContent = answer;
        });
    }

    // Manage play buttons for audio and video with sparkling animation
    const playButtons = document.querySelectorAll(".play-btn");

    playButtons.forEach(button => {
        const targetId = button.getAttribute("data-target");
        const media = document.getElementById(targetId);
        let isPlaying = false;

        button.addEventListener("click", () => {
            // Stop all other playing media and remove their animations
            playButtons.forEach(btn => {
                const otherId = btn.getAttribute("data-target");
                const otherMedia = document.getElementById(otherId);
                if(otherMedia !== media) {
                    otherMedia.pause();
                    otherMedia.currentTime = 0;
                    btn.classList.remove("playing");
                }
            });

            if(!isPlaying) {
                media.play();
                button.classList.add("playing");
                isPlaying = true;
            } else {
                media.pause();
                button.classList.remove("playing");
                isPlaying = false;
            }

            // When media ends remove playing class, reset isPlaying
            media.onended = () => {
                button.classList.remove("playing");
                isPlaying = false;
            }
        });
    });
});
