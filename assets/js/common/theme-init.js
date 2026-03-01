(function () {
  var root = document.documentElement;
  var storageKey = "site-theme";
  var cookieKey = "site-theme";

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

  var theme = null;
  var hasLocalTheme = false;

  try {
    var stored = localStorage.getItem(storageKey);
    if (stored === "dark" || stored === "light") {
      theme = stored;
      hasLocalTheme = true;
    }
  } catch (_error) {
    // Ignore and fallback to cookie below.
  }

  if (!hasLocalTheme) {
    var fromCookie = getCookie(cookieKey);
    if (fromCookie === "dark" || fromCookie === "light") {
      theme = fromCookie;
    }
  }

  if (theme !== "dark" && theme !== "light") {
    theme = "light";
  }

  root.setAttribute("data-theme", theme);
})();
