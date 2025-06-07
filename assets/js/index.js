document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-btn");
  const mobileNav = document.querySelector(".mobile_nav");

  const cartButton = document.getElementById("cart-btn");
  const cartNav = document.querySelector(".mobile_cart");

  // Toggle Cart Menu
  cartButton.addEventListener("click", (event) => {
    cartNav.classList.toggle("show");
    cartNav.classList.toggle("hide");
  });

  // Close Cart When Clicking Outside
  document.addEventListener("click", (event) => {
    if (!cartNav.contains(event.target) && event.target !== cartButton) {
      cartNav.classList.add("hide");
    }
  });

  menuButton.addEventListener("click", (event) => {
    mobileNav.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    // Check if the click was outside the mobileNav
    if (!mobileNav.contains(event.target) && event.target !== menuButton) {
      mobileNav.classList.add("hide");
    }
  });
});
