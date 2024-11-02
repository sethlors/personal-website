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

let currentMediaIndex = 0;
let mediaElements = [];

// Modal toggle function
const hobbiesModalFunc = function () {
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

// Add click event to all hobbies items
document.querySelectorAll("[data-hobbies-item]").forEach(item => {
  item.addEventListener("click", function () {
    const mediaUrls = JSON.parse(this.getAttribute("data-hobbies-images"));
    console.log('Media URLs:', mediaUrls);

    if (mediaUrls && mediaUrls.length > 0) {
      modalCarousel.innerHTML = ''; // Clear previous media
      console.log('Cleared previous media');

      mediaElements = mediaUrls.map((url, index) => {
        let media;
        if (url.endsWith('.mp4')) {
          media = document.createElement('video');
          media.src = url;
          media.controls = true;
          media.autoplay = true;
          media.muted = true;
        } else {
          media = document.createElement('img');
          media.src = url;
          media.alt = 'Hobby Media';
        }
        if (index === 0) media.classList.add('active'); // Show the first media initially
        modalCarousel.appendChild(media);
        console.log('Appended media:', url);
        return media;
      });

      currentMediaIndex = 0;
      hobbiesModalFunc();
      console.log('Modal toggled');
    } else {
      console.error('Missing media URLs in clicked item');
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

// Navigation arrow click events
if (leftArrow && rightArrow) {
  leftArrow.addEventListener("click", () => {
    if (mediaElements.length > 0) {
      mediaElements[currentMediaIndex].classList.remove('active');
      currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
      mediaElements[currentMediaIndex].classList.add('active');
    }
  });

  rightArrow.addEventListener("click", () => {
    if (mediaElements.length > 0) {
      mediaElements[currentMediaIndex].classList.remove('active');
      currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
      mediaElements[currentMediaIndex].classList.add('active');
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