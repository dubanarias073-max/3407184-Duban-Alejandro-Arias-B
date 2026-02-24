import { renderCategories, renderPlots } from "./render.js";
import { initEvents } from "./events.js";

export function initUI() {
  renderCategories();
  renderPlots();
  initEvents();
}