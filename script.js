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

function initSidebar() {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  if (!menuBtn || !sidebar) return;

  const overlay = document.createElement("div");
  overlay.classList.add("sidebar-overlay");
  document.body.appendChild(overlay);

  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
    overlay.classList.add("show");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
  });

  const navLinks = document.querySelectorAll(".sidebar-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    }
  });
}

document.addEventListener("componentsLoaded", initSidebar);

function setActiveNav() {
  const navItems = document.querySelectorAll(".sidebar-nav a");
  if (!navItems.length) return;
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  navItems.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === currentPath || href === currentPath + location.hash) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("componentsLoaded", setActiveNav);
window.addEventListener("load", setActiveNav);
window.addEventListener("hashchange", setActiveNav);

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

const impactSection = document.querySelector("#impact");
if (impactSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) runCounters();
      });
    },
    { threshold: 0.3 }
  );
  counterObserver.observe(impactSection);
}

window.addEventListener("load", () => {
  const rect = impactSection?.getBoundingClientRect();
  if (!rect) return;
  if (rect.top < window.innerHeight) runCounters();
});

const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
let currentSlide = 0;

function showSlide(index) {
  if (!testimonials.length) return;
  testimonials.forEach((card, i) => {
    card.style.display = i === index ? "block" : "none";
    card.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonials.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
  showSlide(currentSlide);
}

nextBtn?.addEventListener("click", nextSlide);
prevBtn?.addEventListener("click", prevSlide);
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});
if (testimonials.length > 0) showSlide(currentSlide);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealTargets = document.querySelectorAll(
  `.section-header, .about-content, .about-image, .mission-card, .highlight-card,
   .service-card, .impact-card, .achievement-item, .gallery-item, .why-card,
   .testimonial-card, .contact-card, .contact-form-wrapper, .map-placeholder,
   .footer-column`
);
revealTargets.forEach((element) => element.classList.add("reveal"));

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

const heroImage = document.querySelector(".hero-image");
if (heroImage) heroImage.classList.add("float");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.style.backgroundPositionY = `${scrollY * 0.2}px`;
});

const yearElement = document.querySelector(".current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been received.");
    contactForm.reset();
  });
}

const images = document.querySelectorAll("img");
images.forEach((img) => img.setAttribute("loading", "lazy"));

document.addEventListener("DOMContentLoaded", () => {
  console.log("Zoonie Healthcare NGO Website Loaded Successfully");
});

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `<span id="lightbox-close">&times;</span><img id="lightbox-img" src="" alt="">`;
document.body.appendChild(lightbox);
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});
lightboxClose.addEventListener("click", () => lightbox.classList.remove("show"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("show");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("show");
});

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
  if (touchEndX < touchStartX - 50) nextSlide();
  if (touchEndX > touchStartX + 50) prevSlide();
}

const navItems = document.querySelectorAll(".sidebar-nav a");
navItems.forEach((link) => {
  link.addEventListener("mouseenter", () => { link.style.transform = "translateX(6px)"; });
  link.addEventListener("mouseleave", () => { link.style.transform = "translateX(0)"; });
});

window.addEventListener("load", () => {
  console.log("Premium NGO Features Loaded");
});

const modalButtons = document.querySelectorAll(".details-btn");
const modalOverlay = document.getElementById("modalOverlay");
const modals = document.querySelectorAll(".card-modal");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.dataset.modal;
    modalOverlay.classList.add("show");
    modals.forEach((modal) => modal.classList.remove("active"));
    document.getElementById(modalId).classList.add("active");
  });
});
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
    modals.forEach((modal) => modal.classList.remove("active"));
  });
});
modalOverlay?.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("show");
    modals.forEach((modal) => modal.classList.remove("active"));
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalOverlay?.classList.remove("show");
    modals.forEach((modal) => modal.classList.remove("active"));
  }
});

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
networkModal?.addEventListener("click", (e) => {
  if (e.target === networkModal) {
    networkModal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && networkModal?.classList.contains("show")) {
    networkModal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

const tabs = document.querySelectorAll(".network-tab");
const tabContents = document.querySelectorAll(".network-tab-content");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

const partnerSearch = document.getElementById("partnerSearch");
partnerSearch?.addEventListener("keyup", () => {
  const searchText = partnerSearch.value.toLowerCase();
  const partners = document.querySelectorAll(".partner-item");
  partners.forEach((partner) => {
    const text = partner.textContent.toLowerCase();
    partner.style.display = text.includes(searchText) ? "block" : "none";
  });
});

const toggleBtn = document.getElementById("toggleDistricts");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const hidden = document.querySelectorAll(".hidden-chip");
    hidden.forEach((item) => item.classList.toggle("show-chip"));
    const opened = toggleBtn.innerText === "Hide Districts";
    toggleBtn.innerText = opened ? "View All Districts" : "Hide Districts";
  });
}

const loadBtn = document.getElementById("loadMoreGallery");
if (loadBtn) {
  let visible = 0;
  loadBtn.addEventListener("click", () => {
    const hiddenPhotos = document.querySelectorAll(".hidden-gallery:not(.show-gallery)");
    for (let i = 0; i < 8 && i < hiddenPhotos.length; i++) {
      hiddenPhotos[i].classList.add("show-gallery");
    }
    if (document.querySelectorAll(".hidden-gallery:not(.show-gallery)").length === 0) {
      loadBtn.style.display = "none";
    }
  });
}

const districtCard = document.getElementById("districtCard");
const districtModal = document.getElementById("districtModal");
const closeDistrictModal = document.getElementById("closeDistrictModal");

if (districtCard && districtModal) {
  districtCard.addEventListener("click", () => {
    districtModal.classList.add("active");
  });
}
if (closeDistrictModal && districtModal) {
  closeDistrictModal.addEventListener("click", () => {
    districtModal.classList.remove("active");
  });
}
if (districtModal) {
  districtModal.addEventListener("click", (e) => {
    if (e.target === districtModal) {
      districtModal.classList.remove("active");
    }
  });
}
