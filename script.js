document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const currentNum = document.querySelector(".current-num");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let isAnimating = false;

  // --- 1. INITIAL LOAD ANIMATION ---
  const activeSlide = slides[0];
  const firstImg = activeSlide.querySelector("img");
  const firstTexts = activeSlide.querySelectorAll(".gs-anim");
  const controlsReveal = document.querySelector(".hero-controls-wrapper");

  gsap.to(firstImg, { scale: 1, duration: 6, ease: "power2.out" });

  const initTl = gsap.timeline({ delay: 0.2 });
  initTl
    .to(firstTexts, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    })
    .to(
      controlsReveal,
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5",
    );

  // --- 2. GSAP SLIDE & TEXT TRANSITION ---
  function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];

    const currentTexts = currentSlide.querySelectorAll(".gs-anim");
    const nextTexts = nextSlide.querySelectorAll(".gs-anim");
    const nextImg = nextSlide.querySelector("img");

    const tl = gsap.timeline({
      onComplete: () => {
        currentSlide.classList.remove("active");
        isAnimating = false;
      },
    });

    // STEP 1: Text leaves smoothly (fly up slightly)
    tl.to(
      currentTexts,
      {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      },
      0,
    );

    // STEP 2: Background image fade in
    tl.set(nextSlide, { className: "slide active", zIndex: 2 });
    tl.set(currentSlide, { zIndex: 1 });

    // Reset next slide text
    tl.set(nextTexts, { y: 30, opacity: 0 });

    // Fade in new slide
    tl.fromTo(
      nextSlide,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.inOut" },
      0.4,
    );

    // Zoom new image
    gsap.fromTo(
      nextImg,
      { scale: 1.05 },
      { scale: 1, duration: 6, ease: "power2.out" },
    );

    // STEP 3: Incoming text reveals with stagger
    tl.to(
      nextTexts,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      0.8,
    ); // Starts right after slide fades in

    // Update Index & Indicator
    currentIndex = index;
    currentNum.textContent = "0" + (currentIndex + 1);
  }

  // --- 3. BUTTON CLICKS ---
  nextBtn.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  });

  prevBtn.addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. Reveal Up Animation (For Text, Grid, Button) ---
  const revealUpElements = document.querySelectorAll(".gs-reveal-up");

  revealUpElements.forEach((elem) => {
    gsap.fromTo(
      elem,
      { y: 50, opacity: 0, autoAlpha: 0 },
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%", // Triggers when top hits 85% of viewport
          toggleActions: "play none none none",
        },
      },
    );
  });

  // --- 2. Reveal Left Animation (Edge-to-Edge Image Group) ---
  const revealLeftElements = document.querySelectorAll(".gs-reveal-left");

  revealLeftElements.forEach((elem) => {
    gsap.fromTo(
      elem,
      { x: -80, opacity: 0, autoAlpha: 0 },
      {
        x: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // --- 3. Reveal Floating Cards with Stagger ---
  gsap.fromTo(
    ".float-card",
    { x: -40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2, // Pops them in one by one
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".floating-cards-container",
        start: "top 85%",
      },
    },
  );

  // --- 4. The Continuous Circle Orbit Animation ---
  const orbitContainer = document.querySelector(".orbit-container");
  const orbitNodes = document.querySelectorAll(".node-content");

  // Make the main container rotate slowly (clockwise)
  gsap.to(orbitContainer, {
    rotation: 360,
    duration: 40, // Very slow continuous orbit
    ease: "linear",
    repeat: -1, // Infinite loop
  });

  // Counter-rotate the contents inside so the text/icons stay upright
  gsap.to(orbitNodes, {
    rotation: "-=360", // Rotate in opposite direction exactly matching the parent
    duration: 40,
    ease: "linear",
    repeat: -1,
  });
});
// (Ube JS file eke kalin ScrollTrigger code ekatama meka add karapan)

// Services Section Bento Grid Stagger Animation
const serviceCards = document.querySelectorAll(".srv-card");

if (serviceCards.length > 0) {
  gsap.fromTo(
    serviceCards,
    { y: 40, opacity: 0, autoAlpha: 0 },
    {
      y: 0,
      opacity: 1,
      autoAlpha: 1,
      duration: 0.8,
      stagger: 0.1, // Meken thama cards tika eken eka mathu wenne
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger (Future sections walata ready wena widiyata)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ==================== HERO ENTRANCE ANIMATION ====================
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power4.out", duration: 1.1 },
  });

  // 1. Staggered reveal for Left Content
  heroTimeline
    .to(".hero-reveal", {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      delay: 0.1,
    })
    // 2. Main Glass Card Scale & Fade In
    .fromTo(
      ".glass-card-main",
      { scale: 0.92, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.2)" },
      "-=0.7",
    )
    // 3. Floating Micro Badges Pop Out
    .fromTo(
      ".floating-badge",
      { scale: 0.8, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
      },
      "-=0.6",
    );

  // ==================== CONTINUOUS LEVITATION (FLOATING WOW FACTOR) ====================
  // Main card gentle floating
  gsap.to(".float-element", {
    y: -10,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Sub badge 1 opposing float
  gsap.to(".float-sub-1", {
    y: 8,
    x: 4,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.3,
  });

  // Sub badge 2 subtle counter float
  gsap.to(".float-sub-2", {
    y: -8,
    x: -4,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.6,
  });
});

// ==================== DASHBOARD ASSEMBLE & PARALLAX ====================
if (document.querySelector(".crib-dashboard-section")) {
  const dashTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".crib-dashboard-section",
      start: "top 60%",
      toggleActions: "play none none none",
    },
  });

  // 1. Left Text & Buttons Reveal
  dashTl
    .fromTo(
      ".dash-anim-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
    )
    // 2. Normal Dashboard Frame pop in
    .fromTo(
      ".dash-anim-frame",
      { scale: 0.95, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    )
    // 3. Internal Widgets pop in
    .fromTo(
      ".dash-anim-widget",
      { scale: 0.95, opacity: 0, y: 15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
      },
      "-=0.2",
    )
    // 4. === UBA ILLAPU FLOATING WIDGETS REVEAL EKA ===
    .fromTo(
      ".float-widget",
      { scale: 0.6, opacity: 0 }, // Podi wela, nopeni idala patan ganne
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.5)",
      },
      "-=0.2", // Podi overlap delay ekak (Dashboard eka load weddima enawa)
    );

  // 5. Parallax Effect (Scroll karaddi udata pallahata yana eka)
  gsap.fromTo(
    ".parallax-fast",
    { y: 40 },
    {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".dash-visual-col",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    },
  );

  gsap.fromTo(
    ".parallax-slow",
    { y: 20 },
    {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".dash-visual-col",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    },
  );

  // 6. Continuous Gentle Float (Hamathissema lawata wewehena eka)
  // Meka delay karanawa dashTl eka iwara wenakam (seconds 2k wage)
  gsap.to(".float-widget", {
    y: "-=10",
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2, // Reveal animation eka iwara wenakam inna delay eka damma
    stagger: { amount: 1.5, from: "random" },
  });
}

