import { getAllPlots } from "../services/manager.js";

export function exportData() {
  const plots = getAllPlots();

  if (!plots || plots.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  const data = JSON.stringify(plots, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "cementerio.json";
  a.click();

  URL.revokeObjectURL(url);
}