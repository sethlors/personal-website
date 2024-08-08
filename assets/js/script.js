'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  if (elem) {
    elem.classList.toggle("active");
    console.log(`Toggled ${elem.dataset.modalContainer ? 'modal container' : 'element'}`);
  } else {
    console.error('Element not found for toggle:', elem);
  }
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
} else {
  console.error('Sidebar or sidebar button not found');
}

// Modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal content variables
const modalCarousel = document.querySelector("[data-modal-carousel]");
const leftArrow = document.querySelector("[data-left-arrow]");
const rightArrow = document.querySelector("[data-right-arrow]");

let currentImageIndex = 0;
let imageElements = [];

// Modal toggle function
const hobbiesModalFunc = function () {
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

// Add click event to all hobbies items
document.querySelectorAll("[data-hobbies-item]").forEach(item => {
  item.addEventListener("click", function () {
    const imageUrls = JSON.parse(this.getAttribute("data-hobbies-images"));
    console.log('Image URLs:', imageUrls);

    if (imageUrls && imageUrls.length > 0) {
      modalCarousel.innerHTML = ''; // Clear previous images
      console.log('Cleared previous images');

      imageElements = imageUrls.map((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Hobby Image';
        if (index === 0) img.classList.add('active'); // Show the first image initially
        modalCarousel.appendChild(img);
        console.log('Appended image:', url);
        return img;
      });

      currentImageIndex = 0;
      hobbiesModalFunc();
      console.log('Modal toggled');
    } else {
      console.error('Missing image URLs in clicked item');
    }
  });
});

// Add click event to modal close button and overlay
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", hobbiesModalFunc);
  overlay.addEventListener("click", hobbiesModalFunc);
} else {
  console.error('Modal close button or overlay not found');
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category.toLowerCase(); // Convert to lowercase
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

document.addEventListener('keydown', function(event) {
  const modalContainer = document.querySelector('.modal-container.active');
  if (modalContainer) {
    if (event.key === 'ArrowLeft') {
      const leftArrow = modalContainer.querySelector('[data-left-arrow]');
      leftArrow.click();
    } else if (event.key === 'ArrowRight') {
      const rightArrow = modalContainer.querySelector('[data-right-arrow]');
      rightArrow.click();
    }
  }
});

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// Navigation arrow click events
if (leftArrow && rightArrow) {
  leftArrow.addEventListener("click", () => {
    if (imageElements.length > 0) {
      imageElements[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex - 1 + imageElements.length) % imageElements.length;
      imageElements[currentImageIndex].classList.add('active');
    }
  });

  rightArrow.addEventListener("click", () => {
    if (imageElements.length > 0) {
      imageElements[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % imageElements.length;
      imageElements[currentImageIndex].classList.add('active');
    }
  });
} else {
  console.error('Left or right arrow not found');
}

// Add click event to modal container
if (modalContainer) {
  modalContainer.addEventListener("click", function (event) {
    // Check if the click happened on the modal container itself
    if (event.target === modalContainer) {
      hobbiesModalFunc(); // Close the modal
    }
  });
} else {
  console.error('Modal container not found');
}

// Skill progress bars animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const skillsItems = document.querySelectorAll(".skills-item");

  const animateOnScroll = () => {
    const windowHeight = window.innerHeight;
    skillsItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const skillProgressFill = item.querySelector(".skill-progress-fill");
      const skillValue = item.querySelector("data").getAttribute("value");

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Add animation class to start animation
        skillProgressFill.classList.add("animate");
        skillProgressFill.style.width = `${skillValue}%`; // Set the width based on the value attribute
        console.log(`Animating: ${item.querySelector('.title-wrapper h5').innerText} with width ${skillValue}%`);
      } else {
        // Optionally, you can reset the width if needed
        skillProgressFill.classList.remove("animate");
        skillProgressFill.style.width = "0"; // Reset the width
        console.log(`Resetting: ${item.querySelector('.title-wrapper h5').innerText}`);
      }
    });
  };

  // Call the function on scroll and on page load
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});




// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbarLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetPage = link.textContent.toLowerCase();

      pages.forEach((page) => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      navbarLinks.forEach((link) => {
        link.classList.remove("active");
      });

      link.classList.add("active");
    });
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}