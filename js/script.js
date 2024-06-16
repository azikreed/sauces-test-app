document.addEventListener("DOMContentLoaded", () => {
  fetch("sauces.json")
    .then((res) => res.json())
    .then((data) => initializeSauces(data));

  const dishPrice = 220;

  function initializeSauces(sauces) {
    const saucesBox = document.getElementById("sauces");
    const quantities = {};
    const prices = {};

    sauces.forEach((sauce) => {
      const sauceElement = document.createElement("div");
      sauceElement.className = "sauce";
      sauceElement.innerHTML = `
        <span>${sauce.name} <span class="sauce-price" id="sauce-price-${sauce.id}">+0 &#8381;</span></span>
        <div>
            <button class="minus" data-id="${sauce.id}" data-price="${sauce.price}"><img src="/img/minus.svg" /></button>
            <span class="quantity" id="quantity-${sauce.id}">0</span>
            <button class="plus" data-id="${sauce.id}" data-price="${sauce.price}"><img src="/img/plus.svg" /></button>
        </div>
        `;

      saucesBox.appendChild(sauceElement);
      quantities[sauce.id] = 0;
      prices[sauce.id] = sauce.price;
    });

    const updateDisplay = () => {
      let totalQuantity = 0;

      let totalPrice = 0;
      let totalPaidSauces = false;

      for (let id in quantities) {
        document.getElementById(`quantity-${id}`).textContent = quantities[id];
        totalQuantity += quantities[id];
        totalPaidSauces += quantities[id];
      }

      sauces.forEach((sauce) => {
        const saucePriceElement = document.getElementById(`sauce-price-${sauce.id}`);

        if (totalQuantity > 0) {
          saucePriceElement.textContent = `+60 ₽`;
        } else {
          saucePriceElement.textContent = `+0 ₽`;
        }

        document.getElementById(`quantity-${sauce.id}`).textContent = quantities[sauce.id];
      });

      if (totalQuantity > 0) {
        totalPaidSauces -= 1;
        totalPrice += totalPaidSauces * 60;
      }

      const totalWithDish = totalPrice + dishPrice;

      document.getElementById(
        "total-quantity"
      ).textContent = `${totalQuantity} / ${totalQuantity}`;
      document.getElementById("total-price").textContent = totalPrice;
      document.getElementById("total-price-bottom").textContent = totalWithDish;
    };

    const getTotalQuantity = () => {
      return Object.values(quantities).reduce(
        (sum, quantity) => sum + quantity,
        0
      );
    };

    document.querySelectorAll(".plus").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (getTotalQuantity() < 10) {
          quantities[id]++;
          updateDisplay();
        } else {
          alert(
            "Максимальное количество соусов для покупки не должно превышать 10 штук."
          );
        }
      });
    });

    document.querySelectorAll(".minus").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        if (quantities[id] > 0) {
          quantities[id]--;
          updateDisplay();
        }
      });
    });

    document.getElementById("add-to-cart").addEventListener("click", () => {
      alert(
        `Добавлено в корзину. Общая cумма: ${
          document.getElementById("total-price-bottom").textContent
        } рублей`
      );
      updateDisplay();
    });
  }
});
