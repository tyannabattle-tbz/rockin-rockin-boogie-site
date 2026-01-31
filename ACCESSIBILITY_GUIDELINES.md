# Rockin' Rockin' Boogie - Accessibility Guidelines for Future Development

**Version:** 1.0  
**Date:** January 30, 2026  
**WCAG Compliance Level:** AA  
**Author:** Manus AI

---

## Table of Contents

1. [Introduction](#introduction)
2. [Core Principles](#core-principles)
3. [HTML Best Practices](#html-best-practices)
4. [CSS Best Practices](#css-best-practices)
5. [JavaScript Best Practices](#javascript-best-practices)
6. [Testing Procedures](#testing-procedures)
7. [Common Pitfalls](#common-pitfalls)
8. [Checklist for New Features](#checklist-for-new-features)

---

## Introduction

This document establishes accessibility standards for the Rockin' Rockin' Boogie website. All new features, pages, and components must follow these guidelines to maintain WCAG Level AA compliance and ensure the site is usable by everyone, including people with disabilities.

**Accessibility is not optional—it is a requirement.**

---

## Core Principles

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

- **Provide text alternatives** for all non-text content (images, icons, videos)
- **Ensure sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
- **Make content distinguishable** from background
- **Support multiple sensory modalities** (visual, auditory, tactile)

### 2. Operable
User interface components and navigation must be operable.

- **Make all functionality available from the keyboard**
- **Provide sufficient time** for users to read and use content
- **Avoid content that causes seizures** (no flashing more than 3 times per second)
- **Help users navigate** with clear, consistent navigation

### 3. Understandable
Information and user interface operation must be understandable.

- **Make text readable and understandable**
- **Make pages appear and operate in predictable ways**
- **Help users avoid and correct mistakes**
- **Use clear language** and avoid jargon

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

- **Use valid HTML** and semantic markup
- **Use ARIA attributes** correctly
- **Support assistive technologies** (screen readers, voice control, etc.)
- **Test with real assistive technologies**

---

## HTML Best Practices

### 1. Use Semantic HTML

**✅ Good:**
```html
<header>
    <h1>Page Title</h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
</header>

<main>
    <article>
        <h2>Article Title</h2>
        <p>Content...</p>
    </article>
</main>

<footer>
    <p>&copy; 2026</p>
</footer>
```

**❌ Bad:**
```html
<div id="header">
    <div id="title">Page Title</div>
    <div id="nav">
        <div class="link"><a href="#home">Home</a></div>
        <div class="link"><a href="#about">About</a></div>
    </div>
</div>

<div id="content">
    <div id="article">
        <div id="article-title">Article Title</div>
        <p>Content...</p>
    </div>
</div>

<div id="footer">
    <p>&copy; 2026</p>
</div>
```

**Why:** Semantic HTML helps screen readers understand page structure and meaning.

---

### 2. Always Provide Alt Text for Images

**✅ Good:**
```html
<!-- Descriptive alt text -->
<img src="seabrun-1970s.jpg" alt="Seabrun Candy Hunter performing on stage in 1970s">

<!-- Decorative image -->
<img src="divider.png" alt="">

<!-- Complex image with description -->
<figure>
    <img src="album-cover.jpg" alt="Rockin' Rockin' Boogie album cover">
    <figcaption>Album cover from 1975 release</figcaption>
</figure>
```

**❌ Bad:**
```html
<!-- No alt text -->
<img src="seabrun-1970s.jpg">

<!-- Vague alt text -->
<img src="seabrun-1970s.jpg" alt="image">

<!-- Redundant alt text -->
<img src="seabrun-1970s.jpg" alt="Image of Seabrun Candy Hunter">
```

**Alt Text Guidelines:**
- **Descriptive:** Convey the meaning and purpose of the image
- **Concise:** 50-125 characters ideal (under 150 maximum)
- **Context-aware:** Include relevant details (era, location, people)
- **Decorative images:** Use empty alt text (`alt=""`)
- **Linked images:** Describe the link destination, not the image

---

### 3. Associate Labels with Form Inputs

**✅ Good:**
```html
<!-- Explicit label association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- Implicit label association -->
<label>
    Email Address
    <input type="email" name="email" required>
</label>

<!-- With aria-label for icon buttons -->
<button aria-label="Submit form">→</button>
```

**❌ Bad:**
```html
<!-- No label -->
<input type="email" name="email" placeholder="Email">

<!-- Mismatched id/for -->
<label for="email1">Email Address</label>
<input type="email" id="email2" name="email">

<!-- Label not associated -->
<p>Email Address</p>
<input type="email" name="email">
```

**Why:** Labels help all users understand form purpose, especially screen reader users.

---

### 4. Use Heading Hierarchy

**✅ Good:**
```html
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Sub-subsection Title</h4>
```

**❌ Bad:**
```html
<h1>Main Page Title</h1>
<h3>Section Title</h3>  <!-- Skipped h2 -->
<h2>Subsection Title</h2>  <!-- Went back up -->
<h4>Sub-subsection Title</h4>
```

**Why:** Screen readers use heading hierarchy to understand page structure and allow users to navigate by headings.

---

### 5. Use ARIA Attributes Correctly

**✅ Good:**
```html
<!-- Button with aria-label -->
<button aria-label="Close menu">×</button>

<!-- Live region for status updates -->
<div role="status" aria-live="polite">
    File uploaded successfully
</div>

<!-- Expandable section -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div id="menu" hidden>
    <a href="#home">Home</a>
    <a href="#about">About</a>
</div>

<!-- Pressed button state -->
<button aria-pressed="false">Toggle</button>
```

**❌ Bad:**
```html
<!-- Redundant aria-label -->
<button aria-label="Submit">Submit</button>

<!-- Incorrect role -->
<div role="button" onclick="...">Click me</div>

<!-- Mismatched aria-controls -->
<button aria-controls="menu">Menu</button>
<div id="nav">...</div>  <!-- Wrong id -->
```

**Common ARIA Attributes:**
- `aria-label`: Provides accessible name for element
- `aria-labelledby`: Links element to labeling element
- `aria-describedby`: Links element to description
- `aria-live`: Announces dynamic content updates
- `aria-pressed`: Indicates button toggle state
- `aria-expanded`: Indicates if expandable content is open/closed
- `aria-hidden`: Hides element from screen readers
- `role`: Defines element's purpose to assistive technologies

---

### 6. Ensure Proper Link Text

**✅ Good:**
```html
<!-- Descriptive link text -->
<a href="/about">Learn more about our mission</a>

<!-- Link with title attribute -->
<a href="/documentation" title="Full API documentation">Docs</a>

<!-- Icon link with aria-label -->
<a href="/github" aria-label="Visit our GitHub repository">
    <svg>...</svg>
</a>
```

**❌ Bad:**
```html
<!-- Vague link text -->
<a href="/about">Click here</a>

<!-- Empty link -->
<a href="/page"></a>

<!-- Icon link without label -->
<a href="/github">
    <svg>...</svg>
</a>
```

**Why:** Screen reader users often navigate by links. Descriptive link text helps them understand where links go.

---

## CSS Best Practices

### 1. Ensure Sufficient Color Contrast

**✅ Good:**
```css
/* High contrast text */
.text-light { color: #ffffff; }  /* 21:1 on dark background */
.text-dark { color: #000000; }   /* 21:1 on light background */

/* Accessible colors */
.text-primary { color: #0066cc; }  /* 8.6:1 on white */
.text-secondary { color: #666666; }  /* 7.5:1 on white */
```

**❌ Bad:**
```css
/* Low contrast text */
.text-gray { color: #999999; }  /* 4.3:1 on white - fails AA */
.text-light-gray { color: #cccccc; }  /* 2.3:1 on white - fails A */
```

**Contrast Requirements:**
- **Normal text:** 4.5:1 (WCAG AA), 7:1 (WCAG AAA)
- **Large text (18pt+):** 3:1 (WCAG AA), 4.5:1 (WCAG AAA)
- **UI components:** 3:1 (WCAG AA)

**Tools to Check Contrast:**
- https://webaim.org/resources/contrastchecker/
- https://contrast-ratio.com/

---

### 2. Provide Visible Focus Indicators

**✅ Good:**
```css
/* Visible focus indicator */
button:focus, a:focus, input:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
}

/* High contrast focus indicator */
.dark-theme button:focus {
    outline: 3px solid #ffff00;
    outline-offset: 2px;
}
```

**❌ Bad:**
```css
/* Hidden focus indicator */
button:focus { outline: none; }

/* Low contrast focus indicator */
button:focus { outline: 1px solid #cccccc; }
```

**Why:** Keyboard users need to see which element has focus. Focus indicators must be visible and have sufficient contrast.

---

### 3. Support Reduced Motion

**✅ Good:**
```css
/* Default: animations enabled */
@keyframes slide-in {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

.element {
    animation: slide-in 0.3s ease-in;
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**❌ Bad:**
```css
/* No reduced motion support */
.element {
    animation: slide-in 0.3s ease-in;
}
```

**Why:** People with vestibular disorders can experience dizziness or nausea from animations.

---

### 4. Use Readable Fonts and Sizing

**✅ Good:**
```css
/* Readable font stack */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 16px;
    line-height: 1.5;
}

/* Scalable text */
h1 { font-size: 2em; }  /* Scales with user's default */
p { font-size: 1em; }
```

**❌ Bad:**
```css
/* Hard-to-read font */
body {
    font-family: 'Comic Sans MS', cursive;
    font-size: 12px;
    line-height: 1;
}
```

**Font Guidelines:**
- **Minimum size:** 16px for body text
- **Line height:** 1.5 or greater
- **Letter spacing:** 0.12em or greater
- **Word spacing:** 0.16em or greater
- **Sans-serif fonts:** Generally more readable on screens

---

### 5. Design for Mobile Accessibility

**✅ Good:**
```css
/* Touch-friendly buttons */
button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 24px;
}

/* Adequate spacing */
button + button {
    margin-left: 12px;
}

/* Responsive layout */
@media (max-width: 768px) {
    button {
        min-height: 48px;
        display: block;
        width: 100%;
    }
}
```

**❌ Bad:**
```css
/* Too small buttons */
button {
    padding: 4px 8px;
    font-size: 12px;
}

/* No spacing between buttons */
button { margin: 0; }
```

**Mobile Guidelines:**
- **Touch targets:** Minimum 44x44px (48x48px recommended)
- **Spacing:** At least 8px between interactive elements
- **Responsive:** Test on actual mobile devices
- **Orientation:** Support both portrait and landscape

---

## JavaScript Best Practices

### 1. Maintain Keyboard Accessibility

**✅ Good:**
```javascript
// Handle keyboard events
button.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        button.click();
    }
});

// Manage focus
button.addEventListener('click', () => {
    nextElement.focus();
});
```

**❌ Bad:**
```javascript
// Only mouse events
element.addEventListener('click', () => {
    // This won't work for keyboard users
});

// No keyboard support
button.addEventListener('mousedown', () => {
    // Keyboard users can't trigger this
});
```

**Why:** Not all users can use a mouse. All interactive elements must work with keyboard.

---

### 2. Update ARIA Attributes Dynamically

**✅ Good:**
```javascript
// Update aria-expanded when toggling
button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
    menu.hidden = isExpanded;
});

// Update aria-live region
const status = document.querySelector('[role="status"]');
status.textContent = 'File uploaded successfully';
```

**❌ Bad:**
```javascript
// No ARIA updates
button.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    // Screen reader users don't know menu state changed
});
```

**Why:** Screen readers need to know when content changes dynamically.

---

### 3. Manage Focus Properly

**✅ Good:**
```javascript
// Move focus to new content
const dialog = document.querySelector('[role="dialog"]');
dialog.addEventListener('opened', () => {
    // Focus first input in dialog
    const firstInput = dialog.querySelector('input');
    firstInput.focus();
});

