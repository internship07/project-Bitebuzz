const mobile = document.querySelector('.menu-toggle');
const mobileLink = document.querySelector('.sidebar');
mobile.addEventListener("click", function(){
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
});

mobileLink.addEventListener("click", function()
{
    const menuBars = document.querySelector("is-active");
    if(window.innerWidth<=768 && menuBars) {
        mobile.classList.toggle("is-active");
        mobileLink.classList.toggle("active");
    }
});

var step = 100;
var stepFilter = 60;
var scrolling = true;


$(document).on("click", ".back", function (e) {
  e.preventDefault();
  $(".highlight-wrapper").animate({
    scrollLeft: "-=100px", // Adjust the scroll step as needed
  });
});

$(document).on("click", ".next", function (e) {
  e.preventDefault();
  $(".highlight-wrapper").animate({
    scrollLeft: "+=100px", // Adjust the scroll step as needed
  });
});

$(document).on("click", ".back-menus", function (e) {
  e.preventDefault();
  $(".filter-wrapper").animate({
    scrollLeft: "-=100px", // Adjust the scroll step as needed
  });
});

$(document).on("click", ".next-menus", function (e) {
  e.preventDefault();
  $(".filter-wrapper").animate({
    scrollLeft: "+=100px", // Adjust the scroll step as needed
  });
});

let step = 100; // Default step size
let stepFilter = 100; // Default step size for filter

function updateStepSizes() {
  if (window.innerWidth <= 480) {
    step = 50; // Smaller step for smaller screens
    stepFilter = 30;
  } else {
    step = 100; // Default step for larger screens
    stepFilter = 100;
  }
}

// Call the function on page load and window resize
updateStepSizes();
window.addEventListener("resize", updateStepSizes);


document.addEventListener('DOMContentLoaded', () => {
  const restaurantCards = document.querySelectorAll('.restaurant-card');

  restaurantCards.forEach(card => {
    card.addEventListener('click', () => {
      const restaurantName = card.getAttribute('data-restaurant');
      console.log('Redirecting to orders page for: ${restaurantName}');

      // Redirect to orders.html
      window.location.href = 'orders.html?restaurant=${encodeURIComponent(restaurantName)}';
    });
  });
});


  // Get references to the menu items container
const restaurantCards = document.querySelectorAll('.restaurant-card');
const chooseOrderSection = document.getElementById('choose-order-section').style.display = 'block';
const menuItemsContainer = document.getElementById('menu-items');
  
document.addEventListener('DOMContentLoaded', () => {
  const restaurantWrapper = document.querySelector('.restaurant-wrapper');
  restaurantWrapper.addEventListener('click', (event) => {
    const card = event.target.closest('.restaurant-card');
    if (card) {
      const restaurantName = card.getAttribute('data-restaurant');
      console.log('Selected Restaurant: ${restaurantName}');
      document.getElementById('choose-order-section').style.display = 'block';
    }
  });
});

  // Add click event listeners to each restaurant card
  restaurantCards.forEach(card => {
    card.addEventListener('click', () => {
      const restaurantName = card.getAttribute('data-restaurant');
      console.log('Selected Restaurant: ${restaurantName}');
  
  //     // Show the "Choose Order" section
      chooseOrderSection.style.display = 'block';

  //     // Load the menu items for the selected restaurant
      loadMenuItems(restaurantName);
  
      });
    });
  
  // Function to load menu items for a selected restaurant
  function loadMenuItems(restaurantName) {
    // Clear existing menu items
    menuItemsContainer.innerHTML = '';
  
    // Get the menu for the selected restaurant
    const menu = restaurantMenus[restaurantName];
  
    // Dynamically create menu item cards
    menu.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('detail-card');
      menuItem.innerHTML = `
        <img class="detail-img" src="${item.image}" alt="${item.name}">
        <div class="detail-desc">
          <div class="detail-name">
            <h4>${item.name}</h4>
            <p class="detail-sub">${item.description}</p>
            <p class="price">Rs.${item.price}</p>
          </div>
          <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        </div>
      `;
      menuItemsContainer.appendChild(menuItem);
    });
  }
  

//FOR SHOPPING CART PART
//for cart popup
function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.toggle("active");
}

//for close cart popup
function closeCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.remove("active");
}

//for add to cart button
function addToCart(itemName, itemPrice) {
    const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const existingItem = Array.from(cartItems.getElementsByTagName('tr')).find(item=> item.cells[0].textContent === itemName);
    if (existingItem) {
        const itemCount = parseInt(existingItem.querySelector('.item-count').textContent) + 1;
        existingItem.querySelector('.item-count').textContent = itemCount;
        const itemTotal = parseFloat(existingItem.querySelector('.item-total').textContent) + parseFloat(itemPrice);
        existingItem.querySelector('.item-total').textContent = itemTotal.toFixed(2);
    } else {
        const newRow = cartItems.insertRow();
        newRow.innerHTML = `
        <td>${itemName}</td>
        <td class='item-count'>1</td>
        <td class='item-price'>${itemPrice}</td>
        <td class='item-total'>${itemPrice}</td>
        `;
    }
    updateCartCountAndTotal();
}

//update cart count and total
function updateCartCountAndTotal() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.querySelectorAll('#cart-items tbody tr');
    let totalCount = 0;
    let total = 0;
    cartItems.forEach(item => {
        const itemCount = parseInt(item.querySelector('.item-count').textContent);
        const itemTotal = parseFloat(item.querySelector('.item-total').textContent);
        totalCount += itemCount;
        total += itemTotal;
    });
    cartCount.textContent = totalCount;
    cartTotal.textContent = total.toFixed(2);
}