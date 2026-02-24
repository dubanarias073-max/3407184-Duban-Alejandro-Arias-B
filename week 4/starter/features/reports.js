import { getAllPlots } from "../services/manager.js";

export function generateReport() {
  const plots = getAllPlots();

  if (plots.length === 0) {
    alert("No hay sepulturas registradas.");
    return;
  }

  // Total de registros
  const total = plots.length;

  // Total de dinero recaudado
  const totalRevenue = plots.reduce((acc, plot) => {
    return acc + Number(plot.price);
  }, 0);

  // Agrupar por tipo
  const byType = {};

  plots.forEach(plot => {
    if (!byType[plot.type]) {
      byType[plot.type] = 0;
    }
    byType[plot.type]++;
  });

  // Construir mensaje
  let reportMessage = `
📊 REPORTE DEL CEMENTERIO

Total de sepulturas registradas: ${total}
Total recaudado: $${totalRevenue.toLocaleString("es-CO")}

Cantidad por tipo:
`;

  for (let type in byType) {
    reportMessage += `- ${type}: ${byType[type]}\n`;
  }

  alert(reportMessage);
}