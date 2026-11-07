const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    }
  });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const emailFallback = document.querySelector("#email-fallback");

if (contactForm instanceof HTMLFormElement && formStatus && emailFallback instanceof HTMLAnchorElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const message = String(formData.get("message"));
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const composeUrl = new URL("https://mail.google.com/mail/");
    composeUrl.searchParams.set("view", "cm");
    composeUrl.searchParams.set("fs", "1");
    composeUrl.searchParams.set("to", "mamtagangwar0528@gmail.com");
    composeUrl.searchParams.set("su", subject);
    composeUrl.searchParams.set("body", body);
    emailFallback.href = `mailto:mamtagangwar0528@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(composeUrl.toString(), "_blank", "noopener,noreferrer");
    formStatus.textContent = "Gmail is opening with your message. If it did not open, use the email app link.";
  });
}

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
  const revealTargets = document.querySelectorAll(
    ".about-section, .skill-card, .project-card, .experience-card, .education-card, .certification-line, .contact-layout",
  );
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    observer.observe(target);
  });
}