// ==================== IMPACT & JOURNEY SECTION REVEAL ====================
if (document.querySelector(".crib-impact-journey-section")) {
  // Image Reveal Left
  gsap.fromTo(
    ".impact-img-col",
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".impact-top-row", start: "top 70%" },
    },
  );

  // Navy Box Reveal Right
  gsap.fromTo(
    ".impact-text-col",
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".impact-top-row", start: "top 70%" },
    },
  );

  // Journey Bottom Staggered Reveal
  const journeyElements = document.querySelectorAll(
    ".journey-bottom-row .gs-reveal-up, .journey-step",
  );

  gsap.fromTo(
    journeyElements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".journey-bottom-row", start: "top 80%" },
    },
  );
}

// ==================== NEW WELCOME SECTION ANIMATION ====================
if (document.querySelector(".crb-nw-welcome-sec")) {
  const nwTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".crb-nw-welcome-sec",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  // 1. Text slides in from left
  nwTl
    .fromTo(
      ".gs-nw-left",
      { x: -60, opacity: 0, autoAlpha: 0 },
      { x: 0, opacity: 1, autoAlpha: 1, duration: 1, ease: "power3.out" },
    )
    // 2. Image slides in from right
    .fromTo(
      ".gs-nw-right",
      { x: 60, opacity: 0, autoAlpha: 0 },
      { x: 0, opacity: 1, autoAlpha: 1, duration: 1, ease: "power3.out" },
      "-=0.7",
    )
    // 3. Full width bottom bars slide up
    .fromTo(
      ".gs-nw-up",
      { y: 50, opacity: 0, autoAlpha: 0 },
      { y: 0, opacity: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    );
}

// ==================== NEW WELCOME SECTION ANIMATION ====================
if (document.querySelector(".crb-nw-welcome-sec")) {
  const nwTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".crb-nw-welcome-sec",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  // 1. Text elements slide up one by one (Stagger)
  nwTl
    .fromTo(
      ".crb-text-reveal",
      { y: 40, opacity: 0, autoAlpha: 0 },
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
    )
    // 2. Image fades/slides in from right smoothly
    .fromTo(
      ".gs-nw-right",
      { x: 40, opacity: 0, autoAlpha: 0 },
      { x: 0, opacity: 1, autoAlpha: 1, duration: 1, ease: "power3.out" },
      "-=0.6",
    )
    // 3. Full width bottom bars slide up
    .fromTo(
      ".gs-nw-up",
      { y: 50, opacity: 0, autoAlpha: 0 },
      { y: 0, opacity: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    );
}

// ==================== FAQ ACCORDION LOGIC ====================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const questionBtn = item.querySelector(".faq-question");

  questionBtn.addEventListener("click", () => {
    // First, close all other open FAQs smoothly
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
      }
    });
    // Toggle the clicked FAQ
    item.classList.toggle("active");
  });
});

