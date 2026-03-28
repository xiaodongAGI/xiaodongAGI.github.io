document.addEventListener("DOMContentLoaded", async () => {
  const counter = document.querySelector("[data-visitor-counter]");
  if (!counter) return;

  try {
    const response = await fetch("https://api.countapi.xyz/hit/xiaodongliu-homepage/site");
    if (!response.ok) throw new Error("counter request failed");

    const data = await response.json();
    if (typeof data.value !== "number") throw new Error("invalid counter response");

    counter.textContent = `visits ${data.value}`;
  } catch {
    counter.classList.add("is-hidden");
  }
});
