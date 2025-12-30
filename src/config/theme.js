export const THEME_COLORS = {
    light: {
        primary: '#1E3A5F',      // Deep blue/teal (bottom stripe - darkest)
        secondary: '#5F7A8B',   // Muted dusty blue (fourth stripe)
        accent: '#4682B4',      // Medium blue (third stripe)
        neutral: '#87CEEB',     // Light sky blue (second stripe)
        base: '#FAF9F6',        // Pale cream/off-white (top stripe - lightest)
    },
    dark: {
        primary: '#37353E',      // Dark gray
        secondary: '#44444E',   // Medium gray
        accent: '#715A5A',      // Muted brown
        neutral: '#D3DAD9',     // Light gray
        base: '#1a1a1a',        // Dark base
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

