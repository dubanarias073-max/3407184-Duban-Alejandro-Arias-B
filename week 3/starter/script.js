// ======================================================
// CLASE ABSTRACTA
// ======================================================

class BurialSpace {
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  constructor(name, location) {
    if (new.target === BurialSpace) {
      throw new Error("BurialSpace es abstracta");
    }

    this.#id = Date.now().toString() + Math.random().toString(16);
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
  get location() { return this.#location; }
  get dateCreated() { return this.#dateCreated; }

  activate() { this.#active = true; }
  deactivate() { this.#active = false; }

  getType() { return this.constructor.name; }

  getInfo() { throw new Error("Implementar en clase hija"); }
}


// ======================================================
// CLASES DERIVADAS
// ======================================================

class Grave extends BurialSpace {
  #capacity;
  #material;

  constructor(name, location, capacity, material) {
    super(name, location);
    this.#capacity = capacity;
    this.#material = material;
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      capacity: this.#capacity,
      material: this.#material,
      active: this.isActive,
      type: this.getType()
    };
  }
}

class Mausoleum extends BurialSpace {
  #familyName;
  #levels;

  constructor(name, location, familyName, levels) {
    super(name, location);
    this.#familyName = familyName;
    this.#levels = levels;
  }
}

class Columbarium extends BurialSpace {
  #niches;
  #indoor;

  constructor(name, location, niches, indoor) {
    super(name, location);
    this.#niches = niches;
    this.#indoor = indoor;
  }
}


// ======================================================
// PERSONAS
// ======================================================

class Person {
  #id;
  #name;
  #email;

  constructor(name, email) {
    this.#id = Date.now().toString() + Math.random().toString(16);
    this.#name = name;
    this.#email = email;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
}

class Administrator extends Person {}
class Visitor extends Person {}

// ======================================================
// SISTEMA
// ======================================================

class CemeterySystem {
  #items = [];
  #users = [];

  static {
    this.VERSION = "1.0.0";
    console.log("Sistema cargado v" + this.VERSION);
  }

  addItem(item) {
    this.#items.push(item);
  }

  removeItem(id) {
    this.#items = this.#items.filter(i => i.id !== id);
  }

  findItem(id) {
    return this.#items.find(i => i.id === id);
  }

  getAllItems() {
    return [...this.#items];
  }

  addUser(user) {
    this.#users.push(user);
  }

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(i => i.isActive).length;
    return {
      total,
      active,
      inactive: total - active,
      users: this.#users.length
    };
  }
}

const system = new CemeterySystem();

// ======================================================
// DOM READY
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  // ===== TABS =====
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // ===== MODAL =====
  const addItemBtn = document.getElementById("add-item-btn");
  const itemModal = document.getElementById("item-modal");
  const closeModal = document.getElementById("close-modal");
  const cancelBtn = document.getElementById("cancel-btn");

  addItemBtn.addEventListener("click", () => {
    itemModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    itemModal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    itemModal.style.display = "none";
  });

  // ===== RENDER =====
  const itemList = document.getElementById("item-list");
  const statTotal = document.getElementById("stat-total");
  const statActive = document.getElementById("stat-active");
  const statInactive = document.getElementById("stat-inactive");
  const statUsers = document.getElementById("stat-users");

  const renderItems = () => {
    const items = system.getAllItems();

    itemList.innerHTML = items.map(item => `
      <div class="item ${item.isActive ? "" : "inactive"}">
        <h3>${item.name}</h3>
        <p><strong>Tipo:</strong> ${item.getType()}</p>
        <p><strong>Ubicación:</strong> ${item.location}</p>
        <p><strong>Estado:</strong> ${item.isActive ? "Disponible" : "No Disponible"}</p>
        <button data-toggle="${item.id}">
          ${item.isActive ? "Desactivar" : "Activar"}
        </button>
        <button data-delete="${item.id}">
          Eliminar
        </button>
      </div>
    `).join("");

    // Eventos dinámicos
    document.querySelectorAll("[data-toggle]").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = system.findItem(btn.dataset.toggle);
        item.isActive ? item.deactivate() : item.activate();
        renderItems();
        renderStats();
      });
    });

    document.querySelectorAll("[data-delete]").forEach(btn => {
      btn.addEventListener("click", () => {
        system.removeItem(btn.dataset.delete);
        renderItems();
        renderStats();
      });
    });
  };

  const renderStats = () => {
    const stats = system.getStats();
    statTotal.textContent = stats.total;
    statActive.textContent = stats.active;
    statInactive.textContent = stats.inactive;
    statUsers.textContent = stats.users;
  };

  // ===== FORM =====
  const itemForm = document.getElementById("item-form");

  itemForm.addEventListener("submit", e => {
    e.preventDefault();

    const type = document.getElementById("item-type").value;
    const name = document.getElementById("item-name").value;
    const location = document.getElementById("item-location").value;

    let item;

    if (type === "Grave")
      item = new Grave(name, location, 1, "Granite");

    if (type === "Mausoleum")
      item = new Mausoleum(name, location, "Familia X", 2);

    if (type === "Columbarium")
      item = new Columbarium(name, location, 20, true);

    if (item) {
      system.addItem(item);
      renderItems();
      renderStats();
      itemForm.reset();
      itemModal.style.display = "none";
    }
  });

  renderItems();
  renderStats();

});
