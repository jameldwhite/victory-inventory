fetch('inventory.json')
  .then(response => response.json())
  .then(data => {
    const inventoryContainer = document.getElementById('inventory');
    const filtersContainer = document.getElementById('filters');

    // Define price categories
    const categories = {
      "Under $10,000": v => v.price < 10000,
      "$10,000 - $20,000": v => v.price >= 10000 && v.price < 20000,
      "$20,000 - $30,000": v => v.price >= 20000 && v.price < 30000,
      "$30,000 and above": v => v.price >= 30000
    };

    // Function to render inventory by selected category
    function renderInventory(selectedCategory = "all") {
      inventoryContainer.innerHTML = ""; // clear

      for (let category in categories) {
        if (selectedCategory !== "all" && category !== selectedCategory) continue;

        const categoryVehicles = data.filter(categories[category]);
        if (categoryVehicles.length > 0) {
          const categorySection = document.createElement('section');
          categorySection.innerHTML = `<h2>${category}</h2>`;

          categoryVehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'vehicle-card';

            let imageHTML = '';
            if (vehicle.image && vehicle.image.trim() !== '') {
              imageHTML = `<img src="${vehicle.image}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}">`;
            }

            card.innerHTML = `
              ${imageHTML}
              <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
              <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
              <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
              <p><strong>Stock #:</strong> ${vehicle.stock}</p>
            `;
            categorySection.appendChild(card);
          });

          inventoryContainer.appendChild(categorySection);
        }
      }
    }

    // Initial load
    renderInventory();

    // Filter button clicks
    filtersContainer.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const category = e.target.getAttribute('data-category');
        renderInventory(category);
      }
    });
  })
  .catch(error => console.error('Error loading inventory:', error));
