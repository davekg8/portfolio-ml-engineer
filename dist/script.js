const SUPPORTED = ["fr", "en"];
const STORAGE_KEY = "lang";

const META = {
  fr: {
    description:
      "Portfolio de David Egbakou, ML Engineer spécialisé en forecasting, séries temporelles et systèmes Machine Learning industriels.",
    locale: "fr_FR",
    switchLabel: "Switch to English",
  },
  en: {
    description:
      "Portfolio of David Egbakou, ML Engineer specialized in forecasting, time series and industrial Machine Learning systems.",
    locale: "en_US",
    switchLabel: "Passer en français",
  },
};

const langButton = document.querySelector(".lang-switch");
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");

function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage can be blocked (private mode); the choice just won't persist.
  }
}

// Priority: ?lang= in the URL, then the visitor's last choice, then the browser language.
function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (SUPPORTED.includes(fromUrl)) return fromUrl;
  const stored = readStoredLang();
  if (SUPPORTED.includes(stored)) return stored;
  return (navigator.language || "fr").toLowerCase().startsWith("fr")
    ? "fr"
    : "en";
}

function setMeta(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", value);
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  // Texts may contain <br> for line breaks; they are authored in this file's HTML, not user input.
  document.querySelectorAll("[data-fr]").forEach((el) => {
    const value = el.dataset[lang];
    if (value.includes("<br>")) el.innerHTML = value;
    else el.textContent = value;
  });
  document.querySelectorAll("[data-aria-fr]").forEach((el) => {
    el.setAttribute(
      "aria-label",
      lang === "fr" ? el.dataset.ariaFr : el.dataset.ariaEn,
    );
  });
  document.querySelectorAll("[data-href-fr]").forEach((el) => {
    el.setAttribute(
      "href",
      lang === "fr" ? el.dataset.hrefFr : el.dataset.hrefEn,
    );
  });

  const meta = META[lang];
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:locale"]', meta.locale);

  const parts = langButton.querySelectorAll("span");
  parts[0].classList.toggle("active", lang === "fr");
  parts[1].classList.toggle("active", lang === "en");
  langButton.setAttribute("aria-label", meta.switchLabel);
}

let lang = initialLang();
if (lang !== "fr") applyLang(lang);

langButton.addEventListener("click", () => {
  lang = lang === "fr" ? "en" : "fr";
  applyLang(lang);
  storeLang(lang);
});

// Mobile menu
function setMenu(open) {
  header.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () =>
  setMenu(!header.classList.contains("menu-open")),
);
document
  .querySelectorAll("#site-nav a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("menu-open")) {
    setMenu(false);
    menuButton.focus();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
