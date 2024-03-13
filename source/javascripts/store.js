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

const headerNavContainer = document.querySelector('.header-nav-container');
let navPosition = headerNavContainer.offsetTop;
let headerNavHeight = getComputedStyle(headerNavContainer).height;

const checkNavVisibility = () => {
  const computedStyle = getComputedStyle(headerNavContainer);
  return computedStyle.display !== 'none';
};

const handleScroll = () => {
  if (!checkNavVisibility()) {
    document.body.style.paddingTop = 0;
    headerNavContainer.classList.remove("fixed");
    return;
  }

  if (window.pageYOffset >= navPosition) {
    headerNavContainer.classList.add("fixed");
    document.body.style.paddingTop = headerNavHeight;
  } else {
    headerNavContainer.classList.remove("fixed");
    document.body.style.paddingTop = 0;
  }
};

window.addEventListener("scroll", handleScroll);