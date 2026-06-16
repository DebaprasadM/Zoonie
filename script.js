/* =======================================================
   LOADER
======================================================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 800);
});

/* =======================================================
   MOBILE SIDEBAR
======================================================= */

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

/* Create Overlay */

const overlay = document.createElement("div");

overlay.classList.add("sidebar-overlay");

document.body.appendChild(overlay);

/* Open Sidebar */

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("show");

    overlay.classList.add("show");
  });
}

/* Close Sidebar */

overlay.addEventListener("click", () => {
  sidebar.classList.remove("show");

  overlay.classList.remove("show");
});

/* =======================================================
   CLOSE SIDEBAR AFTER CLICK
======================================================= */

const navLinks = document.querySelectorAll(".sidebar-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 992) {
      sidebar.classList.remove("show");

      overlay.classList.remove("show");
    }
  });
});

/* =======================================================
   ESC KEY CLOSE
======================================================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sidebar.classList.remove("show");

    overlay.classList.remove("show");
  }
});

/* =======================================================
   RESIZE FIX
======================================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    sidebar.classList.remove("show");

    overlay.classList.remove("show");
  }
});
/* =======================================================
   ANIMATED COUNTERS
======================================================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function runCounters() {
  if (counterStarted) return;

  counterStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-target"));

    const duration = 2000;

    const increment = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();

        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + "+";
      }
    };

    updateCounter();
  });
}

/* =======================================================
   INTERSECTION OBSERVER
======================================================= */

const impactSection = document.querySelector("#impact");

if (impactSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounters();
        }
      });
    },

    {
      threshold: 0.3,
    },
  );

  counterObserver.observe(impactSection);
}

/* =======================================================
   FALLBACK
======================================================= */

window.addEventListener("load", () => {
  const rect = impactSection?.getBoundingClientRect();

  if (!rect) return;

  if (rect.top < window.innerHeight) {
    runCounters();
  }
});
/* =======================================================
   TESTIMONIAL SLIDER
======================================================= */

const testimonials = document.querySelectorAll(".testimonial-card");

const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next-btn");

const prevBtn = document.querySelector(".prev-btn");

let currentSlide = 0;

/* =======================================================
   SHOW SLIDE
======================================================= */

function showSlide(index) {
  testimonials.forEach((card) => {
    card.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  testimonials[index].classList.add("active");

  dots[index].classList.add("active");
}

/* =======================================================
   NEXT SLIDE
======================================================= */

function nextSlide() {
  currentSlide++;

  if (currentSlide >= testimonials.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

/* =======================================================
   PREVIOUS SLIDE
======================================================= */

function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = testimonials.length - 1;
  }

  showSlide(currentSlide);
}

/* =======================================================
   BUTTON EVENTS
======================================================= */

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
  });
}

/* =======================================================
   DOT EVENTS
======================================================= */

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;

    showSlide(currentSlide);
  });
});

/* =======================================================
   AUTO SLIDE
======================================================= */

let sliderInterval = setInterval(nextSlide, 5000);

/* =======================================================
   PAUSE ON HOVER
======================================================= */

const slider = document.querySelector(".testimonial-slider");

if (slider) {
  slider.addEventListener("mouseenter", () => {
    clearInterval(sliderInterval);
  });

  slider.addEventListener("mouseleave", () => {
    sliderInterval = setInterval(nextSlide, 5000);
  });
}

/* =======================================================
   INITIAL LOAD
======================================================= */

if (testimonials.length > 0) {
  showSlide(currentSlide);
}
/* =======================================================
   BACK TO TOP BUTTON
======================================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/* =======================================================
   ACTIVE NAVIGATION
======================================================= */

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".sidebar-nav a");

function activateMenu() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activateMenu);

window.addEventListener("load", activateMenu);

/* =======================================================
   ACTIVE NAV ON CLICK
======================================================= */

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
/* =======================================================
   ADD REVEAL CLASSES AUTOMATICALLY
======================================================= */

