"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
  let contactFields = document.querySelectorAll(".contact-form input, .contact-form textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
  const numShades = 5;

  let cssProperties = [];

  for (const themeColor in themeColors) {
    const hexValue = themeColors[themeColor];
    var hsl = tinycolor(hexValue).toHsl();
    for (var i = numShades - 1; i >= 0; i -= 1) {
      hsl.l = (i + 0.5) / numShades;
      cssProperties.push(`--${camelCaseToDash(themeColor)}-${((i * 100) / 1000) * 200}: ${tinycolor(hsl).toRgbString()};`);
    }
    numColor = tinycolor(hexValue).toRgb();
    cssProperties.push(`--${camelCaseToDash(themeColor)}-rgb: ${numColor["r"]}, ${numColor["g"]}, ${numColor["b"]};`);
  }

  const headTag = document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");

  styleTag.innerHTML = `
    :root {
      ${cssProperties.join("\n")}
    }
  `;
  headTag.appendChild(styleTag);
});

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preloader");
});

document.addEventListener('DOMContentLoaded', () => {
  const isHomePage = document.body.getAttribute('data-bc-page-type') === 'home';
  const heroLink = themeOptions.heroLink && themeOptions.heroLink.trim() !== '' ? themeOptions.heroLink : null;
  
  if (isHomePage && heroLink) {    
    // Handle slideshow clicks
    const slideshow = document.querySelector(".home-slideshow");
    if (slideshow) {
      const slides = slideshow.querySelectorAll('.splide__slide');
      slides.forEach(slide => {
        slide.classList.add("hero-clickable");
        slide.setAttribute("role", "button");
        slide.setAttribute("aria-label", "Navigate to " + heroLink);
      });
      
      // Use event delegation for better performance
      slideshow.addEventListener("click", function(event) {
        // Don't interfere with splide controls - only handle clicks on slide content
        if (!event.target.closest('.splide__arrow, .splide__pagination')) {
          const clickedSlide = event.target.closest('.splide__slide');
          if (clickedSlide) {
            event.preventDefault();
            event.stopPropagation();
            if (isExternalLink(heroLink)) {
              window.open(heroLink, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = heroLink;
            }
          }
        }
      });
    }
    
    // Handle welcome image clicks
    const welcomeImage = document.querySelector(".welcome-image");
    if (welcomeImage) {
      welcomeImage.classList.add("hero-clickable");
      welcomeImage.setAttribute("role", "button");
      welcomeImage.setAttribute("aria-label", linkLabel);
      welcomeImage.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isExternalLink(heroLink)) {
          window.open(heroLink, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = heroLink;
        }
      });
    }
  }
});

// Hybrid announcement pause: hover on desktop, tap-to-toggle on mobile, focus for keyboard
document.addEventListener('DOMContentLoaded', () => {
  const announcement = document.querySelector('.announcement-message--scrolling');

  if (!announcement) return;

  // Add tap-to-toggle for all devices (primarily for touch devices)
  // Desktop users can still use hover (handled by CSS), but click also works as backup
  let isPaused = false;

  announcement.addEventListener('click', (e) => {
    // Don't toggle if user clicked a link - let the link work normally
    if (e.target.closest('a')) return;

    // Toggle pause state
    isPaused = !isPaused;
    announcement.classList.toggle('is-paused', isPaused);
  });
});
