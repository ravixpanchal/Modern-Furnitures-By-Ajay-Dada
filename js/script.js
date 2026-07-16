/* =========================================================================
   MODERN FURNITURES BY AJAY DADA — site logic
   ========================================================================= */
(function () {
  "use strict";

  const CATEGORY_LABELS = ["Bedroom", "Door & Window", "Kitchens", "Living Room & T.V. Panel", "Wardrobe","Office","Other's","Temple"];
  const CATEGORY_I18N_KEY = {
    Bedroom: "categories.bedroom",
    "Door & Window": "categories.doorwindow",
    Kitchens: "categories.kitchens",
    "Living Room & T.V. Panel": "categories.livingrooms",
    Wardrobe: "categories.wardrobe",
    Office: "categories.office",
    "Other's": "categories.others",
    Temple: "categories.temple",
  };

  let state = {
    lang: localStorage.getItem("md_lang") || "en",
    theme: localStorage.getItem("md_theme") || "light",
    manifest: { all: [], categories: {}, bg_images: [] },
    activeFilter: "all",
    galleryPage: 1,
    galleryPageSize: 24,
    lightboxList: [],
    lightboxIndex: 0,
  };

  /* ---------------------------------------------------------------------
     MANIFEST LOADING (with graceful fallback)
     ------------------------------------------------------------------- */
  async function loadManifest() {
    try {
      const res = await fetch("manifest.json", { cache: "no-store" });
      if (!res.ok) throw new Error("manifest.json not found");
      const data = await res.json();
      state.manifest = {
        all: data.all || [],
        categories: data.categories || {},
        bg_images: data.bg_images || [],
      };
    } catch (err) {
      console.warn(
        "[Modern Furnitures] Could not load manifest.json — serve this folder over a local " +
          "server (e.g. `npx serve` or `python3 -m http.server`) and run `node generate-manifest.mjs` " +
          "after adding photos to /furnitures and /furnitures_class.",
        err
      );
      state.manifest = { all: [], categories: {}, bg_images: [] };
    }
  }

  function categoryCover(label) {
    const imgs = state.manifest.categories[label] || [];
    return imgs.length ? imgs[0] : null;
  }

  /* ---------------------------------------------------------------------
     I18N
     ------------------------------------------------------------------- */
  function applyLanguage(lang) {
    state.lang = lang;
    localStorage.setItem("md_lang", lang);
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll(".hero-tagline").forEach((el) => {
      el.style.display = el.classList.contains(lang) ? "block" : "none";
    });

    // Re-render language-dependent dynamic sections
    renderCategories();
    renderGallery(true);
    renderMaterials();
    renderStats();
    renderTestimonials();
    renderVideos();
    renderFaq();
    renderContact();
  }

  function t(key) {
    return (TRANSLATIONS[state.lang] || TRANSLATIONS.en)[key] || key;
  }

  function pick(obj) {
    // obj = { en: "...", hi: "..." }
    if (!obj) return "";
    return obj[state.lang] || obj.en || "";
  }

  /* ---------------------------------------------------------------------
     THEME
     ------------------------------------------------------------------- */
  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem("md_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  /* ---------------------------------------------------------------------
     HERO BACKGROUND SLIDER
     ------------------------------------------------------------------- */
  function initHeroSlider() {
    const wrap = document.getElementById("heroBg");
    if (!wrap) return;
    const pool = (state.manifest && state.manifest.bg_images && state.manifest.bg_images.length)
      ? state.manifest.bg_images
      : [
          "bg_images/1.jpeg", "bg_images/2.jpeg", "bg_images/3.jpeg", "bg_images/4.jpeg",
          "bg_images/5.jpeg", "bg_images/6.jpeg", "bg_images/7.jpeg", "bg_images/8.jpeg",
          "bg_images/9.jpeg", "bg_images/10.jpeg", "bg_images/11.jpeg", "bg_images/12.jpeg",
          "bg_images/13.jpeg"
        ];
    const slides = pool;

    if (!slides.length) {
      wrap.style.background =
        "radial-gradient(circle at 30% 20%, #3a2618, #1c130d 70%)";
      return;
    }

    slides.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = encodeSrc(src);
      img.alt = "";
      img.loading = i === 0 ? "eager" : "lazy";
      if (i === 0) img.classList.add("active");
      wrap.appendChild(img);
    });

    if (slides.length > 1) {
      let idx = 0;
      setInterval(() => {
        const imgs = wrap.querySelectorAll("img");
        if (imgs.length > 0) {
          imgs[idx].classList.remove("active");
          idx = (idx + 1) % imgs.length;
          imgs[idx].classList.add("active");
        }
      }, 4500);
    }
  }

  /* ---------------------------------------------------------------------
     INFINITE MARQUEE SHOWCASE
     ------------------------------------------------------------------- */
  function initMarquee() {
    const t1 = document.getElementById("marqueeTrack1");
    const t2 = document.getElementById("marqueeTrack2");
    if (!t1 || !t2) return;
    const all = state.manifest.all;
    if (!all.length) {
      t1.innerHTML = `<p style="color:var(--text-dim);padding:40px 24px">${escapeHtml(
        t("gallery.empty.text")
      )}</p>`;
      return;
    }
    const half = Math.ceil(all.length / 2);
    const rowA = all.slice(0, half);
    const rowB = all.slice(half).length ? all.slice(half) : all.slice(0, half);

    buildMarqueeRow(t1, rowA, all);
    buildMarqueeRow(t2, rowB, all);
  }

  function buildMarqueeRow(track, images, fullList) {
    // duplicate the list so the CSS translateX(-50%) loop is seamless
    const doubled = images.concat(images);
    track.innerHTML = doubled
      .map(
        (src, i) => `
      <div class="marquee-item" data-src="${escapeAttr(src)}" data-idx="${fullList.indexOf(
          images[i % images.length]
        )}">
        <img src="${escapeAttr(encodeSrc(src))}" alt="Furniture by Ajay Dada" loading="lazy" onerror="this.closest('.marquee-item').style.display='none'" />
      </div>`
      )
      .join("");

    track.querySelectorAll(".marquee-item").forEach((item) => {
      item.addEventListener("click", () => {
        openLightbox(fullList, parseInt(item.getAttribute("data-idx"), 10));
      });
    });
  }

  /* ---------------------------------------------------------------------
     CATEGORIES SECTION
     ------------------------------------------------------------------- */
  function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    if (!grid) return;
    grid.innerHTML = CATEGORY_LABELS.map((label) => {
      const imgs = state.manifest.categories[label] || [];
      const cover = imgs[0];
      const bg = cover
        ? `<img src="${escapeAttr(encodeSrc(cover))}" alt="" loading="lazy" />`
        : "";
      return `
      <article class="cat-card" data-label="${escapeAttr(label)}" style="${
        cover ? "" : "background:linear-gradient(135deg,var(--walnut-800),var(--walnut-700))"
      }">
        ${bg}
        <div class="cat-body">
          <div>
            <h3 class="cat-name">${escapeHtml(t(CATEGORY_I18N_KEY[label]))}</h3>
            <span class="cat-count">${imgs.length} ${escapeHtml(
        state.lang === "hi" ? "फोटो" : "photos"
      )}</span>
          </div>
          <span class="cat-arrow">→</span>
        </div>
      </article>`;
    }).join("");

    grid.querySelectorAll(".cat-card").forEach((card) => {
      card.addEventListener("click", () => {
        const label = card.getAttribute("data-label");
        setFilter(label);
        document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ---------------------------------------------------------------------
     GALLERY + FILTERS
     ------------------------------------------------------------------- */
  function renderFilterBar() {
    const bar = document.getElementById("filterBar");
    if (!bar) return;
    const chips = [{ key: "all", label: t("gallery.all") }].concat(
      CATEGORY_LABELS.map((l) => ({ key: l, label: t(CATEGORY_I18N_KEY[l]) }))
    );
    bar.innerHTML = chips
      .map(
        (c) =>
          `<button class="filter-chip${
            state.activeFilter === c.key ? " active" : ""
          }" data-key="${escapeAttr(c.key)}">${escapeHtml(c.label)}</button>`
      )
      .join("");
    bar.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => setFilter(chip.getAttribute("data-key")));
    });
  }

  function setFilter(key) {
    state.activeFilter = key;
    state.galleryPage = 1;
    renderFilterBar();
    renderGallery(true);
  }

  function currentGalleryImages() {
    if (state.activeFilter === "all") return state.manifest.all;
    return state.manifest.categories[state.activeFilter] || [];
  }

  function renderGallery(reset) {
    renderFilterBar();
    const grid = document.getElementById("galleryGrid");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!grid) return;
    if (reset) state.galleryPage = 1;

    const images = currentGalleryImages();

    if (!images.length) {
      grid.innerHTML = `
        <div class="gallery-empty" style="grid-column:1/-1">
          <h3>${escapeHtml(t("gallery.empty.title"))}</h3>
          <p>${escapeHtml(t("gallery.empty.text"))}</p>
        </div>`;
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      return;
    }

    const visibleCount = Math.min(images.length, state.galleryPageSize * state.galleryPage);
    const visible = images.slice(0, visibleCount);

    grid.innerHTML = visible
      .map((src, i) => {
        const label = labelForImage(src);
        return `
        <div class="gallery-item" data-idx="${i}">
          <img src="${escapeAttr(encodeSrc(src))}" alt="${escapeAttr(label)}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none'" />
          <span class="tag">${escapeHtml(label)}</span>
        </div>`;
      })
      .join("");

    grid.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        openLightbox(images, parseInt(item.getAttribute("data-idx"), 10));
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.style.display = visibleCount < images.length ? "inline-flex" : "none";
    }
  }

  function labelForImage(src) {
    if (state.activeFilter !== "all") return t(CATEGORY_I18N_KEY[state.activeFilter]) || state.activeFilter;
    for (const label of CATEGORY_LABELS) {
      if ((state.manifest.categories[label] || []).includes(src)) {
        return t(CATEGORY_I18N_KEY[label]);
      }
    }
    return state.lang === "hi" ? "फर्नीचर" : "Furniture";
  }

  /* ---------------------------------------------------------------------
     MATERIALS
     ------------------------------------------------------------------- */
  function renderMaterials() {
    const grid = document.getElementById("materialGrid");
    if (!grid) return;
    grid.innerHTML = SITE_CONFIG.materials
      .map(
        (m) => `
      <div class="material-card reveal">
        <h3 class="material-name">${escapeHtml(m.name)}</h3>
        <span class="material-level">${escapeHtml(pick(m.level))}</span>
        <p class="material-desc">${escapeHtml(pick(m.desc))}</p>
      </div>`
      )
      .join("");
  }

  /* ---------------------------------------------------------------------
     STATS COUNTERS
     ------------------------------------------------------------------- */
  function renderStats() {
    const grid = document.getElementById("statsGrid");
    if (!grid) return;
    grid.innerHTML = SITE_CONFIG.stats
      .map(
        (s, i) => `
      <div class="stat">
        <p class="stat-num" data-end="${s.end}" data-suffix="${escapeAttr(s.suffix)}" id="statNum${i}">0</p>
        <p class="stat-label">${escapeHtml(pick(s.label))}</p>
      </div>`
      )
      .join("");
    observeStats();
  }

  function observeStats() {
    const nums = document.querySelectorAll(".stat-num");
    if (!nums.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach((n) => io.observe(n));
  }

  function animateCount(el) {
    const end = parseInt(el.getAttribute("data-end"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------------
     TESTIMONIALS
     ------------------------------------------------------------------- */
  function renderTestimonials() {
    const grid = document.getElementById("testiGrid");
    if (!grid) return;
    grid.innerHTML = SITE_CONFIG.testimonials
      .map((tst) => {
        const initial = tst.name ? tst.name.charAt(0) : "?";
        const avatar = tst.photo
          ? `<img src="${escapeAttr(tst.photo)}" alt="${escapeAttr(tst.name)}" />`
          : initial;
        return `
        <div class="testi-card reveal">
          <div class="testi-stars">${"★".repeat(tst.rating || 5)}</div>
          <p class="testi-text">${escapeHtml(pick(tst.text))}</p>
          <div class="testi-person">
            <div class="testi-avatar">${avatar}</div>
            <div>
              <div class="testi-name">${escapeHtml(tst.name)}</div>
              <div class="testi-city">${escapeHtml(tst.city)}</div>
            </div>
          </div>
        </div>`;
      })
      .join("");
  }

  /* ---------------------------------------------------------------------
     VIDEOS
     ------------------------------------------------------------------- */
  function youtubeEmbed(url) {
    const idMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
    const id = idMatch ? idMatch[1] : null;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  function renderVideos() {
    const grid = document.getElementById("videoGrid");
    if (!grid) return;
    const videos = SITE_CONFIG.videos || [];
    if (!videos.length) {
      grid.innerHTML = `<div class="video-empty">${escapeHtml(t("videos.empty"))}</div>`;
      return;
    }
    grid.innerHTML = videos
      .map((v) => {
        let media = "";
        if (v.youtube) {
          const embed = youtubeEmbed(v.youtube);
          media = embed
            ? `<iframe src="${escapeAttr(
                embed
              )}" title="${escapeAttr(pick(v.title))}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
            : "";
        } else if (v.file) {
          media = `<video src="${escapeAttr(v.file)}" controls preload="metadata"></video>`;
        }
        return `
        <div class="video-card reveal">
          <div class="video-frame">${media}</div>
          <div class="video-title">${escapeHtml(pick(v.title))}</div>
        </div>`;
      })
      .join("");
  }

  /* ---------------------------------------------------------------------
     FAQ
     ------------------------------------------------------------------- */
  function renderFaq() {
    const list = document.getElementById("faqList");
    if (!list) return;
    list.innerHTML = SITE_CONFIG.faqs
      .map(
        (f, i) => `
      <div class="faq-item" id="faqItem${i}">
        <button class="faq-q" data-idx="${i}">
          <span>${escapeHtml(pick(f.q))}</span>
          <span class="plus">+</span>
        </button>
        <div class="faq-a"><div class="faq-a-inner">${escapeHtml(pick(f.a))}</div></div>
      </div>`
      )
      .join("");

    list.querySelectorAll(".faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const answer = item.querySelector(".faq-a");
        const isOpen = item.classList.contains("open");
        list.querySelectorAll(".faq-item.open").forEach((openItem) => {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     CONTACT / CTA WIRING (from config.js)
     ------------------------------------------------------------------- */
  function renderContact() {
    const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      SITE_CONFIG.whatsappMessage
    )}`;
    const telLink = `tel:${SITE_CONFIG.phoneDial}`;

    setHref("heroCall", telLink);
    setHref("heroWhatsapp", waLink);
    setHref("heroLocation", SITE_CONFIG.mapsShareLink);
    setHref("fabCall", telLink);
    setHref("fabWhatsapp", waLink);
    setHref("contactPhone", telLink, SITE_CONFIG.phoneDisplay);
    setHref("contactWhatsapp", waLink, SITE_CONFIG.phoneDisplay);
    setHref("contactDirections", SITE_CONFIG.mapsShareLink);
    setHref("socialFacebook", SITE_CONFIG.facebookUrl);
    setHref("socialWhatsapp2", waLink);

    const igBtn = document.getElementById("socialInstagram");
    if (igBtn) {
      if (SITE_CONFIG.instagramUrl) {
        igBtn.href = SITE_CONFIG.instagramUrl;
        igBtn.style.display = "grid";
      } else {
        igBtn.style.display = "none";
      }
    }

    const addr = document.getElementById("contactAddress");
    if (addr) {
      const lines = (SITE_CONFIG.addressLines && SITE_CONFIG.addressLines[state.lang]) || [];
      addr.innerHTML = lines.map((l) => escapeHtml(l)).join("<br/>");
    }

    const mapFrame = document.getElementById("mapFrame");
    if (mapFrame) mapFrame.src = SITE_CONFIG.mapsEmbedSrc;
  }

  function setHref(id, href, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("href", href);
    if (text !== undefined) el.textContent = text;
  }

  /* ---------------------------------------------------------------------
     LIGHTBOX
     ------------------------------------------------------------------- */
  function openLightbox(list, index) {
    state.lightboxList = list;
    state.lightboxIndex = index;
    updateLightboxImage();
    document.getElementById("lightbox").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.body.style.overflow = "";
  }

  function updateLightboxImage() {
    const img = document.getElementById("lightboxImg");
    if (!img || !state.lightboxList.length) return;
    img.src = encodeSrc(state.lightboxList[state.lightboxIndex]);
  }

  function lightboxStep(dir) {
    const len = state.lightboxList.length;
    if (!len) return;
    state.lightboxIndex = (state.lightboxIndex + dir + len) % len;
    updateLightboxImage();
  }

  function initLightbox() {
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => lightboxStep(-1));
    document.getElementById("lightboxNext").addEventListener("click", () => lightboxStep(1));
    document.getElementById("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!document.getElementById("lightbox").classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxStep(-1);
      if (e.key === "ArrowRight") lightboxStep(1);
    });
  }

  /* ---------------------------------------------------------------------
     NAV / MOBILE MENU / SCROLL REVEAL
     ------------------------------------------------------------------- */
  function initNav() {
    const nav = document.getElementById("siteNav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    });

    const burger = document.getElementById("navBurger");
    const mobileNav = document.getElementById("mobileNav");
    burger.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileNav.classList.remove("open"))
    );
  }

  function initRevealOnScroll() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------------------
     UTIL
     ------------------------------------------------------------------- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(str) {
    return escapeHtml(str);
  }
  function encodeSrc(path) {
    // manifest paths may contain spaces (e.g. "furnitures_class/Living rooms/01.jpg")
    // encodeURI preserves "/" while safely escaping spaces and other special chars.
    return encodeURI(path);
  }

  /* ---------------------------------------------------------------------
     INIT
     ------------------------------------------------------------------- */
  async function init() {
    document.getElementById("year").textContent = new Date().getFullYear();
    applyTheme(state.theme);

    await loadManifest();

    applyLanguage(state.lang); // also triggers first render of dynamic sections
    initHeroSlider();
    initMarquee();
    initLightbox();
    initNav();

    document.getElementById("loadMoreBtn").addEventListener("click", () => {
      state.galleryPage += 1;
      renderGallery(false);
    });

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang")));
    });

    document.getElementById("themeToggle").addEventListener("click", () => {
      applyTheme(state.theme === "dark" ? "light" : "dark");
    });

    // Re-run reveal observer after dynamic content is injected
    setTimeout(initRevealOnScroll, 50);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
