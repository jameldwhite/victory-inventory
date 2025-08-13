let inventory = [];
let filteredInventory = [];

async function loadInventory() {
  const res = await fetch("inventory.json");
  inventory = await res.json();
  filteredInventory = inventory;
  renderInventory();
}

function renderInventory() {
  const container = document.getElementById("inventory");
  container.innerHTML = "";

  filteredInventory.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "vehicle-card";

    const img = vehicle.image && vehicle.image.trim() !== "" 
      ? vehicle.image 
      : "https://via.placeholder.com/400x300?text=No+Photo+Available";

    const badge = vehicle.price < 10000 ? `<span class="badge">Hot Deal</span>` : "";

    card.innerHTML = `
      <div style="position:relative;">
        ${badge}
        <img src="${img}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}">
      </div>
      <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
      <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
      <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
      <p><strong>Stock #:</strong> ${vehicle.stock}</p>
    `;

    container.appendChild(card);
  });

  document.getElementById("count").textContent = `${filteredInventory.length} vehicle(s) found`;
}

document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  filteredInventory = inventory.filter(v => 
    v.make.toLowerCase().includes(term) ||
    v.model.toLowerCase().includes(term) ||
    v.year.toString().includes(term)
  );
  renderInventory();
});

document.getElementById("sort").addEventListener("change", e => {
  const val = e.target.value;
  if (val === "price-asc") filteredInventory.sort((a,b) => a.price - b.price);
  if (val === "price-desc") filteredInventory.sort((a,b) => b.price - a.price);
  if (val === "year-asc") filteredInventory.sort((a,b) => a.year - b.year);
  if (val === "year-desc") filteredInventory.sort((a,b) => b.year - a.year);
  renderInventory();
});

loadInventory();
