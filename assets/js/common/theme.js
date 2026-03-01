(function () {
  var root = document.documentElement;
  var storageKey = "site-theme";
  var cookieKey = "site-theme";
  var toggle = document.querySelector("[data-theme-toggle]");

  function getCookie(name) {
    var parts = document.cookie ? document.cookie.split("; ") : [];
    for (var i = 0; i < parts.length; i += 1) {
      var pair = parts[i].split("=");
      if (pair[0] === name) {
        return decodeURIComponent(pair.slice(1).join("="));
      }
    }
    return null;
  }

  function setCookie(name, value) {
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; path=/; max-age=31536000; samesite=lax";
  }

  function createFallbackToggle() {
    var isZh =
      typeof root.lang === "string" &&
      root.lang.toLowerCase().indexOf("zh") === 0;
    var button = document.createElement("button");
    var icon = document.createElement("span");
    var label = document.createElement("span");

    button.type = "button";
    button.className = "theme-toggle-floating";
    button.setAttribute("data-theme-toggle", "");
    button.setAttribute("aria-label", isZh ? "切换主题" : "Toggle theme");
    button.setAttribute("data-theme-light-label", isZh ? "浅色" : "Light");
    button.setAttribute("data-theme-dark-label", isZh ? "深色" : "Dark");

    icon.className = "hero__theme-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "☀";

    label.className = "hero__theme-label";
    label.textContent = isZh ? "浅色" : "Light";

    button.appendChild(icon);
    button.appendChild(label);
    document.body.appendChild(button);
    return button;
  }

  function getStoredTheme() {
    try {
      var theme = localStorage.getItem(storageKey);
      if (theme === "dark" || theme === "light") {
        return theme;
      }
    } catch (_error) {
      // Ignore and fallback to cookie.
    }
    var cookieTheme = getCookie(cookieKey);
    return cookieTheme === "dark" || cookieTheme === "light"
      ? cookieTheme
      : null;
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_error) {
      // Ignore and keep cookie as fallback.
    }
    setCookie(cookieKey, theme);
  }

  function setToggleState(theme) {
    if (!toggle) return;

    var iconNode = toggle.querySelector(".hero__theme-icon");
    var labelNode = toggle.querySelector(".hero__theme-label");
    var isDark = theme === "dark";
    var lightLabel = toggle.getAttribute("data-theme-light-label") || "Light";
    var darkLabel = toggle.getAttribute("data-theme-dark-label") || "Dark";

    toggle.setAttribute("aria-pressed", String(isDark));

    if (iconNode) {
      iconNode.textContent = isDark ? "☾" : "☀";
    }

    if (labelNode) {
      labelNode.textContent = isDark ? darkLabel : lightLabel;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    setToggleState(theme);
  }

  if (!toggle) {
    toggle = createFallbackToggle();
  }

  var currentTheme = getStoredTheme() === "dark" ? "dark" : "light";
  applyTheme(currentTheme);

  toggle.addEventListener("click", function () {
    currentTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
    setStoredTheme(currentTheme);
  });
})();