const revealTargets = document.querySelectorAll(
  `
    .section-header,
    .about-content,
    .about-image,
    .mission-card,
    .highlight-card,
    .service-card,
    .impact-card,
    .achievement-item,
    .gallery-item,
    .why-card,
    .testimonial-card,
    .contact-card,
    .contact-form-wrapper,
    .map-placeholder,
    .footer-column
    `,
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

/* =======================================================
   SCROLL REVEAL
======================================================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;

    const revealTop = element.getBoundingClientRect().top;

    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* =======================================================
   HERO FLOAT EFFECT
======================================================= */

const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  heroImage.classList.add("float");
}

/* =======================================================
   PARALLAX EFFECT (LIGHT)
======================================================= */

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const hero = document.querySelector(".hero");

  if (!hero) return;

  hero.style.backgroundPositionY = `${scrollY * 0.2}px`;
});

/* =======================================================
   CURRENT YEAR (OPTIONAL)
======================================================= */

const yearElement = document.querySelector(".current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =======================================================
   FORM SUBMIT DEMO
======================================================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been received.");

    contactForm.reset();
  });
}

/* =======================================================
   IMAGE LOADING OPTIMIZATION
======================================================= */

const images = document.querySelectorAll("img");

images.forEach((img) => {
  img.setAttribute("loading", "lazy");
});

/* =======================================================
   WEBSITE INIT
======================================================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Zoonie Healthcare NGO Website Loaded Successfully");
});

/* =======================================================
   GALLERY LIGHTBOX
======================================================= */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = `
    <span id="lightbox-close">&times;</span>
    <img id="lightbox-img" src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightbox-img");

const lightboxClose = document.getElementById("lightbox-close");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");

    lightboxImg.src = img.src;
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

/* =======================================================
   ESC CLOSE LIGHTBOX
======================================================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }
});

/* =======================================================
   TESTIMONIAL SWIPE SUPPORT
======================================================= */

let touchStartX = 0;
let touchEndX = 0;

const testimonialSlider = document.querySelector(".testimonial-slider");

if (testimonialSlider) {
  testimonialSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  testimonialSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();
  });
}

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  }

  if (touchEndX > touchStartX + 50) {
    prevSlide();
  }
}

/* =======================================================
   NAVIGATION SMOOTH ACTIVE EFFECT
======================================================= */

navItems.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateX(6px)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateX(0)";
  });
});

/* =======================================================
   PAGE LOADED MESSAGE
======================================================= */

window.addEventListener("load", () => {
  console.log("Premium NGO Features Loaded");
});
/* =======================================================
   STAGGER REVEAL ANIMATION
======================================================= */

// const staggerItems = document.querySelectorAll(
//   `
//     .service-card,
//     .impact-card,
//     .why-card,
//     .gallery-item,
//     .mission-card,
//     .highlight-card
//     `,
// );

// staggerItems.forEach((item, index) => {
//   item.style.transitionDelay = `${index * 0.08}s`;
// });

// /* =======================================================
//    SMOOTH CARD HOVER TILT
// ======================================================= */

// const tiltCards = document.querySelectorAll(".service-card, .why-card");

// tiltCards.forEach((card) => {
//   card.addEventListener("mousemove", (e) => {
//     const rect = card.getBoundingClientRect();

//     const x = e.clientX - rect.left;

//     const y = e.clientY - rect.top;

//     const rotateY = (x / rect.width - 0.5) * 8;

//     const rotateX = (y / rect.height - 0.5) * -8;

//     card.style.transform = `perspective(1000px)
//              rotateX(${rotateX}deg)
//              rotateY(${rotateY}deg)
//              translateY(-8px)`;
//   });

//   card.addEventListener("mouseleave", () => {
//     card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
//   });
// });

// /* =======================================================
//    HEADER COUNTER FORMATTER
// ======================================================= */

// function formatLargeNumber(num) {
//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(1) + "M+";
//   }

//   if (num >= 1000) {
//     return (num / 1000).toFixed(1) + "K+";
//   }

//   return num;
// }

