export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1D4ED8',
                secondary: '#9333EA',
                accent: '#10B981',
                neutral: '#4B5563'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif']
            }
        },
    },
    plugins: [],
};