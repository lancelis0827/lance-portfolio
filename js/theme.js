const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeIcon = themeToggle.querySelector("i");

function getEffectiveTheme() {
  const currentTheme = root.getAttribute("data-theme");

  if (currentTheme) {
    return currentTheme;
  }

  return systemTheme.matches ? "dark" : "light";
}

function updateThemeToggle() {
  const effectiveTheme = getEffectiveTheme();

  if (effectiveTheme === "dark") {
    themeIcon.className = "ph ph-sun";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  } else {
    themeIcon.className = "ph ph-moon";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  }

  themeIcon.style.visibility = "visible";
}

themeToggle.addEventListener("click", () => {
  const effectiveTheme = getEffectiveTheme();

  let nextTheme;

  if (effectiveTheme === "dark") {
    nextTheme = "light";
  } else {
    nextTheme = "dark";
  }

  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);

  updateThemeToggle();
});

systemTheme.addEventListener("change", () => {
  const currentTheme = root.getAttribute("data-theme");

  if (!currentTheme) {
    updateThemeToggle();
  }
});

updateThemeToggle();