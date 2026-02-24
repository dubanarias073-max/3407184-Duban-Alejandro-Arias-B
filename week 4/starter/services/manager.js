import CemeteryPlot from "../models/CemeteryPlot.js";
import { saveData, getData } from "./storage.js";

let plots = getData() || [];

export function addPlot(data) {
  const newPlot = new CemeteryPlot(
    Date.now(),
    data.name,
    data.type,
    data.date,
    data.price,
    data.years
  );

  plots.push(newPlot);
  saveData(plots);
}

export function getAllPlots() {
  return plots;
}