# Rockin' Rockin' Boogie - Accessibility Fixes To-Do List

**Priority Level:** HIGH  
**Target Completion:** Before publishing to production  
**WCAG Compliance:** Level AA

---

## 1. Add Alt Text to All Images

### 1.1 Photo Gallery Images
**File:** `index.html` (or future image gallery component)  
**Status:** [ ] Not Started  
**Impact:** Critical - WCAG Level A failure

**Action Items:**
- [ ] Identify all `<img>` tags in photo gallery section
- [ ] Add descriptive alt text following pattern: `alt="[Subject] [Context] [Date/Era if relevant]"`
- [ ] Examples to implement:
  ```html
  <!-- Current (WRONG) -->
  <img src="seabrun-1970s.jpg">
  
  <!-- Fixed (CORRECT) -->
  <img src="seabrun-1970s.jpg" alt="Seabrun Candy Hunter performing on stage in 1970s">
  ```

**Specific Images to Fix:**
- [ ] Artist/performer photos (add era and context)
- [ ] Album artwork (add album title and artist)
- [ ] Historical documentation photos (add description and date)
- [ ] Gallery carousel images (add descriptive captions)

**Testing:**
- [ ] Use screen reader (NVDA, JAWS, VoiceOver) to verify alt text is read correctly
- [ ] Disable images in browser and verify alt text is visible/descriptive

---

### 1.2 Album Artwork
**File:** `index.html` (or music/discography section)  
**Status:** [ ] Not Started  
**Impact:** High - User context loss without descriptions

**Action Items:**
- [ ] Find all album cover images
- [ ] Add alt text format: `alt="[Album Title] album cover by [Artist]"`
- [ ] Example:
  ```html
  <img src="rockin-boogie-album.jpg" alt="Rockin' Rockin' Boogie album cover by Seabrun Candy Hunter, 1975">
  ```

**Testing:**
- [ ] Verify with screen reader
- [ ] Check that alt text is concise but descriptive (50-125 characters ideal)

---

### 1.3 Recommendation Carousel Images
**File:** `index.html` (or recommendation component)  
**Status:** [ ] Not Started  
**Impact:** Medium - Carousel context loss

**Action Items:**
- [ ] Identify all carousel images
- [ ] Add alt text with recommendation context
- [ ] Example:
  ```html
  <img src="recommendation-1.jpg" alt="Related artist: The Funk Masters, 1970s soul band">
  ```

**Testing:**
- [ ] Verify carousel alt text updates when slides change
- [ ] Test with keyboard navigation (arrow keys)

---

## 2. Improve Focus Indicators for Keyboard Navigation

### 2.1 Add Visible Focus Outline
**File:** `index.html` (in `<style>` section)  
**Current Location:** Lines 7-113  
**Status:** [ ] Not Started  
**Impact:** Critical - Users cannot see which element has keyboard focus

**Action Items:**
- [ ] Add CSS rule for focus states (after line 112):
  ```css
  /* Add after line 112 */
  button:focus, 
  a:focus, 
  input:focus {
    outline: 3px solid #FFD700;
    outline-offset: 2px;
  }
  
  /* Remove default browser outline if it conflicts */
  *:focus {
    outline-color: #FFD700;
  }
  ```

- [ ] Test keyboard navigation:
  - [ ] Press Tab key to cycle through all interactive elements
  - [ ] Verify focus outline is visible on all buttons
  - [ ] Verify focus outline is visible on all links
  - [ ] Verify focus outline is visible on all form inputs

**Specific Elements to Test:**
- [ ] Upload button (line 135)
- [ ] Navigation links (lines 127-129)
- [ ] File input (line 136)

**Testing:**
- [ ] Use keyboard-only navigation (no mouse)
- [ ] Verify focus order is logical (top-to-bottom, left-to-right)
- [ ] Check contrast of focus outline against background

---

