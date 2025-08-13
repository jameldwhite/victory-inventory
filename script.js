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

    function renderInventory() {
  // Fade out current items
  const existingCards = inventoryContainer.querySelectorAll('.vehicle-card');
  existingCards.forEach(card => card.classList.add('hide'));

  setTimeout(() => {
    inventoryContainer.innerHTML = "";

    for (let category in categories) {
      if (activeCategory !== "all" && category !== activeCategory) continue;

      let categoryVehicles = data.filter(categories[category]);

      // Apply search filter
      if (searchTerm.trim() !== "") {
        categoryVehicles = categoryVehicles.filter(vehicle => {
          const text = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.stock}`.toLowerCase();
          return text.includes(searchTerm.toLowerCase());
        });
      }

      // Sort by price (low to high)
      categoryVehicles.sort((a, b) => a.price - b.price);

      if (categoryVehicles.length > 0) {
        const categorySection = document.createElement('section');
        categorySection.innerHTML = `<h2>${category}</h2>`;

        categoryVehicles.forEach(vehicle => {
          const card = document.createElement('div');
          card.className = 'vehicle-card hide'; // Start hidden

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

    // Fade in new items
    requestAnimationFrame(() => {
      const newCards = inventoryContainer.querySelectorAll('.vehicle-card');
      newCards.forEach(card => card.classList.remove('hide'));
    });
  }, 300);
}


    // Initial load
    function renderInventory() {
  inventoryContainer.innerHTML = "";

  for (let category in categories) {
    if (activeCategory !== "all" && category !== activeCategory) continue;

    let categoryVehicles = data.filter(categories[category]);

    // Apply search filter
    if (searchTerm.trim() !== "") {
      categoryVehicles = categoryVehicles.filter(vehicle => {
        const text = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.stock}`.toLowerCase();
        return text.includes(searchTerm.toLowerCase());
      });
    }

    // Sort by price (low to high)
    categoryVehicles.sort((a, b) => a.price - b.price);

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
    // Filter button clicks
    filtersContainer.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const category = e.target.getAttribute('data-category');
        renderInventory(category);
      }
    });
  })
  .catch(error => console.error('Error loading inventory:', error));
