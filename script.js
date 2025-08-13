fetch('inventory.json')
  .then(response => response.json())
  .then(data => {
    const inventoryContainer = document.getElementById('inventory');

    // Define price categories
    const categories = {
      "Under $10,000": v => v.price < 10000,
      "$10,000 - $20,000": v => v.price >= 10000 && v.price < 20000,
      "$20,000 - $30,000": v => v.price >= 20000 && v.price < 30000,
      "$30,000 and above": v => v.price >= 30000
    };

    // Loop through each category and display matching vehicles
    for (let category in categories) {
      const categoryVehicles = data.filter(categories[category]);

      if (categoryVehicles.length > 0) {
        const categorySection = document.createElement('section');
        categorySection.innerHTML = `<h2>${category}</h2>`;

        categoryVehicles.forEach(vehicle => {
          const card = document.createElement('div');
          card.className = 'vehicle-card';
          card.innerHTML = `
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
  })
  .catch(error => console.error('Error loading inventory:', error));
