
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'heading': ['Plein', 'sans-serif'],
				'body': ['Switzer', 'sans-serif'],
				'code': ['JetBrains Mono', 'monospace'],
			},
			colors: {
				'background-secondary': 'hsl(var(--background-secondary))',
				grey: {
					light: 'hsl(var(--grey-light))',
					DEFAULT: 'hsl(var(--grey))',
					dark: 'hsl(var(--grey-dark))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					mid: 'hsl(var(--primary-mid))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					mid: 'hsl(var(--secondary-mid))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					mid: 'hsl(var(--accent-mid))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			boxShadow: {
				soft: 'var(--shadow-soft)',
				medium: 'var(--shadow-medium)',
				strong: 'var(--shadow-strong)',
				accent: 'var(--shadow-accent)',
				secondary: 'var(--shadow-secondary)',
				hover: 'var(--shadow-hover)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(0.5rem)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'progress-fill': {
					'0%': { transform: 'scaleX(0)' },
					'100%': { transform: 'scaleX(1)' }
				},
				'collapsible-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-collapsible-content-height)', opacity: '1' }
				},
				'collapsible-up': {
					from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'float-zoe': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'slide-down-banner': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '0.5' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				'live-breathe': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.65' }
				},
				'dot-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'progress-fill': 'progress-fill 0.7s ease-out both',
				'collapsible-down': 'collapsible-down 0.25s ease-out',
				'collapsible-up': 'collapsible-up 0.2s ease-out',
				'float-zoe': 'float-zoe 2.5s ease-in-out infinite',
				'slide-down-banner': 'slide-down-banner 0.4s cubic-bezier(0.4, 0, 0.2, 1) both',
				'ripple': 'ripple 0.6s linear forwards',
				'live-breathe': 'live-breathe 2.2s ease-in-out infinite',
				'dot-pulse': 'dot-pulse 2.2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
