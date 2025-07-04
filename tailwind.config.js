/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Pretty Yani Divine Feminine Color Palette
				divine: {
					burgundy: '#8B1538',
					'rose-gold': '#E8B4A0',
					cream: '#F5F1E8',
					ivory: '#FFFEF7',
					'deep-purple': '#4A154B',
					gold: '#D4AF37',
					'soft-pink': '#F7D7DA',
					'mystic-purple': '#6B46C1',
					'sage-green': '#87A96B',
					'warm-brown': '#8B4513'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#8B1538',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#E8B4A0',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#D4AF37',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				'divine': ['Playfair Display', 'serif'],
				'elegant': ['Inter', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'portal': {
					'0%': { 
						transform: 'scale(0.8) rotate(0deg)',
						opacity: '0'
					},
					'50%': { 
						transform: 'scale(1.1) rotate(180deg)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(1) rotate(360deg)',
						opacity: '1'
					},
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'portal': 'portal 1.5s ease-out',
			},
			backgroundImage: {
				'gradient-divine': 'linear-gradient(135deg, #8B1538 0%, #E8B4A0 50%, #D4AF37 100%)',
				'gradient-mystical': 'linear-gradient(45deg, #4A154B 0%, #6B46C1 50%, #8B1538 100%)',
				'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}