// ==================== NEWS SLIDER CONTROLS ====================
const slider = document.querySelector(".news-slider");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const progressFill = document.querySelector(".news-progress-fill");

if (slider) {
  // Scroll Left
  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -380, behavior: "smooth" });
  });

  // Scroll Right
  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: 380, behavior: "smooth" });
  });

  // Update Progress Bar on Scroll
  slider.addEventListener("scroll", () => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const scrollPercent = (slider.scrollLeft / maxScrollLeft) * 100;
    // Map percentage to progress bar width (min 30% to max 100%)
    const barWidth = 30 + scrollPercent * 0.7;
    progressFill.style.width = `${barWidth}%`;
  });
}

// ==================== GSAP REVEALS ====================
if (window.gsap) {
  if (document.querySelector(".crb-faq-section")) {
    gsap.fromTo(
      ".crb-faq-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: ".crb-faq-section", start: "top 80%" },
      },
    );
    gsap.fromTo(
      ".faq-col.gs-reveal-left",
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: ".crb-faq-section", start: "top 70%" },
      },
    );
    gsap.fromTo(
      ".faq-col.gs-reveal-right",
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: ".crb-faq-section", start: "top 70%" },
      },
    );
  }

  if (document.querySelector(".crb-news-section")) {
    gsap.fromTo(
      ".crb-news-container",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: ".crb-news-section", start: "top 80%" },
      },
    );
    gsap.fromTo(
      ".news-card-v2",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".news-slider", start: "top 85%" },
      },
    );
  }
}

