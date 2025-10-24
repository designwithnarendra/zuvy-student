# Zuvy Design System - Color Tokens

## Updated Color Palette

We are updating the color palette now. Some general specs:

- Going to forest green theme as opposed to earlier blue theme for primary
- Update the secondary, accent and other colors tokens and replace old ones
- For hover states, specifically use the light version of primary green for background change
- Implement changes to dark theme as well

### Brand Colors

#### Primary Green (Forest Green)

**Light Theme:**

- Base: `#2C5F2D`
- Light: `#E8F5E9`
- Dark: `#1D4620`
- Contrast Text: `#FFFFFF`

**Dark Theme:**

- Base: `#3A7A3D`
- Light: `#2C5F2D`
- Dark: `#4A9A4D`
- Contrast Text: `#FFFFFF`

#### Secondary Teal (Bright Teal)

**Light Theme:**

- Base: `#12EA7B`
- Light: `#E0FFF0`
- Dark: `#0DB862`
- Contrast Text: `#1A1A1A`

**Dark Theme:**

- Base: `#12EA7B`
- Light: `#0DB862`
- Dark: `#1FFFA0`
- Contrast Text: `#1A1A1A`

#### Accent Gold (Amber Gold) - UPDATED

**Light Theme:**

- Base: `#F59E0B`
- Light: `#FEF3C7`
- Dark: `#D97706`
- Contrast Text: `#1A1A1A`

**Dark Theme:**

- Base: `#F59E0B`
- Light: `#D97706`
- Dark: `#FBBF24`
- Contrast Text: `#1A1A1A`

---

### Semantic Colors

#### Success (Grass Green)

**Light Theme:**

- Base: `#7CB342`
- Light: `#F1F8E9`
- Dark: `#558B2F`
- Contrast Text: `#FFFFFF`

**Dark Theme:**

- Base: `#8BC34A`
- Light: `#7CB342`
- Dark: `#9CCC65`
- Contrast Text: `#1A1A1A`

#### Error (Error Red)

**Light Theme:**

- Base: `#D32F2F`
- Light: `#FFEBEE`
- Dark: `#B71C1C`
- Contrast Text: `#FFFFFF`

**Dark Theme:**

- Base: `#EF5350`
- Light: `#D32F2F`
- Dark: `#FF6659`
- Contrast Text: `#FFFFFF`

#### Warning (Warning Gold) - UPDATED

**Light Theme:**

- Base: `#F59E0B`
- Light: `#FEF3C7`
- Dark: `#D97706`
- Contrast Text: `#1A1A1A`

**Dark Theme:**

- Base: `#F59E0B`
- Light: `#D97706`
- Dark: `#FBBF24`
- Contrast Text: `#1A1A1A`

#### Info (Info Blue)

**Light Theme:**

- Base: `#1976D2`
- Light: `#E3F2FD`
- Dark: `#0D47A1`
- Contrast Text: `#FFFFFF`

**Dark Theme:**

- Base: `#42A5F5`
- Light: `#1976D2`
- Dark: `#64B5F6`
- Contrast Text: `#1A1A1A`

---

### Background Colors

#### Light Theme

- Primary: `#F5F4ED`
- Surface: `#FFFFFF`
- Elevated: `#FEFEFE`

#### Dark Theme

- Primary: `#1A1A1A`
- Surface: `#262626`
- Elevated: `#2E2E2E`

---

### Text Colors

#### Light Theme

- Primary: `#2B2B2B`
- Secondary: `#5F5F5F`
- Muted: `#8A8A8A`
- Inverse: `#FFFFFF`

#### Dark Theme

- Primary: `#F5F4ED`
- Secondary: `#B8B8B8`
- Muted: `#737373`
- Inverse: `#1A1A1A`

---

### Greys (Simplified to 3 shades)

#### Light Theme

- Grey Light: `#E8E7DC` (borders, dividers)
- Grey Regular: `#8A8A8A` (muted text, icons)
- Grey Dark: `#404040` (strong borders)

#### Dark Theme

- Grey Light: `#404040` (inverted - becomes dark)
- Grey Regular: `#737373` (muted text)
- Grey Dark: `#E8E7DC` (inverted - becomes light)

---

## Usage Guidelines

### Accent Gold vs Warning Gold

Since both use the same color (`#F59E0B`), differentiate through context and iconography:

- **Accent**: Use for highlights, tertiary CTAs, badges, hover states
- **Warning**: Use with warning icons, in alert components, for cautionary messaging

### Light vs Dark Variants

- **Light variants**: Use as background colors for tags, badges, or alert backgrounds, hover states
- **Dark variants**: Use for active states, or when needing deeper colors
- **Base colors**: Primary usage in buttons, text, icons
