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

// Animate statistics on scroll
function animateStats() {
  const stats = document.querySelectorAll('#stats [id$="-count"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ""));
        const suffix = finalValue.replace(/\d/g, "");

        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            target.textContent = finalValue;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(current) + suffix;
          }
        }, 50);

        observer.unobserve(target);
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat));
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  animateStats();
});

// Add active state to navigation on scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-brown-primary");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("text-brown-primary");
    }
  });
});
var swiper = new Swiper(".multiple-slide-carousel", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: "#slider-button-left",
    prevEl: "#slider-button-right",
  },
  breakpoints: {
    1920: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1028: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});
