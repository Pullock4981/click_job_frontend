export const THEME_COLORS = {
    light: {
        primary: '#5BADE3',      // Sky Blue (Action)
        secondary: '#81D8BF',   // Seafoam
        accent: '#FED97D',      // Pale Yellow
        neutral: '#1E293B',     // Dark slate text
        base: '#F5F7FA',        // Page background
    },
    dark: {
        primary: '#5BADE3',
        secondary: '#1E293B',
        accent: '#5BADE3',
        neutral: '#334155',
        base: '#0F172A',
    },

};


export const applyTheme = (theme) => {
    const root = document.documentElement;
    const colors = THEME_COLORS[theme];

    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // Apply custom CSS variables
    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
};

export const getStoredTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

export const setStoredTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

