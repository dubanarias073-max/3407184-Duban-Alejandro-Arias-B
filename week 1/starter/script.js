avatarImg.src = "image/cementerio.png";

const cemeteryData = {
  name: "Sistema de Gestión de Cementerios",
  description:
    "Sistema de software que permite administrar registros de fallecidos, control de espacios, servicios funerarios y estadísticas del cementerio.",
  identifier: "SGC-001",

  contact: {
    email: "cementerio@gestion.com",
    phone: "3337489734",
    location: "Colombia"
  },

  items: [
    { name: "Registro de fallecidos", level: 90 },
    { name: "Control de bóvedas", level: 85 },
    { name: "Gestión administrativa", level: 80 },
    { name: "Búsqueda de registros", level: 88 },
    { name: "Reportes del sistema", level: 75 }
  ],

  links: [
    { platform: "Sistema Web", url: "#", icon: "🖥️" },
    { platform: "Soporte Técnico", url: "#", icon: "📞" }
  ],

  stats: {
    totalRecords: 1200,
    availableSpaces: 350,
    activeServices: 5,
    efficiency: "95%"
  }
};

// ============================================
// 2. Referencias al DOM
// ============================================

const userName = document.getElementById("userName");
const userTitle = document.getElementById("userTitle");
const userLocation = document.getElementById("userLocation");
const userBio = document.getElementById("userBio");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");

const skillsList = document.getElementById("skillsList");
const socialLinks = document.getElementById("socialLinks");
const statsContainer = document.getElementById("stats");

const themeToggle = document.getElementById("themeToggle");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const toggleSkillsBtn = document.getElementById("toggleSkills");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

// ============================================
// 3. Renderizar información principal
// ============================================

const renderBasicInfo = () => {
  const {
    name,
    description,
    contact: { email, phone, location }
  } = cemeteryData;

  userName.textContent = name;
  userTitle.textContent = "Sistema Informático";
  userLocation.textContent = `📍 ${location}`;
  userBio.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// ============================================
// 4. Renderizar módulos del sistema
// ============================================

let showingAllItems = false;

const renderItems = (showAll = false) => {
  const { items } = cemeteryData;
  const itemsToShow = showAll ? items : items.slice(0, 4);

  skillsList.innerHTML = itemsToShow
    .map(
      item => `
      <div class="skill-item">
        <div class="skill-name">${item.name}</div>
        <div class="skill-level">
          <div class="skill-bar">
            <div class="skill-bar-fill" style="width:${item.level}%"></div>
          </div>
          <span>${item.level}%</span>
        </div>
      </div>
    `
    )
    .join("");
};

// ============================================
// 5. Renderizar enlaces
// ============================================

const renderLinks = () => {
  const { links } = cemeteryData;

  socialLinks.innerHTML = links
    .map(
      link => `
      <a href="${link.url}" class="social-link" target="_blank">
        ${link.icon} ${link.platform}
      </a>
    `
    )
    .join("");
};

// ============================================
// 6. Renderizar estadísticas
// ============================================

const renderStats = () => {
  const { stats } = cemeteryData;

  const statsArray = [
    { label: "Registros Totales", value: stats.totalRecords },
    { label: "Espacios Disponibles", value: stats.availableSpaces },
    { label: "Servicios Activos", value: stats.activeServices },
    { label: "Eficiencia del Sistema", value: stats.efficiency }
  ];

  statsContainer.innerHTML = statsArray
    .map(
      stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `
    )
    .join("");
};

// ============================================
// 7. Cambio de tema claro / oscuro
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = newTheme;
  themeToggle.querySelector(".theme-icon").textContent =
    newTheme === "dark" ? "☀️" : "🌙";

  localStorage.setItem("theme", newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem("theme") ?? "light";
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.querySelector(".theme-icon").textContent =
    savedTheme === "dark" ? "☀️" : "🌙";
};

// ============================================
// 8. Copiar información
// ============================================

const copyInfo = () => {
  const { name, description, contact } = cemeteryData;

  const infoText = `
${name}
${description}
Correo: ${contact.email}
Teléfono: ${contact.phone}
  `.trim();

  navigator.clipboard.writeText(infoText);
  showToast("Información copiada correctamente");
};

// ============================================
// Notificación tipo toast
// ============================================

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// ============================================
// 9. Mostrar / ocultar módulos
// ============================================

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleSkillsBtn.textContent = showingAllItems
    ? "Mostrar menos"
    : "Mostrar más";
};

// ============================================
// 10. Eventos
// ============================================

themeToggle.addEventListener("click", toggleTheme);
copyEmailBtn.addEventListener("click", copyInfo);
toggleSkillsBtn.addEventListener("click", handleToggleItems);

// ============================================
// 11. Inicialización
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log("✅ Sistema de Gestión de Cementerios cargado correctamente");
};

init();
