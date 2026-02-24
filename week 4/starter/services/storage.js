const KEY = "cemetery_plots";

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}