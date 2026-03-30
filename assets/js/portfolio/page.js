const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = Math.min(index * 80, 400);
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

revealItems.forEach((item) => observer.observe(item));

const experienceNode = document.querySelector("#experience-duration");
if (experienceNode) {
  const startValue = experienceNode.dataset.start;
  if (startValue) {
    const [startYear, startMonth] = startValue.split("-").map(Number);
    const now = new Date();
    let totalMonths =
      (now.getFullYear() - startYear) * 12 + (now.getMonth() + 1 - startMonth);
    if (totalMonths < 0) totalMonths = 0;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} 年`);
    parts.push(`${months} 个月`);
    experienceNode.textContent = parts.join(" ");
  }
}

const papersCount = document.querySelectorAll("#papers-list li").length;
const patentsCount = document.querySelectorAll("#patents-list li").length;

document.querySelectorAll("[data-count='papers']").forEach((node) => {
  node.textContent = papersCount;
});

document.querySelectorAll("[data-count='patents']").forEach((node) => {
  node.textContent = patentsCount;
});

const emailLink = document.querySelector(".email-link");
const revealEmail = () => {
  if (!emailLink || emailLink.dataset.revealed === "1") return;
  const user = "zvtifohzbohdifo"
    .split("")
    .map((ch) => String.fromCharCode(ch.charCodeAt(0) - 1))
    .join("");
  const domain = ["moc", "liamg"]
    .map((part) => part.split("").reverse().join(""))
    .reverse()
    .join(".");
  const email = `${user}@${domain}`;
  emailLink.textContent = email;
  emailLink.href = `mailto:${email}`;
  emailLink.dataset.revealed = "1";
};

if (emailLink) {
  emailLink.addEventListener("click", (event) => {
    event.preventDefault();
    revealEmail();
  });
}

const ageDisplay = document.querySelector("#age-display");
if (ageDisplay) {
  const [birthYear, birthMonth, birthDay] = [1995, 2, 22];
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > birthMonth ||
    (today.getMonth() + 1 === birthMonth && today.getDate() >= birthDay);
  if (!hasHadBirthdayThisYear) age -= 1;
  if (age < 0) age = 0;
  ageDisplay.textContent = `🎂 年龄：${age}岁`;
}

const portfolioBackTop = document.getElementById("blog-back-top");
if (portfolioBackTop) {
  const syncPortfolioBackTop = () => {
    portfolioBackTop.hidden = window.scrollY <= 160;
  };

  window.addEventListener("scroll", syncPortfolioBackTop, { passive: true });
  syncPortfolioBackTop();

  portfolioBackTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const printButtons = document.querySelectorAll(".js-print-page");
printButtons.forEach((button) => {
  button.addEventListener("click", () => {
    revealEmail();
    window.print();
  });
});

window.addEventListener("beforeprint", () => {
  revealEmail();
});