### 2.2 Improve Tab Order
**File:** `index.html`  
**Status:** [ ] Not Started  
**Impact:** Medium - Keyboard users may encounter confusing tab order

**Action Items:**
- [ ] Audit current tab order by pressing Tab key repeatedly
- [ ] Add `tabindex` attributes if needed to fix order:
  ```html
  <!-- Example: If navigation should come first -->
  <div class="nav" tabindex="0">
    <a href="#upload" tabindex="1">📤 Upload Audio</a>
    <a href="#legacy" tabindex="2">📖 The Legacy</a>
    <a href="#about" tabindex="3">ℹ️ About</a>
  </div>
  ```

- [ ] Verify tab order: Navigation → Upload Button → File Input → Legacy Section → Footer

**Testing:**
- [ ] Tab through entire page
- [ ] Verify no elements are skipped
- [ ] Verify no elements are unreachable

---

## 3. Add Pause Button for Auto-Rotating Gallery

### 3.1 Implement Gallery Pause Control
**File:** `index.html` (or future gallery component)  
**Status:** [ ] Not Started  
**Impact:** Critical - Auto-rotation can trigger vestibular issues

**Action Items:**
- [ ] Add pause/play button to gallery:
  ```html
  <div class="gallery-controls">
    <button id="pausePlayBtn" aria-label="Pause gallery auto-rotation">⏸ Pause</button>
    <span id="autoRotateStatus" aria-live="polite">Auto-rotating every 5 seconds</span>
  </div>
  ```

- [ ] Add JavaScript to handle pause/play:
  ```javascript
  let isAutoRotating = true;
  const pausePlayBtn = document.getElementById('pausePlayBtn');
  
  pausePlayBtn.addEventListener('click', () => {
    isAutoRotating = !isAutoRotating;
    pausePlayBtn.textContent = isAutoRotating ? '⏸ Pause' : '▶ Play';
    pausePlayBtn.setAttribute('aria-label', 
      isAutoRotating ? 'Pause gallery auto-rotation' : 'Resume gallery auto-rotation'
    );
  });
  ```

- [ ] Add keyboard shortcut (spacebar to pause):
  ```javascript
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement === pausePlayBtn) {
      pausePlayBtn.click();
    }
  });
  ```

**Testing:**
- [ ] Click pause button - gallery should stop rotating
- [ ] Click play button - gallery should resume rotating
- [ ] Press spacebar on pause button - should toggle pause/play
- [ ] Verify button label updates correctly
- [ ] Test with screen reader - verify status is announced

---

### 3.2 Add Reduced Motion Support
**File:** `index.html` (in `<style>` section)  
**Status:** [ ] Not Started  
**Impact:** High - Respects user accessibility preferences

**Action Items:**
- [ ] Add media query for reduced motion (after line 112):
  ```css
  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .gallery-auto-rotate {
      animation: none;
    }
  }
  ```

- [ ] Test on macOS/iOS:
  - [ ] System Preferences → Accessibility → Display → Reduce motion
  - [ ] Verify gallery does not auto-rotate

- [ ] Test on Windows:
  - [ ] Settings → Ease of Access → Display → Show animations
  - [ ] Verify gallery respects this setting

**Testing:**
- [ ] Enable "Reduce Motion" in OS settings
- [ ] Reload page
- [ ] Verify gallery animation is disabled

---

## 4. Label Form Controls

### 4.1 Add Labels to File Input
**File:** `index.html` (lines 132-138)  
**Status:** [ ] Not Started  
**Impact:** High - Screen reader users cannot identify form purpose

**Action Items:**
- [ ] Add `<label>` element for file input (before line 136):
  ```html
  <label for="fileInput" style="display: block; margin-bottom: 15px; color: #aaa;">
    Select audio files to upload (WAV, MP3, FLAC, AIFF, OGG)
  </label>
  ```