// ==================== INSTAGRAM SECTION REVEAL ====================
if (document.querySelector(".crb-insta-section")) {
  const instaTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".crb-insta-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // 1. Text fades in from Left
  instaTl
    .fromTo(
      ".insta-info-col",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    )
    // 2. Photos pop in from the right one by one
    .fromTo(
      ".gs-insta-item",
      { x: 50, opacity: 0, autoAlpha: 0 },
      {
        x: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
      "-=0.4",
    );
}

// ==================== HEADER SCROLL SWITCHER ====================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".crib-hdr-wrapper");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// =========================================================================
// GSAP SCROLL ANIMATIONS (BUILD UP ON SCROLL DOWN, DISASSEMBLE ON SCROLL UP)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Make sure GSAP ScrollTrigger is registered
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // General settings for all triggers
    // play = animate in (scroll down), reverse = animate out (scroll up)
    const getTriggerSettings = (element) => ({
      trigger: element,
      start: "top 80%", // Animates when section is 20% visible from bottom
      toggleActions: "play none none reverse",
    });

    // 1. WELCOME / ABOUT SECTION
    if (document.querySelector(".crb-nw-welcome-sec")) {
      const aboutTl = gsap.timeline({
        scrollTrigger: getTriggerSettings(".crb-nw-welcome-sec"),
      });

      aboutTl
        .fromTo(
          ".crb-text-reveal",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        )
        .fromTo(
          ".gs-nw-right",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".gs-nw-up",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );
    }

    // 2. DASHBOARD SECTION
    if (document.querySelector(".crib-dashboard-section")) {
      const dashTl = gsap.timeline({
        scrollTrigger: getTriggerSettings(".crib-dashboard-section"),
      });

      dashTl
        .fromTo(
          ".dash-anim-text",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        )
        .fromTo(
          ".dash-anim-frame",
          { scale: 0.9, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".dash-anim-widget",
          { scale: 0.8, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.2)",
          },
          "-=0.2",
        )
        .fromTo(
          ".float-widget",
          { scale: 0.5, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        );
    }

    // 3. IMPACT & JOURNEY SECTION
    if (document.querySelector(".crib-impact-journey-section")) {
      const journeyTl = gsap.timeline({
        scrollTrigger: getTriggerSettings(".crib-impact-journey-section"),
      });

      journeyTl
        .fromTo(
          ".gs-reveal-left",
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          ".gs-reveal-right",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.8",
        )
        .fromTo(
          ".journey-text-col.gs-reveal-up",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        )
        .fromTo(
          ".journey-step",
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=0.4",
        );
    }

    // 4. FAQ SECTION
    if (document.querySelector(".crb-faq-section")) {
      const faqTl = gsap.timeline({
        scrollTrigger: getTriggerSettings(".crb-faq-section"),
      });

      faqTl
        .fromTo(
          ".crb-faq-header",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        )
        .fromTo(
          ".faq-col.gs-reveal-left",
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".faq-col.gs-reveal-right",
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.6",
        );
    }

    // 5. NEWS & EVENTS SECTION
    if (document.querySelector(".crb-news-section")) {
      const newsTl = gsap.timeline({
        scrollTrigger: getTriggerSettings(".crb-news-section"),
      });

      newsTl
        .fromTo(
          ".news-header",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        )
        .fromTo(
          ".news-card-v2",
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.4",
        );
    }

    // 6. INSTAGRAM FEED SECTION
    if (document.querySelector(".crb-insta-section")) {
      const instaTl = gsap.timeline({
        scrollTrigger: getTriggerSettings(".crb-insta-section"),
      });

      instaTl
        .fromTo(
          ".gs-reveal-left",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        )
        .fromTo(
          ".gs-insta-item",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=0.4",
        );
    }
  }
});

// ==================== NEXT-LEVEL SECTION OVERLAP (PINNING) ====================
// Overlap karanna oni main sections tika select karagannawa
const overlapSections = gsap.utils.toArray(
  ".crib-hero, .crb-nw-welcome-sec, .crib-dashboard-section, .crib-impact-journey-section",
);

