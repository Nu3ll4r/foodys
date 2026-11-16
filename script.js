// ==========================================
// FOODYS WEBSITE - COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// 1. WELCOME MESSAGE
// ==========================================

window.addEventListener("load", function () {
    console.log("Welcome to Foodys!");
    console.log("Good Food. Good Mood.");
});


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });

    });

}


// ==========================================
// 3. SHOPPING CART VARIABLES
// ==========================================

let foodysCart = [];

const cartCountDisplay = document.getElementById("cartCount");
const cartItemsDisplay = document.getElementById("cartItems");
const cartTotalDisplay = document.getElementById("cartTotal");


// ==========================================
// 4. ADD FOOD TO CART
// ==========================================

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const foodName = button.dataset.name;
        const foodPrice = Number(button.dataset.price);

        if (!foodName || !Number.isFinite(foodPrice) || foodPrice <= 0) {
            alert("Sorry, this food item cannot be added.");
            return;
        }

        const existingFood = foodysCart.find(function (item) {
            return item.name === foodName;
        });

        if (existingFood) {

            existingFood.quantity++;

        } else {

            foodysCart.push({
                name: foodName,
                price: foodPrice,
                quantity: 1
            });

        }

        updateFoodysCart();

        alert(foodName + " has been added to your cart!");

    });

});


// ==========================================
// 5. DISPLAY AND UPDATE SHOPPING CART
// ==========================================

function updateFoodysCart() {

    if (!cartItemsDisplay || !cartCountDisplay || !cartTotalDisplay) {
        return;
    }

    cartItemsDisplay.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    if (foodysCart.length === 0) {

        cartItemsDisplay.textContent = "Your cart is currently empty.";

    }

    foodysCart.forEach(function (item, index) {

        const subtotal = item.price * item.quantity;

        totalPrice += subtotal;
        totalQuantity += item.quantity;

        const foodCard = document.createElement("div");

        foodCard.classList.add("cart-item");

        const foodTitle = document.createElement("h3");
        foodTitle.textContent = item.name;

        const foodPrice = document.createElement("p");
        foodPrice.textContent = "Price: ₦" + item.price.toLocaleString();

        const foodQuantity = document.createElement("p");
        foodQuantity.textContent = "Quantity: " + item.quantity;

        const foodSubtotal = document.createElement("p");
        foodSubtotal.textContent = "Subtotal: ₦" + subtotal.toLocaleString();

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.classList.add("decrease-item");
        decreaseButton.dataset.index = index;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.classList.add("increase-item");
        increaseButton.dataset.index = index;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-item");
        removeButton.dataset.index = index;

        foodCard.appendChild(foodTitle);
        foodCard.appendChild(foodPrice);
        foodCard.appendChild(foodQuantity);
        foodCard.appendChild(foodSubtotal);
        foodCard.appendChild(decreaseButton);
        foodCard.appendChild(increaseButton);
        foodCard.appendChild(removeButton);

        cartItemsDisplay.appendChild(foodCard);

    });

    cartCountDisplay.textContent = totalQuantity;

    cartTotalDisplay.textContent = totalPrice.toLocaleString();

}


// ==========================================
// 6. INCREASE, DECREASE AND REMOVE FOOD
// ==========================================

if (cartItemsDisplay) {

    cartItemsDisplay.addEventListener("click", function (event) {

        const button = event.target;

        const index = Number(button.dataset.index);

        if (!Number.isInteger(index) || !foodysCart[index]) {
            return;
        }

        if (button.classList.contains("increase-item")) {

            foodysCart[index].quantity++;

        }

        else if (button.classList.contains("decrease-item")) {

            foodysCart[index].quantity--;

            if (foodysCart[index].quantity <= 0) {

                foodysCart.splice(index, 1);

            }

        }

        else if (button.classList.contains("remove-item")) {

            foodysCart.splice(index, 1);

        }

        else {

            return;

        }

        updateFoodysCart();

    });

}


// ==========================================
// 7. CLEAR SHOPPING CART
// ==========================================

const clearCartButton = document.getElementById("clearCart");

if (clearCartButton) {

    clearCartButton.addEventListener("click", function () {

        foodysCart = [];

        updateFoodysCart();

        alert("Your shopping cart has been cleared!");

    });

}


// ==========================================
// 8. CHECKOUT
// ==========================================

const checkoutButton = document.getElementById("checkout");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        if (foodysCart.length === 0) {

            alert("Your cart is empty! Add something delicious first.");

            return;

        }

        let orderSummary = "WELCOME TO FOODYS!\n\nYOUR ORDER:\n\n";

        foodysCart.forEach(function (item) {

            const subtotal = item.price * item.quantity;

            orderSummary += item.name + " x " + item.quantity;

            orderSummary += " = ₦" + subtotal.toLocaleString();

            orderSummary += "\n";

        });

        const finalTotal = foodysCart.reduce(function (sum, item) {

            return sum + (item.price * item.quantity);

        }, 0);

        orderSummary += "\nTOTAL: ₦" + finalTotal.toLocaleString();

        orderSummary += "\n\nThank you for choosing Foodys!";

        alert(orderSummary);

    });

}


// ==========================================
// 9. INITIALIZE SHOPPING CART
// ==========================================

updateFoodysCart();


// ==========================================
// END OF FOODYS JAVASCRIPT
// ==========================================

// FOODYS CONTACT FORM

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;

        alert(`Thank you, ${name}! Your message has been received. We appreciate you contacting Foodys!`);

        contactForm.reset();
    });
}