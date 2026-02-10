(() => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const DARK_MODE_KEY = 'darkMode';

    const setDarkMode = (enabled) => {
        document.body.classList.toggle('dark-mode', enabled);
        darkModeToggle.textContent = enabled ? '☀️' : '🌙';
    };

    const savedPreference = localStorage.getItem(DARK_MODE_KEY);
    if (savedPreference === null) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
        localStorage.setItem(DARK_MODE_KEY, String(prefersDark));
    } else {
        setDarkMode(savedPreference === 'true');
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = !document.body.classList.contains('dark-mode');
        setDarkMode(isDarkMode);
        localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));
    });
})();