- [ ] Update file input with proper id/name:
  ```html
  <input 
    type="file" 
    id="fileInput" 
    name="audioFiles"
    accept="audio/*" 
    multiple
    aria-label="Select audio files to upload"
  >
  ```

**Testing:**
- [ ] Use screen reader to verify label is read
- [ ] Click on label text - should focus file input
- [ ] Verify label is visible and descriptive

---

### 4.2 Add Labels to Volume/Progress Controls (if present)
**File:** `index.html` (or audio player component)  
**Status:** [ ] Not Started  
**Impact:** High - Range sliders are inaccessible without labels

**Action Items:**
- [ ] Find all range input elements:
  ```html
  <!-- Current (WRONG) -->
  <input type="range" min="0" max="100">
  
  <!-- Fixed (CORRECT) -->
  <label for="volumeSlider">Volume Control</label>
  <input 
    type="range" 
    id="volumeSlider"
    name="volume"
    min="0" 
    max="100"
    aria-label="Volume control, 0 to 100 percent"
  >
  ```

- [ ] Add aria-labels for all range inputs
- [ ] Add visible labels above/beside sliders

**Testing:**
- [ ] Use screen reader to verify label is read
- [ ] Verify slider responds to keyboard (arrow keys)
- [ ] Verify current value is announced

---

### 4.3 Add ARIA Labels to Buttons Without Text
**File:** `index.html`  
**Status:** [ ] Not Started  
**Impact:** Medium - Icon-only buttons are confusing without labels

**Action Items:**
- [ ] Find all buttons with only icons (e.g., "📤", "▶", "⏸")
- [ ] Add aria-label to clarify purpose:
  ```html
  <!-- Current (WRONG) -->
  <button>📤</button>
  
  <!-- Fixed (CORRECT) -->
  <button aria-label="Upload audio files">📤</button>
  ```

- [ ] Examples to update:
  - [ ] Upload button: `aria-label="Upload audio files"`
  - [ ] Play button: `aria-label="Play audio"`
  - [ ] Pause button: `aria-label="Pause audio"`
  - [ ] Download button: `aria-label="Download audio file"`
  - [ ] Share button: `aria-label="Share audio"`

**Testing:**
- [ ] Use screen reader to verify aria-labels are read
- [ ] Verify labels are descriptive and concise

---

## 5. Color Contrast Verification

### 5.1 Check Text Contrast
**File:** `index.html` (in `<style>` section)  
**Status:** [ ] Not Started  
**Impact:** High - Low contrast fails WCAG AA standards

