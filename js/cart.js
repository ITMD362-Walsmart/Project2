document.addEventListener("DOMContentLoaded", () => {
  const summary = document.querySelector(".cart-summary");
  const checkButton = document.querySelector(".checkout-button");

  function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-item"); // Re-query live items
    let total = 0;

    cartItems.forEach(item => {
      const priceText = item.querySelector(".item-price").textContent.replace("$", "");
      const quantity = parseInt(item.querySelector("input[type='number']").value) || 0;
      const price = parseFloat(priceText) || 0;
      total += price * quantity;
    });

    const tax = total * 0.1075;
    const shipping = total > 0 ? 4.99 : 0;
    const grandTotal = total + tax + shipping;

    summary.innerHTML = `
      <p>In Cart: <strong>$${total.toFixed(2)}</strong></p>
      <p>Tax (10.75%): <strong>$${tax.toFixed(2)}</strong></p>
      <p>Shipping: <strong>$${shipping.toFixed(2)}</strong></p>
      <p><strong>Total: $${grandTotal.toFixed(2)}</strong></p>
    `;
  }

  function addListenersToItems() {
    const cartItems = document.querySelectorAll(".cart-item");

    cartItems.forEach(item => {
      const quantityInput = item.querySelector("input[type='number']");
      const removeButton = item.querySelector(".remove-button");

      quantityInput.addEventListener("input", updateTotal);
      removeButton.addEventListener("click", () => {
        item.remove();
        updateTotal();
      });
    });
  }

  checkButton.addEventListener("click", () => {
    alert("Thank you for your order!");
  });

  addListenersToItems();
  updateTotal();
});
