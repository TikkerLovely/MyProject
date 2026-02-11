(() => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburgerMenu || !navMenu) return;

    const closeMenu = () => {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    };

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-container')) {
            closeMenu();
        }
    });
})();