overlapSections.forEach((section, index) => {
  // Anthima section eka pin karanne na (eka natural scroll wenna oni nisa)
  ScrollTrigger.create({
    trigger: section,
    start: "top top", // Section eka screen eke udatama awama pin wenawa
    pin: true, // Section eka lock karanawa
    pinSpacing: false, // Meka thama MAGIC eka! Meken thamai yata section ekata udata slide wenna ida denne
    id: `overlap-${index}`,
  });
});

// =========================================================================
// SPLASH PAGE ENTRANCE ANIMATION (INDEX.HTML)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".cs-splash")) {
    // Top banner drops in
    gsap.fromTo(
      ".gs-splash-banner",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    // Ribbons drop down one by one
    gsap.fromTo(
      ".gs-splash-ribbon",
      { y: -150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        delay: 0.2,
      },
    );
  }
});

/* ============================================================
   MYREPORT - HERO GSAP ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Hero Content Text & Buttons
    heroTimeline
      .from(".hero-content .hero-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      })
      // Dashboard Shell
      .from(
        ".dashboard-shell",
        {
          x: 60,
          y: 30,
          rotationY: 15,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
        },
        "-=0.6",
      )
      // Floating Widgets Pop-in
      .from(
        ".floating-widget",
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.15,
        },
        "-=0.6",
      );

    // Continuous Floating Animations
    gsap.to(".widget-score", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".widget-payment", {
      y: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".widget-verified", {
      y: -10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Dashboard Parallax Effect on Scroll
    gsap.to(".dashboard-shell", {
      y: -50,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }
});

/* ============================================================
   BENEFITS (BENTO GRID) GSAP ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    // 1. Benefits Section Heading
    gsap.from(".benefits .section-heading > *", {
      scrollTrigger: {
        trigger: ".benefits",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    // 2. Bento Cards Pop-in Animation
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.2)",
    });

    // ==========================================
    // 🌟 INTERNAL CARD ANIMATIONS 🌟
    // ==========================================

    // A. Icons pop and rotate in
    gsap.from(".bento-icon svg", {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      scale: 0,
      rotation: -45,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.4,
      ease: "back.out(2)",
    });

    // B. Card 1: Mini UI Rows slide in one by one
    if (document.querySelector(".credit-mini-ui")) {
      gsap.from(".credit-mini-row", {
        scrollTrigger: {
          trigger: ".bento-large",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    // C. Card 5: Score Circle Pop & Number Counter
    if (document.querySelector(".decision-visual")) {
      // Circle pops in
      gsap.from(".decision-score", {
        scrollTrigger: {
          trigger: ".bento-wide",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Number counts up to 785
      gsap.fromTo(
        ".decision-score strong",
        { innerHTML: 300 }, // Start number
        {
          innerHTML: 785, // End number
          duration: 2,
          delay: 0.8,
          snap: { innerHTML: 1 }, // Keeps it as whole numbers (no decimals)
          scrollTrigger: {
            trigger: ".bento-wide",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }
});

/* ============================================================
   APP PREVIEW SLIDER (HORIZONTAL PINNED SCROLL)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (
    window.gsap &&
    window.ScrollTrigger &&
    document.querySelector(".app-slider-section")
  ) {
    const sliderSection = document.querySelector(".app-slider-section");
    const sliderTrack = document.querySelector(".gs-slider-track");

    // Calculate the exact distance to move horizontally
    // Track width minus one screen width (so it stops perfectly on the last slide)
    const getScrollAmount = () =>
      -(sliderTrack.scrollWidth - window.innerWidth);

    // Create the timeline for the scrolljacking
    let sliderTween = gsap.to(sliderTrack, {
      x: getScrollAmount,
      ease: "none", // Linear movement is best for scroll
      scrollTrigger: {
        trigger: sliderSection,
        start: "top top", // When section hits the very top of the screen
        end: () => `+=${sliderTrack.scrollWidth - window.innerWidth}`, // Scroll duration based on content width
        pin: true, // Lock the screen!
        scrub: 1, // Smooth scrubbing (1 second delay for smoothness)
        invalidateOnRefresh: true, // Recalculate on window resize

        // Update the tiny progress bar at the bottom
        onUpdate: (self) => {
          const progressBar = document.querySelector(".gs-progress");
          if (progressBar) {
            progressBar.style.width = self.progress * 100 + "%";
          }
        },
      },
    });
  }
});

/* ============================================================
   HOW IT WORKS (ADVANCED ROADMAP) GSAP ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (
    window.gsap &&
    window.ScrollTrigger &&
    document.querySelector(".how-it-works")
  ) {
    // 1. Heading fades in
    gsap.fromTo(
      ".gs-step-head > *",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".how-it-works",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
    );

    // 2. Main Track fills horizontally
    gsap.fromTo(
      ".gs-rm-track",
      { width: "0%" },
      {
        scrollTrigger: {
          trigger: ".roadmap-wrapper",
          start: "top 65%",
          end: "center 40%",
          scrub: 1,
        },
        width: "100%",
        ease: "none",
      },
    );

    // 3. Nodes Pop-in
    gsap.fromTo(
      ".gs-rm-node",
      { scale: 0, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".roadmap-wrapper",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.25,
        delay: 0.1,
        ease: "elastic.out(1, 0.6)",
      },
    );

    // 4. Dashed connectors grow vertically
    gsap.fromTo(
      ".gs-rm-line",
      { scaleY: 0, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".roadmap-wrapper",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        scaleY: 1,
        opacity: 1,
        transformOrigin: "bottom",
        duration: 0.5,
        stagger: 0.25,
        delay: 0.3,
        ease: "power2.out",
      },
    );

    // 5. Content Boxes slide in
    gsap.fromTo(
      ".gs-rm-step .rm-box",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".roadmap-wrapper",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.25,
        delay: 0.4,
        ease: "back.out(1.2)",
      },
    );
  }
});

/* ============================================================
   INFORMATION & FINAL CTA - GSAP ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    // 1. Information Section Heading
    gsap.fromTo(
      ".gs-info-head > *",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".information",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
    );

    // 2. Information Cards Pop Up
    gsap.fromTo(
      ".gs-info-card",
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".info-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
    );

    // 3. Final CTA Content
    gsap.fromTo(
      ".gs-cta-item",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
    );

    // 4. Subtle Parallax for CTA Background Pattern
    gsap.to(".gs-cta-pattern", {
      scrollTrigger: {
        trigger: ".final-cta",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: 100,
      ease: "none",
    });
  }
});

/* ============================================================
   PRICING SECTION - GSAP ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (
    window.gsap &&
    window.ScrollTrigger &&
    document.querySelector(".pricing")
  ) {
    // 1. Heading & Toggle Animation
    gsap.fromTo(
      ".gs-pricing-head > *",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".pricing",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
    );

    // 2. Pricing Cards Pop-in
    gsap.fromTo(
      ".gs-pricing-card",
      { y: 60, scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
      },
    );

    // Optional: Simple Toggle Switch Logic (Visual only)
    const toggleBtns = document.querySelectorAll(".toggle-option");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        toggleBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }
});
/* ============================================================
   BUREAU GOVERNANCE - MODAL & GSAP REVEALS
============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    var govModal = document.getElementById("govProfileModal");
    var modalBox = document.getElementById("govModalBox");
    var modalClose = govModal
      ? govModal.querySelector(".gov-modal-close")
      : null;
    var lastFocus = null;

    var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasGSAP = !!window.gsap;

    if (!govModal) return; // Exit if not on Governance page

    /* MODAL LOGIC */
    window.openGovModal = function (cardElement) {
      var name = cardElement.querySelector(".card-name").innerText;
      var role = cardElement.querySelector(".card-role").innerText;
      var bioHtml = cardElement.querySelector(".gov-hidden-bio").innerHTML;

      lastFocus = cardElement;

      document.getElementById("modalName").innerText = name;
      document.getElementById("modalRole").innerText = role;
      document.getElementById("modalBio").innerHTML = bioHtml;

      govModal.classList.add("active");
      document.body.style.overflow = "hidden";
      document.getElementById("modalScrollArea").scrollTop = 0;

      if (hasGSAP && !REDUCED) {
        gsap.killTweensOf([govModal, modalBox, ".modal-reveal-elem"]);
        const tl = gsap.timeline();
        tl.fromTo(
          govModal,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
        )
          .fromTo(
            modalBox,
            { scale: 0.95, y: 30, autoAlpha: 0 },
            { scale: 1, y: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" },
            "-=0.1",
          )
          .fromTo(
            ".modal-reveal-elem",
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.3",
          );
      } else {
        govModal.style.opacity = 1;
      }

      setTimeout(function () {
        modalClose.focus();
      }, 100);
    };

    window.closeGovModal = function () {
      var done = function () {
        govModal.classList.remove("active");
        document.body.style.overflow = "";
        if (lastFocus) lastFocus.focus();
      };

      if (hasGSAP && !REDUCED) {
        gsap.killTweensOf([govModal, modalBox]);
        gsap
          .timeline({ onComplete: done })
          .to(modalBox, {
            scale: 0.98,
            y: 15,
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.in",
          })
          .to(
            govModal,
            { autoAlpha: 0, duration: 0.2, ease: "power2.in" },
            "-=0.1",
          );
      } else {
        govModal.style.opacity = 0;
        done();
      }
    };

    govModal.addEventListener("click", function (e) {
      if (e.target === this) closeGovModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && govModal.classList.contains("active"))
        closeGovModal();
    });

    /* SCROLL REVEALS */
    if (hasGSAP && window.ScrollTrigger && !REDUCED) {
      gsap.registerPlugin(ScrollTrigger);
      var D = { immediateRender: false };

      gsap.from(
        ".gov-hero-rise",
        Object.assign({}, D, {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.1,
        }),
      );

      gsap.from(
        ".gov-intro .gov-rise",
        Object.assign({}, D, {
          y: 25,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gov-intro",
            start: "top 85%",
            once: true,
          },
        }),
      );

      gsap.from(
        ".gov-card",
        Object.assign({}, D, {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".gov-grid", start: "top 85%", once: true },
        }),
      );
    }
  });
})();
/* ============================================================
   DOWNLOADS PAGE - GSAP & TABS LOGIC
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const isDownloadsPage = document.querySelector(".dl-page-wrapper");
  if (!isDownloadsPage) return; // Only run on downloads page

  // 1. Initial Scroll Reveals
  if (typeof gsap !== "undefined") {
    gsap.from(".dl-hero-rise", {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.1,
      delay: 0.1,
    });

    // Animate cards on initial load
    gsap.from(".dl-card", {
      y: 20,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.02,
      delay: 0.4,
    });
  }

  // 2. Custom Tab Logic for "All" functionality
  const tabBtns = document.querySelectorAll(".dl-tab-btn");
  const tabPanels = document.querySelectorAll(".dl-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active states from buttons and panels
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      // Add active state to clicked button
      btn.classList.add("active");
      const targetTabId = btn.getAttribute("data-tab");

      let targetCards;

      // Logic: If "All", show everything. Otherwise show specific tab.
      if (targetTabId === "tab-all") {
        tabPanels.forEach((p) => p.classList.add("active")); // Show all
        targetCards = document.querySelectorAll(".dl-panel .dl-card");
      } else {
        const targetPanel = document.getElementById(targetTabId);
        targetPanel.classList.add("active"); // Show selected
        targetCards = targetPanel.querySelectorAll(".dl-card");
      }

      // GSAP Transition for cards when switching tabs
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          targetCards,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: "power3.out",
          },
        );
      }
    });
  });
});
