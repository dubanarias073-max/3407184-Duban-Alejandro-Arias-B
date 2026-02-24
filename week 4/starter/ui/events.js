import { addPlot } from "../services/manager.js";
import { renderPlots } from "./render.js";

export function initEvents() {
  const form = document.getElementById("plot-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      type: document.getElementById("type").value,
      date: document.getElementById("date").value,
      price: document.getElementById("price").value,
      years: document.getElementById("years").value
    };

    addPlot(data);
    renderPlots();
    form.reset();
  });
}