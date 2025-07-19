// Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");

      // Animate counters when they come into view
      const counters = entry.target.querySelectorAll("[data-target]");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        animateCounter(counter, target);
      });
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => observer.observe(el));

  // Animate hero counters immediately
  const heroCounters = document.querySelectorAll(".hero-stats [data-target]");
  setTimeout(() => {
    heroCounters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      animateCounter(counter, target);
    });
  }, 1000);
});

// FAQ Toggle Function
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Smooth scrolling for navigation links
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

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "white";
    navbar.style.backdropFilter = "none";
  }
});

// Stagger animation for story cards
document.addEventListener("DOMContentLoaded", () => {
  const storyCards = document.querySelectorAll(".story-card");
  storyCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  const impactCards = document.querySelectorAll(".impact-card");
  impactCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".story-card, .impact-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});
