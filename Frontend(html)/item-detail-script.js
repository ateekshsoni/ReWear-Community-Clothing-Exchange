// Image Gallery Functions
function changeMainImage(thumbnail) {
  const mainImage = document.getElementById("mainImage");
  const zoomedImage = document.getElementById("zoomedImage");

  // Remove active class from all thumbnails
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });

  // Add active class to clicked thumbnail
  thumbnail.classList.add("active");

  // Change main image with fade effect
  mainImage.style.opacity = "0";
  setTimeout(() => {
    mainImage.src = thumbnail.src.replace("w=150&h=200", "w=600&h=800");
    zoomedImage.src = thumbnail.src.replace("w=150&h=200", "w=1200&h=1600");
    mainImage.style.opacity = "1";
  }, 150);
}

// Zoom Modal Functions
function toggleZoom() {
  const modal = document.getElementById("zoomModal");
  const zoomedImage = document.getElementById("zoomedImage");
  const mainImage = document.getElementById("mainImage");

  zoomedImage.src = mainImage.src.replace("w=600&h=800", "w=1200&h=1600");
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeZoom() {
  const modal = document.getElementById("zoomModal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

// Close zoom modal when clicking outside the image
document.getElementById("zoomModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeZoom();
  }
});

// Keyboard navigation for zoom modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeZoom();
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading states to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    if (
      !this.classList.contains("zoom-close") &&
      !this.classList.contains("toggle-password")
    ) {
      this.classList.add("loading");
      setTimeout(() => {
        this.classList.remove("loading");
      }, 2000);
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document
  .querySelectorAll(".item-info, .owner-info, .similar-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add ripple effect styles
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add ripple effect to all buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", createRipple);
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("loading");
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// Add to favorites functionality
function toggleFavorite(button) {
  const icon = button.querySelector("i");
  const isFavorited = icon.classList.contains("fas");

  if (isFavorited) {
    icon.classList.remove("fas");
    icon.classList.add("far");
    button.style.color = "#7f8c8d";
  } else {
    icon.classList.remove("far");
    icon.classList.add("fas");
    button.style.color = "#e74c3c";

    // Add heart animation
    button.style.animation = "heartBeat 0.6s ease";
    setTimeout(() => {
      button.style.animation = "";
    }, 600);
  }
}

// Heart beat animation
const heartBeatStyle = document.createElement("style");
heartBeatStyle.textContent = `
    @keyframes heartBeat {
        0% { transform: scale(1); }
        14% { transform: scale(1.3); }
        28% { transform: scale(1); }
        42% { transform: scale(1.3); }
        70% { transform: scale(1); }
    }
`;
document.head.appendChild(heartBeatStyle);

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Add fade-in animation to page
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  // Preload images
  const imageUrls = [
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1566479179817-c0b2b2b6e9b3?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  // Initialize tooltips
  initializeTooltips();

  // Initialize scroll progress indicator
  initializeScrollProgress();
});

// Tooltip functionality
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
  });
}

function showTooltip(event) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = event.target.getAttribute("data-tooltip");

  document.body.appendChild(tooltip);

  const rect = event.target.getBoundingClientRect();
  tooltip.style.left =
    rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

  setTimeout(() => tooltip.classList.add("show"), 10);
}

function hideTooltip() {
  const tooltip = document.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

// Add tooltip styles
const tooltipStyle = document.createElement("style");
tooltipStyle.textContent = `
    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        z-index: 1000;
        opacity: 0;
        transform: translateY(5px);
        transition: all 0.3s ease;
        pointer-events: none;
        white-space: nowrap;
    }
    
    .tooltip.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.8);
    }
`;
document.head.appendChild(tooltipStyle);

// Scroll progress indicator
function initializeScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", updateScrollProgress);
}

function updateScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress");
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  progressBar.style.width = scrollPercent + "%";
}

// Add scroll progress styles
const progressStyle = document.createElement("style");
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        z-index: 1001;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(progressStyle);

// Share functionality
function shareItem() {
  if (navigator.share) {
    navigator.share({
      title: "Vintage Floral Summer Dress - ReWear",
      text: "Check out this beautiful vintage dress on ReWear!",
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      showNotification("Link copied to clipboard!");
    });
  }
}

// Notification system
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification styles
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1002;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }
    
    .notification.info {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }
`;
document.head.appendChild(notificationStyle);

// Form validation for swap proposal
function validateSwapForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("error");
      isValid = false;
    } else {
      field.classList.remove("error");
    }
  });

  return isValid;
}

// Add form validation styles
const validationStyle = document.createElement("style");
validationStyle.textContent = `
    .error {
        border-color: #e74c3c !important;
        background-color: #fdf2f2 !important;
    }
    
    .error:focus {
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
`;
document.head.appendChild(validationStyle);

// Image lazy loading with intersection observer
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      lazyImageObserver.unobserve(img);
    }
  });
});

// Observe all lazy images
document.querySelectorAll("img[data-src]").forEach((img) => {
  lazyImageObserver.observe(img);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener("scroll", debounce(updateScrollProgress, 10));

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = "smooth";

// Handle back button
window.addEventListener("popstate", function (event) {
  if (document.getElementById("zoomModal").classList.contains("show")) {
    closeZoom();
    history.pushState(null, null, window.location.href);
  }
});

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  // Arrow keys for image navigation
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const activeThumbnail = document.querySelector(".thumbnail.active");
    const currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);

    let newIndex;
    if (e.key === "ArrowLeft") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
    } else {
      newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
    }

    changeMainImage(thumbnails[newIndex]);
  }
});

// Add focus management for accessibility
function manageFocus() {
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "3px solid rgba(39, 174, 96, 0.5)";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
    });
  });
}

// Initialize focus management
manageFocus();

// Add reduced motion support
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement("style");
  style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
  document.head.appendChild(style);
}

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
    this.alt = "Image not found";
  });
});

// Add print functionality
function printItem() {
  window.print();
}

// Add to calendar functionality (for events/deadlines)
function addToCalendar(title, date, description) {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

  const event = {
    title: title,
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    description: description,
  };

  const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start.replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${event.end.replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

  const link = document.createElement("a");
  link.href = encodeURI(calendarUrl);
  link.download = "event.ics";
  link.click();
}

// Initialize all functionality when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  console.log("ReWear Item Detail Page initialized successfully!");

  // Add any final initialization code here
  showNotification("Welcome to ReWear! 👋", "info");
}
