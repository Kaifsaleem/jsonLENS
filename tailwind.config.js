/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Use class strategy for dark mode
    theme: {
        extend: {
            colors: {
                // Light theme colors
                light: {
                    background: '#F9F9F9',
                    primary: '#333333',
                    secondary: '#666666',
                    accent: '#0066CC',
                    border: '#E0E0E0',
                },
                // Dark theme colors
                dark: {
                    background: '#121212',
                    primary: '#FFFFFF',
                    secondary: '#B3B3B3',
                    accent: '#FF9800',
                    border: '#444444',
                }
            },
        },
    },
    plugins: [],
}
