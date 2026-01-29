/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-200 */
        input: "var(--color-input)", /* gray-200 */
        ring: "var(--color-ring)", /* Deep forest trust */
        background: "var(--color-background)", /* Clean natural canvas */
        foreground: "var(--color-foreground)", /* gray-900 */
        primary: {
          DEFAULT: "var(--color-primary)", /* Deep forest trust */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Warm pineapple confidence */
          foreground: "var(--color-secondary-foreground)", /* gray-900 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-600 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-100 */
          foreground: "var(--color-muted-foreground)", /* gray-600 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Conversion focus */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* gray-900 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Subtle organic depth */
          foreground: "var(--color-card-foreground)", /* gray-900 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Environmental victory */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Gentle urgency */
          foreground: "var(--color-warning-foreground)", /* gray-900 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Helpful dental concern */
          foreground: "var(--color-error-foreground)", /* white */
        },
        tropical: {
          green: "var(--color-tropical-green)", /* green-800 */
          yellow: "var(--color-tropical-yellow)", /* yellow-600 */
          orange: "var(--color-tropical-orange)", /* orange-700 */
        },
        trust: {
          blue: "var(--color-trust-blue)", /* blue-800 */
        },
        mint: {
          white: "var(--color-mint-white)", /* green-50 */
        },
        forest: {
          green: "var(--color-forest-green)", /* green-900 */
        },
        // Standard Tailwind colors
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#134e4a',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      spacing: {
        'base': 'var(--spacing-base)',
      },
      boxShadow: {
        'organic': '0 2px 8px rgba(46, 125, 50, 0.08), 0 8px 32px rgba(46, 125, 50, 0.04)',
        'organic-hover': '0 4px 12px rgba(46, 125, 50, 0.12), 0 12px 40px rgba(46, 125, 50, 0.06)',
        'organic-lg': '0 4px 12px rgba(45, 90, 39, 0.08)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        "pulse-scale": {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
        "pulse-scale": "pulse-scale 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}