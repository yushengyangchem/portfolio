(function () {
  function initSearch() {
    var input = document.getElementById("blog-search-input");
    var posts = document.querySelectorAll(".blog-post");
    var emptyState = document.getElementById("blog-empty");

    if (!input || posts.length === 0) {
      return;
    }

    function filterPosts() {
      var query = input.value.trim().toLowerCase();
      var visibleCount = 0;

      posts.forEach(function (post) {
        var text = (post.textContent || "").toLowerCase();
        var matched = query === "" || text.indexOf(query) !== -1;

        post.hidden = !matched;
        if (matched) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    }

    input.addEventListener("input", filterPosts);
  }

  function initBackToTop() {
    var button = document.getElementById("blog-back-top");
    if (!button) {
      return;
    }

    function syncButtonVisibility() {
      var show = window.scrollY > 160;
      button.hidden = !show;
    }

    window.addEventListener("scroll", syncButtonVisibility, { passive: true });
    syncButtonVisibility();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        var successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!successful) {
          reject(new Error("Copy command failed"));
          return;
        }
        resolve();
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  function initCodeCopy() {
    var blocks = document.querySelectorAll(".blog-block pre > code");
    if (blocks.length === 0) {
      return;
    }

    blocks.forEach(function (code) {
      var pre = code.parentElement;
      if (!pre || pre.querySelector(".blog-copy-btn")) {
        return;
      }

      var button = document.createElement("button");
      button.type = "button";
      button.className = "blog-copy-btn";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code");

      button.addEventListener("click", function () {
        var raw = code.textContent || "";
        copyText(raw.replace(/\n$/, ""))
          .then(function () {
            button.textContent = "Copied";
            button.classList.add("is-copied");
            window.setTimeout(function () {
              button.textContent = "Copy";
              button.classList.remove("is-copied");
            }, 1200);
          })
          .catch(function () {
            button.textContent = "Failed";
            window.setTimeout(function () {
              button.textContent = "Copy";
            }, 1200);
          });
      });

      pre.appendChild(button);
    });
  }

  initSearch();
  initBackToTop();
  initCodeCopy();
})();