// /* =======================================================
//    IMAGE FADE IN AFTER LOAD
// ======================================================= */

// document.querySelectorAll("img").forEach((img) => {
//   img.style.opacity = "0";

//   img.addEventListener("load", () => {
//     img.style.transition = "opacity .6s ease";

//     img.style.opacity = "1";
//   });
// });

// /* =======================================================
//    SCROLL PROGRESS BAR
// ======================================================= */

// const progressBar = document.createElement("div");

// progressBar.id = "scroll-progress";

// document.body.appendChild(progressBar);

// window.addEventListener("scroll", () => {
//   const scrollTop = window.scrollY;

//   const docHeight = document.documentElement.scrollHeight - window.innerHeight;

//   const progress = (scrollTop / docHeight) * 100;

//   progressBar.style.width = progress + "%";
// });

// /* =======================================================
//    SMART BUTTON RIPPLE EFFECT
// ======================================================= */

// const buttons = document.querySelectorAll(".btn");

// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const ripple = document.createElement("span");

//     ripple.classList.add("ripple");

//     const rect = button.getBoundingClientRect();

//     ripple.style.left = e.clientX - rect.left + "px";

//     ripple.style.top = e.clientY - rect.top + "px";

//     button.appendChild(ripple);

//     setTimeout(() => {
//       ripple.remove();
//     }, 600);
//   });
// });

// /* =======================================================
//    CONSOLE BRANDING
// ======================================================= */

// console.log(`
// =========================================
//  ZOONIE HEALTHCARE NGO
//  Premium Frontend Loaded Successfully
// =========================================
// `);
/* =======================================================
   CARD MODALS
======================================================= */

const modalButtons = document.querySelectorAll(".details-btn");

const modalOverlay = document.getElementById("modalOverlay");

const modals = document.querySelectorAll(".card-modal");

const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.dataset.modal;

    modalOverlay.classList.add("show");

    modals.forEach((modal) => {
      modal.classList.remove("active");
    });

    document.getElementById(modalId).classList.add("active");
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalOverlay.classList.remove("show");

    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
  });
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("show");

    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalOverlay.classList.remove("show");

    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
  }
});
/* =======================================================
   NETWORK MODAL
======================================================= */

const viewPartnersBtn = document.getElementById("viewPartnersBtn");

const networkModal = document.getElementById("networkModal");

const closeNetworkModal = document.getElementById("closeNetworkModal");

if (viewPartnersBtn && networkModal) {
  viewPartnersBtn.addEventListener("click", () => {
    networkModal.classList.add("show");

    document.body.style.overflow = "hidden";
  });
}

if (closeNetworkModal && networkModal) {
  closeNetworkModal.addEventListener("click", () => {
    networkModal.classList.remove("show");

    document.body.style.overflow = "auto";
  });
}

/* =======================================================
   OUTSIDE CLICK CLOSE
======================================================= */

networkModal?.addEventListener("click", (e) => {
  if (e.target === networkModal) {
    networkModal.classList.remove("show");

    document.body.style.overflow = "auto";
  }
});

/* =======================================================
   ESC CLOSE
======================================================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && networkModal.classList.contains("show")) {
    networkModal.classList.remove("show");

    document.body.style.overflow = "auto";
  }
});

/* =======================================================
   TABS
======================================================= */

const tabs = document.querySelectorAll(".network-tab");

const tabContents = document.querySelectorAll(".network-tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => {
      t.classList.remove("active");
    });

    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    tab.classList.add("active");

    document.getElementById(target).classList.add("active");
  });
});

/* =======================================================
   SEARCH
======================================================= */

const partnerSearch = document.getElementById("partnerSearch");

partnerSearch?.addEventListener("keyup", () => {
  const searchText = partnerSearch.value.toLowerCase();

  const partners = document.querySelectorAll(".partner-item");

  partners.forEach((partner) => {
    const text = partner.textContent.toLowerCase();

    partner.style.display = text.includes(searchText) ? "block" : "none";
  });
});
