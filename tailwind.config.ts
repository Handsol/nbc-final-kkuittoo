import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dohyeon: ['BMDOHYEON', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['32px', '40px'],
        'heading-lg': ['28px', '36px'],
        'heading-md': ['24px', '32px'],
        'heading-sm': ['22px', '30px'],
        'body-xl': ['20px', '28px'],
        'body-lg': ['18px', '26px'],
        'body-md': ['16px', '24px'],
        'body-sm': ['14px', '20px'],
        'body-xs': ['12px', '18px'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: '#FDFDFD',
        black: '#171717',
        'dark-gray': '#414141',
        'medium-gray': '#7D7D7D',
        'light-gray': '#F2F2F2',
        main: '#8948FF',
        sub: '#CBADFF',
        'sub-light': '#EBE0FF',
        'sub-dark': '1A0047',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundColor: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: '#FDFDFD',
        black: '#171717',
        'dark-gray': '#414141',
        'medium-gray': '#7D7D7D',
        'light-gray': '#F2F2F2',
        main: '#8948FF',
        sub: '#CBADFF',
        'sub-light': '#EBE0FF',
        'sub-dark': '1A0047',
      },
      textColor: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: '#FDFDFD',
        black: '#171717',
        'dark-gray': '#414141',
        'medium-gray': '#7D7D7D',
        'light-gray': '#E3E3E3',
        main: '#8948FF',
        sub: '#CBADFF',
        'sub-light': '#EBE0FF',
        'sub-dark': '1A0047',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'loading-bar': 'loadingBar 1.5s infinite ease-in-out',
      },
      keyframes: {
        loadingBar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      dropShadow: {
        'sidebar-purple': '4px 0 8px rgba(104, 20, 255, 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
