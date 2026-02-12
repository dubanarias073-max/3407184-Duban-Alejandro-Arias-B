/* ===================================
   Sistema de Gestión de Cementerios
   =================================== */

// =======================
// Estado y Persistencia
// =======================

const STORAGE_KEY = "cemeteryItems";

const loadItems = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

const saveItems = items =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

let items = loadItems();

// =======================
// Selectores
// =======================

const form = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const emptyState = document.getElementById("empty-state");

const nameInput = document.getElementById("item-name");
const descInput = document.getElementById("item-description");
const categoryInput = document.getElementById("item-category");
const priorityInput = document.getElementById("item-priority");
const idInput = document.getElementById("item-id");

const filterStatus = document.getElementById("filter-status");
const filterCategory = document.getElementById("filter-category");
const filterPriority = document.getElementById("filter-priority");
const searchInput = document.getElementById("search-input");

const statTotal = document.getElementById("stat-total");
const statActive = document.getElementById("stat-active");
const statInactive = document.getElementById("stat-inactive");
const statsDetails = document.getElementById("stats-details");

const clearInactiveBtn = document.getElementById("clear-inactive");

// =======================
// CRUD
// =======================

const createItem = data => {
  const newItem = {
    id: Date.now(),
    name: data.name,
    description: data.description,
    category: data.category,
    priority: data.priority,
    active: true,
    createdAt: new Date().toLocaleDateString(),
    updatedAt: null
  };

  items = [...items, newItem];
  saveItems(items);
};

const updateItem = (id, updates) => {
  items = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toLocaleDateString() }
      : item
  );
  saveItems(items);
};

const deleteItem = id => {
  items = items.filter(item => item.id !== id);
  saveItems(items);
};

const toggleItemActive = id => {
  items = items.map(item =>
    item.id === id ? { ...item, active: !item.active } : item
  );
  saveItems(items);
};

// =======================
// Filtros
// =======================

const applyFilters = items => {
  return items
    .filter(item =>
      filterStatus.value === "all"
        ? true
        : filterStatus.value === "active"
        ? item.active
        : !item.active
    )
    .filter(item =>
      filterCategory.value === "all"
        ? true
        : item.category === filterCategory.value
    )
    .filter(item =>
      filterPriority.value === "all"
        ? true
        : item.priority === filterPriority.value
    )
    .filter(item =>
      item.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchInput.value.toLowerCase())
    );
};

// =======================
// Estadísticas
// =======================

const getStats = items =>
  items.reduce(
    (acc, item) => {
      acc.total++;
      item.active ? acc.active++ : acc.inactive++;
      return acc;
    },
    { total: 0, active: 0, inactive: 0 }
  );

// =======================
// Renderizado
// =======================

const renderItems = () => {
  itemList.innerHTML = "";

  const filtered = applyFilters(items);

  emptyState.classList.toggle("show", filtered.length === 0);

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = `task-item priority-${item.priority} ${
      item.active ? "" : "completed"
    }`;

    div.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${
        item.active ? "" : "checked"
      }>
      <div class="task-content">
        <h3>${item.name}</h3>
        <p>${item.description || "Sin descripción"}</p>
        <div class="task-meta">
          <span class="task-badge badge-category">${item.category}</span>
          <span class="task-badge badge-priority priority-${item.priority}">
            ${item.priority}
          </span>
        </div>
        <div class="task-date">
          Registro: ${item.createdAt}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
      </div>
    `;

    div.querySelector(".task-checkbox").addEventListener("change", () =>
      toggleItemActive(item.id)
    );

    div.querySelector(".btn-delete").addEventListener("click", () => {
      deleteItem(item.id);
      renderItems();
    });

    div.querySelector(".btn-edit").addEventListener("click", () =>
      loadItemToForm(item)
    );

    itemList.appendChild(div);
  });

  renderStats();
};

const renderStats = () => {
  const { total, active, inactive } = getStats(items);

  statTotal.textContent = total;
  statActive.textContent = active;
  statInactive.textContent = inactive;

  statsDetails.innerHTML = `
    <div class="stat-card"><h4>Total</h4><p>${total}</p></div>
    <div class="stat-card"><h4>Ocupados</h4><p>${active}</p></div>
    <div class="stat-card"><h4>Disponibles</h4><p>${inactive}</p></div>
  `;
};

// =======================
// Formulario
// =======================

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    name: nameInput.value,
    description: descInput.value,
    category: categoryInput.value,
    priority: priorityInput.value
  };

  idInput.value
    ? updateItem(Number(idInput.value), data)
    : createItem(data);

  form.reset();
  idInput.value = "";
  renderItems();
});

const loadItemToForm = item => {
  idInput.value = item.id;
  nameInput.value = item.name;
  descInput.value = item.description;
  categoryInput.value = item.category;
  priorityInput.value = item.priority;
};

// =======================
// Eventos
// =======================

[filterStatus, filterCategory, filterPriority].forEach(el =>
  el.addEventListener("change", renderItems)
);

searchInput.addEventListener("input", renderItems);

clearInactiveBtn.addEventListener("click", () => {
  items = items.filter(item => item.active);
  saveItems(items);
  renderItems();
});

// =======================
// Init
// =======================

renderItems();
