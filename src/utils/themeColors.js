// Theme color utility functions
export const getThemeColor = (colorName, theme = 'light') => {
  const colors = {
    light: {
      primary: '#1E3A5F',      // Deep blue/teal
      secondary: '#5F7A8B',   // Muted dusty blue
      accent: '#4682B4',      // Medium blue
      neutral: '#87CEEB',     // Light sky blue
      base: '#FAF9F6',        // Pale cream
    },
    dark: {
      primary: '#37353E',
      secondary: '#44444E',
      accent: '#715A5A',
      neutral: '#D3DAD9',
      base: '#1a1a1a',
    },
  };
  
  return colors[theme]?.[colorName] || colors.light[colorName];
};

// Get button classes based on theme
export const getButtonClasses = (variant = 'primary', size = 'md') => {
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn',
    lg: 'btn-lg',
  };
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    neutral: 'btn-neutral',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
  };
  
  return `${sizeClasses[size]} ${variantClasses[variant]} text-white`;
};

