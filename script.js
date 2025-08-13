fetch('inventory.json')
  .then(response => response.json())
  .then(data => {
    const inventoryContainer = document.getElementById('inventory');
    data.forEach(vehicle => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
      card.innerHTML = `
        <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
        <p>Price: $${vehicle.price.toLocaleString()}</p>
        <p>Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
        <p>Stock #: ${vehicle.stock}</p>
      `;
      inventoryContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading inventory:', error));
