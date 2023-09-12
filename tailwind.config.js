/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./*.html", "./public/pages/*.html"],
  theme: {
    extend: {},
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': 'clamp(1rem, 0.8490723981900452rem + 0.6899547511312218vw, 1.953rem)',
      '4xl': 'clamp(1.2rem, 1.0034615384615384rem + 0.8984615384615384vw, 2.441rem)',
      '5xl': '3.052rem',
      '6xl': 'clamp(1.25rem, 1.0520361990950227rem + 0.904977375565611vw, 2.5rem)',
      '7xl': 'clamp(1.875rem, 1.5582579185520362rem + 1.4479638009049773vw, 3.875rem);',
      '8xl': 'clamp(3.625rem, 3.308257918552036rem + 1.4479638009049773vw, 5.625rem)',
      '9xl': '112px',
    }
  },
  plugins: [],
};
