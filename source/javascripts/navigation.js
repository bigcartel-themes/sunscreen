'use strict';

let scrollPosition;
const navigationElement = document.querySelector('.nav');
const dropdownToggleButtons = navigationElement.querySelectorAll('.open-dropdown');
const navigationMenuActions = navigationElement.querySelectorAll('.nav-menu-action');

const toggleDropdown = (dropdown) => {
  const isHidden = dropdown.getAttribute('aria-hidden') === 'true';
  isHidden ? showDropdown(dropdown) : hideDropdown(dropdown);
}

const showDropdown = (dropdown) => {
  scrollPosition = window.scrollY;
  document.body.classList.add('no-scroll');
  dropdown.setAttribute('aria-hidden', 'false');
  dropdown.querySelector('.close-nav-menu').addEventListener('click', () => hideDropdown(dropdown), { once: true });
}

const hideDropdown = (dropdown) => {
  document.body.classList.remove('no-scroll');
  if (window.outerWidth <= 767) {
    window.scrollTo(0, scrollPosition);
  }
  dropdown.setAttribute('aria-hidden', 'true');
}

const closeOpenDropdowns = (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.horizontal-nav-links[aria-hidden="false"]').forEach((dropdown) => hideDropdown(dropdown));
    document.removeEventListener('keydown', closeOpenDropdowns);
  }
}

dropdownToggleButtons.forEach((dropdownToggleButton) => {
  dropdownToggleButton.addEventListener('click', function() {
    const dropdown = this.parentElement.querySelector('.horizontal-nav-links');
    const isHidden = dropdown.getAttribute('aria-hidden') === 'true';
    if (isHidden) {
      document.querySelectorAll('.horizontal-nav-links[aria-hidden="false"]').forEach((openDropdown) => {
        if (dropdown !== openDropdown) {
          hideDropdown(openDropdown);
        }
      });
      showDropdown(dropdown);
      document.addEventListener('keydown', closeOpenDropdowns);
    } else {
      hideDropdown(dropdown);
    }
  });
});