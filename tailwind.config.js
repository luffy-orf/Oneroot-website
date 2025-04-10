/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7F6',
          100: '#D8EAE7',
          200: '#B1D5CF',
          300: '#8ABFB7',
          400: '#63AA9F',
          500: '#3C9587',
          600: '#3A675F', // Original primary
          700: '#2C4F49',
          800: '#1E3733',
          900: '#0F1E1C',
        },
        secondary: {
          50: '#FFF8ED',
          100: '#FEEFD6',
          200: '#FCDFAD',
          300: '#FACF84',
          400: '#F8BF5B',
          500: '#F6AF32',
          600: '#E2882C', // Original secondary
          700: '#B36A23',
          800: '#854D1A',
          900: '#56310D',
        },
        accent: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
        '7xl': '4.5rem',   // 72px
        '8xl': '6rem',     // 96px
        '9xl': '8rem',     // 128px
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'bounce-soft': 'bounceSoft 2s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft-sm': '0 2px 4px 0 rgba(0,0,0,0.05)',
        'soft': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        'soft-md': '0 6px 10px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        'soft-lg': '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'soft-xl': '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)',
        'soft-2xl': '0 25px 50px -12px rgba(0,0,0,0.07)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0,0,0,0.03)',
        'colored-sm': '0 2px 4px 0 rgba(58, 103, 95, 0.1)',
        'colored': '0 4px 6px -1px rgba(58, 103, 95, 0.1), 0 2px 4px -1px rgba(58, 103, 95, 0.06)',
        'colored-lg': '0 10px 15px -3px rgba(58, 103, 95, 0.1), 0 4px 6px -2px rgba(58, 103, 95, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(to right bottom, var(--tw-gradient-stops))',
      },
      transitionDuration: {
        '400': '400ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}