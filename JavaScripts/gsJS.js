

// gsJS.js

document.addEventListener('DOMContentLoaded', function () {
    // Select all Save for Later buttons
    const saveButtons = document.querySelectorAll('.save-for-later');

    // Add click event listener to each button
    saveButtons.forEach(button => {
        button.addEventListener('click', saveItemForLater);
    });

    // Function to handle saving an item for later
    function saveItemForLater(event) {
        const title = event.target.getAttribute('data-title');
        const image = event.target.getAttribute('data-image');
        const description = event.target.getAttribute('data-description');

        // Get existing saved items from local storage or initialize an empty array
        const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

        // Check if the item is already saved
        const existingItemIndex = savedItems.findIndex(item => item.title === title);

        if (existingItemIndex === -1) {
            // Item not saved, add it to the array
            savedItems.push({ title, image, description });
            // Update local storage
            localStorage.setItem('savedItems', JSON.stringify(savedItems));

            // Show alert with the count of saved items
            alert(`Item saved for later! You have ${savedItems.length} items in your Save for Later folder.`);
        } else {
            // Item already saved, show a message or handle accordingly
            alert('Item already saved for later!');
        }
    }
});

// displaySavedItems.js

document.addEventListener('DOMContentLoaded', function () {
    // Get saved items from local storage
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedItemsContainer = document.getElementById('saved-items-container');

    // Check if there are saved items
    if (savedItems.length > 0) {
        // Loop through saved items and create HTML elements for display
        savedItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('card');
            itemCard.innerHTML = `
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
            `;
            savedItemsContainer.appendChild(itemCard);
        });
    } else {
        // No saved items, display a message
        savedItemsContainer.innerHTML = '<p>No items saved for later.</p>';
    }
});