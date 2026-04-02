document.addEventListener("DOMContentLoaded", async () => {
  const counter = document.querySelector("[data-visitor-counter]");
  if (counter) {
    try {
      const response = await fetch("https://api.countapi.xyz/hit/xiaodongliu-homepage/site");
      if (!response.ok) throw new Error("counter request failed");

      const data = await response.json();
      if (typeof data.value !== "number") throw new Error("invalid counter response");

      counter.textContent = `visits ${data.value}`;
    } catch {
      counter.classList.add("is-hidden");
    }
  }

  // Dark mode toggle
  const themeToggle = document.querySelector("[data-theme-toggle]");
  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme") || "light";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme !== "light" && savedTheme !== "dark" 
      ? (prefersDark ? "dark" : "light")
      : savedTheme;

    document.documentElement.setAttribute("data-theme", initialTheme);
    themeToggle.setAttribute("data-theme", initialTheme);

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      themeToggle.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
});
