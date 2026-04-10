### Website Design & Structure Analysis: Terra's World

This document outlines the layout, design system, and animations of the provided website video, structured for AI recreation.

#### 1. Global Design System
* **Color Palette:**
    * **Backgrounds:** Crisp white, muted off-white/beige, dark nature-themed photographic backgrounds.
    * **Primary Accent:** Vibrant Lime Green (e.g., `#C4F532`) used for buttons, badges, and hero typography.
    * **Text:** Deep charcoal/black for primary text; white for text on dark backgrounds.
* **Typography:**
    * **Headings:** Modern, tight-tracking Sans-Serif (large scale).
    * **Body/Accents:** Clean Sans-Serif mixed with occasional Serif fonts for editorial emphasis (e.g., the Intro section).
* **Layout:** High-end, editorial grid. Frequent use of generous whitespace, full-bleed images, and asymmetrical split-screen layouts.

#### 2. Section Breakdown & Layout

**A. Navbar & Hero Section**
* **Navbar:** Fixed top. Left: Logo. Right: Lime green "Cart (0)" button and Hamburger menu icon.
* **Hero Layout:** Full viewport height. Center: 3D rendered bonsai/tree graphic. Left/Right: Small descriptive text blocks. Bottom: Oversized lime green title ("Terra's world") overlapping the central graphic.
* **Animation:** Parallax scroll. The large title scrolls up faster than the background image.

**B. Intro & Marquee Section**
* **Layout:** Centered block of large text mixing serif/sans-serif fonts with inline image thumbnails embedded within the text flow.
* **Marquee:** Full-width banner below the text containing continuous horizontal scrolling text ("Captivating ecosystems ⊗ Peaceful retreats").

**C. Product Carousel ("New Arrivals")**
* **Navigation:** Centered tabs ("Addon", "New Arrivals", "Bestsellers").
* **Grid:** Horizontal scrolling container of product cards.
* **Cards:** Clean white background, product image, title, price ($199), and outline style tag pills (e.g., "Desktop Moss").

**D. Featured Item ("Item of the Month")**
* **Layout:** 50/50 split.
    * Left: Product card overlapping a textured background.
    * Right: Badge ("Item of the month"), Large heading, body text, and a primary button ("View all collection ->").

**E. Benefits Section**
* **Layout:** Full-width dark forest background image. Three-column text grid overlaid at the bottom.
* **Content:** Icons (leaves/eco symbols), title ("Air-purifying Benefits"), and short descriptions in white text.

**F. Interactive Categories**
* **Layout:** Center-aligned heading. Three-column layout below.
    * Left/Right Columns: Text lists of category names.
    * Center Column: A dynamic image container.
* **Interaction:** Hovering over a text category updates the central image to match the selection.

**G. Testimonials**
* **Layout:** Horizontal scrolling row of large square cards.
* **Content:** Customer photo, review quote, and name.

**H. Showcases & News**
* **Hero Banner:** Large, full-width cinematic image ("Lasted showcases").
* **Grid:** 3-column layout of articles/case studies beneath. Each features an image, date/read-time badges, title, and excerpt.

**I. Footer**
* **Top:** Large typography ("Bringing ecosystems to your space") and basic sitemap links.
* **Middle/Background:** A large 3D graphic of a floating moss island with a butterfly, acting as a backdrop for the footer elements.
* **Bottom:** Multi-column grid containing Address, Hotline, Quick Links (Products, Categories, etc.), and Social Media text links.

#### 3. Animation & Interaction Patterns
* **Smooth Scrolling:** The site employs a smooth scroll library (like Lenis or Locomotive Scroll) for fluid momentum.
* **Reveal on Scroll:** Elements (text blocks, product cards) fade in and slide up slightly as they enter the viewport.
* **Parallax & Layering:** Background images and foreground text scroll at different speeds (z-axis translation), creating depth.
* **Hover States:** * Links and buttons feature subtle opacity shifts or underlines.
    * Category lists trigger cross-fade image swaps in the center container.
* **Continuous Motion:** CSS keyframe animations used for the infinite horizontal text marquee.