document.addEventListener("DOMContentLoaded", () => {
  const pizzaPreview = document.querySelector(".pizza-preview");
  const toppingButtons = document.querySelectorAll(".topping");
  const downloadBtn = document.querySelector(".download-btn");
  const toppingCount = document.getElementById("topping-count");
  const pizzaPrice = document.getElementById("pizza-price");

  let toppings = 0;
  const BASE_PRICE = 10;
  const TOPPING_PRICE = 2;

  function getRandomPosition() {
    const pizzaBase = document.querySelector(".pizza-base");
    const rect = pizzaBase.getBoundingClientRect();
    const radius = rect.width / 2;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * (radius * 0.8);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  }

  function addTopping(type) {
    const position = getRandomPosition();
    const topping = document.createElement("div");
    topping.className = `topping-element ${type}`;
    topping.style.left = `calc(50% + ${position.x}px)`;
    topping.style.top = `calc(50% + ${position.y}px)`;

    pizzaPreview.appendChild(topping);
    topping.style.animation = "bounce 0.5s ease";

    topping.addEventListener("animationend", () => {
      topping.style.animation = "";
    });

    toppings++;
    toppingCount.textContent = toppings;
    pizzaPrice.textContent = `$${BASE_PRICE + toppings * TOPPING_PRICE}`;
  }

  async function downloadPizza() {
    try {
      const canvas = await html2canvas(pizzaPreview);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-pizza.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Error downloading pizza:", error);
      alert(
        "Sorry, there was an error downloading your pizza. Please try again!"
      );
    }
  }

  toppingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const toppingType = button.dataset.topping;
      button.classList.add("added");
      setTimeout(() => button.classList.remove("added"), 500);
      addTopping(toppingType);
    });
  });

  downloadBtn.addEventListener("click", downloadPizza);
});
