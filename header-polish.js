(function () {
  function initHeaderLanguages() {
    if (!header) return;

    header.querySelectorAll(".cnh-language").forEach((element) => {
      element.remove();
    });

    const mainNav = header.querySelector(".crib-main-nav");
    if (!mainNav) return;

    /*
      TRANSLATED PAGE LINKS

      Real Sinhala / Tamil URLs labunama me object ekata danna.
      Current page eke filename eka key eka widiyata use karanna.

      Empty URLs create disabled options, not broken links.
    */
    const translatedPages = {
      "home-ewn.html": {
        si: "",
        ta: "",
      },
      "home.html": {
        si: "",
        ta: "",
      },
      "about.html": {
        si: "",
        ta: "",
      },
      "downloads.html": {
        si: "",
        ta: "",
      },
      "education.html": {
        si: "",
        ta: "",
      },
    };

    const currentFile = location.pathname.split("/").pop();

    const currentLanguage = (document.documentElement.lang || "en")
      .toLowerCase()
      .split("-")[0];

    const pageLinks = translatedPages[currentFile] || {};

    /*
      Also supports real alternate-language links in the page head:
      <link rel="alternate" hreflang="si" href="REAL_URL">
    */
    const alternateLinks = [
      ...document.querySelectorAll('link[rel~="alternate"][hreflang][href]'),
    ];

    const languages = [
      { code: "en", label: "EN", name: "English" },
      { code: "si", label: "සිංහල", name: "සිංහල" },
      { code: "ta", label: "தமிழ்", name: "தமிழ்" },
    ];

    const selector = document.createElement("nav");
    selector.className = "cnh-language";
    selector.setAttribute("aria-label", "Page language");

    languages.forEach((language) => {
      const option = document.createElement("a");

      option.className = "cnh-language-option";
      option.textContent = language.label;
      option.lang = language.code;
      option.hreflang = language.code;
      option.setAttribute("aria-label", language.name);

      const isCurrent = language.code === currentLanguage;

      const alternate = alternateLinks.find((link) => {
        return link.hreflang.toLowerCase().split("-")[0] === language.code;
      });

      const destination = isCurrent
        ? location.href
        : pageLinks[language.code] || alternate?.getAttribute("href") || "";

      let validURL = null;

      if (destination) {
        try {
          const url = new URL(destination, document.baseURI);

          if (
            url.protocol === "https:" ||
            url.protocol === "http:" ||
            (location.protocol === "file:" && url.protocol === "file:")
          ) {
            validURL = url.href;
          }
        } catch {
          // Leave an invalid or missing destination disabled.
        }
      }

      if (validURL) {
        option.href = validURL;
      } else {
        option.setAttribute("aria-disabled", "true");
        option.setAttribute("role", "link");
        option.tabIndex = -1;
      }

      if (isCurrent) {
        option.setAttribute("aria-current", "page");
      }

      selector.appendChild(option);
    });

    let rightSide = header.querySelector(".crib-nav-right");

    if (!rightSide) {
      rightSide = document.createElement("div");
      rightSide.className = "crib-nav-right";
      mainNav.appendChild(rightSide);
    }

    rightSide.appendChild(selector);

    // Remove the old topbar language buttons after adding the new control.
    header.querySelectorAll(".crib-lang-btns").forEach((element) => {
      element.remove();
    });

    // Set the correct existing header colour on a restored scroll position.
    header.classList.toggle("scrolled", window.scrollY > 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeaderLanguages, {
      once: true,
    });
  } else {
    initHeaderLanguages();
  }
})();
