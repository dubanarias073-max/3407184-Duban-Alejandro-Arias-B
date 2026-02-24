import { categories } from "../models/index.js";
import { getAllPlots } from "../services/manager.js";

export function renderCategories() {
  const select = document.getElementById("type");
  if (!select) return;
  select.innerHTML = "";

  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.name;
    opt.textContent = cat.name;
    select.appendChild(opt);
  });
}

export function renderPlots() {
  const list = document.getElementById("plots-list");
  if (!list) return;

  const plots = getAllPlots();

  if (!plots || plots.length === 0) {
    list.innerHTML = "<p>No hay sepulturas aún.</p>";
    return;
  }

  list.innerHTML = plots
    .map(p => {
      return `
        <div class="plot-card">
          <strong>${p.name}</strong> — ${p.type} — $${Number(p.price).toLocaleString("es-CO")}
        </div>`;
    })
    .join("");
}