**Current Colors to Check:**
- [ ] Gold text (#ffd700) on dark background - VERIFY PASSES
- [ ] Gray text (#aaa) on dark background - CHECK CONTRAST
- [ ] White text on gradient backgrounds - CHECK CONTRAST

**Action Items:**
- [ ] Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- [ ] Test these combinations:
  - [ ] #ffd700 (gold) on #0a0e27 (dark blue) - should PASS
  - [ ] #aaa (gray) on #0a0e27 (dark blue) - may FAIL
  - [ ] #fff (white) on #1a1f3a (medium blue) - should PASS

- [ ] If any fail, update colors:
  ```css
  /* If #aaa fails, change to lighter gray */
  .subtitle { color: #cccccc; } /* Lighter gray */
  .legacy-section p { color: #dddddd; } /* Lighter gray */
  ```

**Testing:**
- [ ] Use browser DevTools to check computed colors
- [ ] Use WebAIM Contrast Checker for each color combination
- [ ] Verify all text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)

---

### 5.2 Check Focus Indicator Contrast
**File:** `index.html` (in `<style>` section)  
**Status:** [ ] Not Started  
**Impact:** High - Focus outline must be visible

**Action Items:**
- [ ] Verify focus outline (#FFD700) has sufficient contrast against all backgrounds
- [ ] Test focus outline on:
  - [ ] Dark background (#0a0e27)
  - [ ] Medium background (#1a1f3a)
  - [ ] Gradient backgrounds
  - [ ] Gold button background (#ffd700)

- [ ] If outline is not visible on gold button, add fallback:
  ```css
  button:focus {
    outline: 3px solid #000;
    outline-offset: 2px;
  }
  ```

**Testing:**
- [ ] Tab through all elements
- [ ] Verify focus outline is visible on every element
- [ ] Test on different background colors

---

## 6. Mobile Touch Target Size

### 6.1 Ensure Buttons are 44x44px Minimum
**File:** `index.html` (in `<style>` section)  
**Current Button Size:** Lines 45-59  
**Status:** [ ] Not Started  
**Impact:** Medium - Small buttons are hard to tap on mobile

**Action Items:**
- [ ] Update button styles to ensure minimum size:
  ```css
  .upload-btn { 
    padding: 15px 40px;  /* Current - check if this gives 44x44 */
    min-height: 44px;    /* Add this */
    min-width: 44px;     /* Add this */
  }
  
  .nav a {
    padding: 12px 25px;  /* Current - check if this gives 44x44 */
    min-height: 44px;    /* Add this */
    min-width: 44px;     /* Add this */
  }
  ```

- [ ] Verify all interactive elements meet 44x44px minimum:
  - [ ] Upload button
  - [ ] Navigation links
  - [ ] Pause/play button
  - [ ] File input (if custom styled)

**Testing:**
- [ ] Test on actual mobile devices (iPhone, Android)
- [ ] Verify buttons are easy to tap without accidentally hitting nearby elements
- [ ] Check spacing between buttons (minimum 8px gap)

---

### 6.2 Add Touch-Friendly Spacing
**File:** `index.html` (in `<style>` section)  
**Status:** [ ] Not Started  
**Impact:** Medium - Improves mobile UX

**Action Items:**
- [ ] Add spacing between interactive elements:
  ```css
  .nav {
    gap: 15px;  /* Current - increase to 20px for mobile */
  }
  
  @media (max-width: 768px) {
    .nav {
      gap: 20px;
    }
    
    button {
      min-height: 48px;  /* Larger on mobile */
    }
  }
  ```

**Testing:**
- [ ] Test on mobile devices
- [ ] Verify no accidental touches of adjacent elements
- [ ] Check that buttons don't overlap on small screens

---

## 7. Testing & Validation

### 7.1 Automated Accessibility Testing
**Status:** [ ] Not Started  
**Tools to Use:**
- [ ] axe DevTools (Chrome/Firefox extension)
- [ ] WAVE (WebAIM accessibility checker)
- [ ] Lighthouse (Chrome DevTools)

**Action Items:**
- [ ] Install axe DevTools: https://www.deque.com/axe/devtools/
- [ ] Run axe scan on index.html
- [ ] Fix all "Critical" and "Serious" issues
- [ ] Document any "Moderate" issues

- [ ] Use WAVE: https://wave.webaim.org/
- [ ] Scan index.html
- [ ] Fix all errors
- [ ] Address warnings

- [ ] Run Lighthouse audit:
  - [ ] Open DevTools → Lighthouse
  - [ ] Run "Accessibility" audit
  - [ ] Target score: 90+

**Testing:**
- [ ] All automated tests should pass
- [ ] No critical errors
- [ ] Lighthouse accessibility score ≥ 90

---

### 7.2 Manual Accessibility Testing
**Status:** [ ] Not Started  
**Tools Needed:**
- [ ] Screen reader: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- [ ] Keyboard only (no mouse)
- [ ] Browser zoom (200%)

**Action Items:**
- [ ] Test with keyboard only:
  - [ ] Tab through entire page
  - [ ] Verify all interactive elements are reachable
  - [ ] Verify tab order is logical
  - [ ] Verify focus indicators are visible

- [ ] Test with screen reader (NVDA on Windows):
  - [ ] Verify page structure is announced correctly
  - [ ] Verify all images have alt text
  - [ ] Verify all buttons have labels
  - [ ] Verify all form inputs have labels
  - [ ] Verify status messages are announced

- [ ] Test with browser zoom (200%):
  - [ ] Verify no horizontal scrolling
  - [ ] Verify text is readable
  - [ ] Verify buttons are clickable

**Testing Checklist:**
- [ ] Keyboard navigation works
- [ ] Screen reader announces all content
- [ ] Focus indicators are visible
- [ ] Page is usable at 200% zoom
- [ ] No content is hidden or inaccessible

---

### 7.3 Cross-Browser Testing
**Status:** [ ] Not Started  
**Browsers to Test:**
- [ ] Chrome (Windows/Mac/Linux)
- [ ] Firefox (Windows/Mac/Linux)
- [ ] Safari (macOS/iOS)
- [ ] Edge (Windows)

**Action Items:**
- [ ] Test each browser for:
  - [ ] Visual rendering (colors, layout, fonts)
  - [ ] Focus indicators (visible in all browsers)
  - [ ] Keyboard navigation (works in all browsers)
  - [ ] Audio player (if present)

**Testing:**
- [ ] All browsers should render consistently
- [ ] Focus indicators should be visible in all browsers
- [ ] Keyboard navigation should work in all browsers

---

## 8. Documentation & Maintenance

### 8.1 Document All Changes
**File:** `ACCESSIBILITY_FIXES_LOG.md`  
**Status:** [ ] Not Started

**Action Items:**
- [ ] Create log file documenting all changes
- [ ] For each fix, record:
  - [ ] File name
  - [ ] Line numbers
  - [ ] Change made
  - [ ] Date completed
  - [ ] Testing results

**Example:**
```markdown
## Fix: Add Alt Text to Gallery Images
- **File:** index.html
- **Lines:** 115-125
- **Change:** Added alt attributes to all <img> tags in gallery
- **Date:** 2026-01-31
- **Testing:** Verified with NVDA screen reader ✓
```

---

### 8.2 Create Accessibility Guidelines
**File:** `ACCESSIBILITY_GUIDELINES.md`  
**Status:** [ ] Not Started

**Action Items:**
- [ ] Document accessibility standards for future development
- [ ] Include:
  - [ ] Alt text guidelines
  - [ ] Color contrast requirements
  - [ ] Focus indicator standards
  - [ ] Button size minimums
  - [ ] Testing procedures

---

## Summary & Timeline

| Item | Priority | Estimated Time | Status |
|------|----------|-----------------|--------|
| Add alt text to images | Critical | 2-3 hours | [ ] |
| Add focus indicators | Critical | 1-2 hours | [ ] |
| Add pause button to gallery | Critical | 1-2 hours | [ ] |
| Label form controls | High | 1-2 hours | [ ] |
| Verify color contrast | High | 1 hour | [ ] |
| Test mobile touch targets | Medium | 1-2 hours | [ ] |
| Automated accessibility testing | High | 1 hour | [ ] |
| Manual accessibility testing | High | 2-3 hours | [ ] |
| Cross-browser testing | Medium | 2-3 hours | [ ] |
| Documentation | Low | 1 hour | [ ] |

**Total Estimated Time:** 14-20 hours

---

## Completion Checklist

- [ ] All alt text added and verified
- [ ] Focus indicators visible and tested
- [ ] Pause button implemented and tested
- [ ] All form controls labeled
- [ ] Color contrast verified (WCAG AA)
- [ ] Mobile touch targets verified (44x44px minimum)
- [ ] Automated accessibility tests pass
- [ ] Manual accessibility tests pass
- [ ] Cross-browser testing complete
- [ ] Documentation complete
- [ ] Ready for production deployment

---

**Last Updated:** January 30, 2026  
**Next Review:** After each fix is implemented  
**Target Completion:** Before publishing to rockinrockinboogie.com