// Return focus when closing
dialog.addEventListener('closed', () => {
    triggerButton.focus();
});
```

**❌ Bad:**
```javascript
// No focus management
dialog.style.display = 'block';
// Focus remains on trigger button, user doesn't know dialog opened
```

**Why:** Screen reader users need to know when focus changes to understand page state.

---

### 4. Announce Dynamic Content

**✅ Good:**
```javascript
// Use aria-live for status updates
const status = document.createElement('div');
status.setAttribute('role', 'status');
status.setAttribute('aria-live', 'polite');
status.textContent = 'Loading...';
document.body.appendChild(status);

// Update status
status.textContent = 'Content loaded';
```

**❌ Bad:**
```javascript
// No announcement
const status = document.createElement('div');
status.textContent = 'Loading...';
document.body.appendChild(status);
// Screen reader users don't know content is loading
```

**Why:** Screen reader users need to know about important status changes.

---

### 5. Test with Real Assistive Technologies

**✅ Good:**
```javascript
// Code tested with:
// - NVDA (Windows screen reader)
// - JAWS (Windows screen reader)
// - VoiceOver (macOS/iOS)
// - TalkBack (Android)
// - Keyboard-only navigation
```

**❌ Bad:**
```javascript
// Code only tested in browser
// Not tested with screen readers
// Not tested with keyboard-only navigation
```

**Why:** Assistive technologies work differently than standard browsers.

---

## Testing Procedures

### Before Deploying Any New Feature

1. **Automated Testing**
   - [ ] Run axe DevTools scan
   - [ ] Run WAVE checker
   - [ ] Run Lighthouse accessibility audit
   - [ ] Fix all critical and serious issues

2. **Manual Testing**
   - [ ] Test keyboard navigation (Tab, Shift+Tab, Enter, Space)
   - [ ] Test with screen reader (NVDA or VoiceOver)
   - [ ] Test on mobile device
   - [ ] Test at 200% zoom
   - [ ] Test with reduced motion enabled

3. **Cross-Browser Testing**
   - [ ] Chrome/Chromium
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

4. **Accessibility Audit**
   - [ ] Color contrast verified (4.5:1 minimum)
   - [ ] Focus indicators visible
   - [ ] Alt text present and descriptive
   - [ ] Form labels present
   - [ ] ARIA attributes correct
   - [ ] Heading hierarchy logical
   - [ ] No keyboard traps
   - [ ] Status messages announced

---

## Common Pitfalls

### 1. Using Color Alone to Convey Information

**❌ Bad:**
```html
<!-- Users who are colorblind can't see the difference -->
<p style="color: red;">Error</p>
<p style="color: green;">Success</p>
```

**✅ Good:**
```html
<!-- Use text and icons in addition to color -->
<p style="color: red;">❌ Error: Please fill in all fields</p>
<p style="color: green;">✓ Success: Form submitted</p>
```

---

### 2. Removing Focus Indicators

**❌ Bad:**
```css
button:focus { outline: none; }
```

**✅ Good:**
```css
button:focus { outline: 3px solid #0066cc; outline-offset: 2px; }
```

---

### 3. Using Placeholder as Label

**❌ Bad:**
```html
<input type="email" placeholder="Email address">
```

**✅ Good:**
```html
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="user@example.com">
```

---

### 4. Not Testing with Real Users

**❌ Bad:**
```
Assume accessibility is complete without testing
```

**✅ Good:**
```
Test with real assistive technology users
Gather feedback and iterate
```

---

### 5. Using Images for Text

**❌ Bad:**
```html
<img src="heading.png" alt="">  <!-- Text in image, no alt -->
```

**✅ Good:**
```html
<h1>Heading Text</h1>  <!-- Real text -->
```

---

## Checklist for New Features

Before launching any new feature, verify:

- [ ] **HTML Structure**
  - [ ] Semantic HTML used
  - [ ] Proper heading hierarchy
  - [ ] Form labels associated
  - [ ] ARIA attributes correct

- [ ] **Visual Design**
  - [ ] Color contrast ≥ 4.5:1
  - [ ] Focus indicators visible
  - [ ] Text size ≥ 16px
  - [ ] Line height ≥ 1.5

- [ ] **Functionality**
  - [ ] All features work with keyboard
  - [ ] All features work with screen reader
  - [ ] Status messages announced
  - [ ] Focus managed properly

- [ ] **Mobile**
  - [ ] Touch targets ≥ 44x44px
  - [ ] Responsive layout
  - [ ] Works on iOS and Android
  - [ ] Tested on real devices

- [ ] **Testing**
  - [ ] Automated tests pass
  - [ ] Manual tests pass
  - [ ] Cross-browser testing pass
  - [ ] Accessibility audit pass

- [ ] **Documentation**
  - [ ] Changes documented
  - [ ] Issues logged if any
  - [ ] Fixes documented

---

## Resources

**WCAG 2.1 Guidelines:**
- https://www.w3.org/WAI/WCAG21/quickref/

**Testing Tools:**
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

**Screen Readers:**
- NVDA: https://www.nvaccess.org/
- JAWS: https://www.freedomscientific.com/
- VoiceOver: Built-in to macOS/iOS
- TalkBack: Built-in to Android

**Learning Resources:**
- WebAIM: https://webaim.org/
- A11y Project: https://www.a11yproject.com/
- MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- Inclusive Components: https://inclusive-components.design/

---

## Questions?

If you have questions about accessibility requirements, refer to:
1. This guidelines document
2. WCAG 2.1 specification
3. Consult with accessibility specialist
4. Test with real users

---

**Last Updated:** January 30, 2026  
**Next Review:** Quarterly  
**Status:** Active
