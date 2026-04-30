const navIcons = {
  dashboard: "fa-shield-heart",
  overview: "fa-chart-line",
  actions: "fa-list-check",
  personnel: "fa-user-tie",
  recruitment: "fa-briefcase",
  attendance: "fa-clock",
  leaves: "fa-plane-departure",
  payroll: "fa-money-check-dollar",
  manager: "fa-chart-pie",
  settings: "fa-gear",
};

const renderNavItems = () =>
  getNavigationRoutes()
    .filter((route) => canAccessRoute(route))
    .map(
      (route, index) => `
        <a href="#${route.path}" data-page="${route.key}" class="nav-item ${index === 0 ? "active" : ""}" onclick="navigateTo('${route.key}', event)">
          <i class="fa-solid ${navIcons[route.key]}"></i> <span>${route.title}</span>
        </a>
      `
    )
    .join("");

const Layout = (content) => {
  const user = getCurrentUser() || demoUsers["hr-admin"];
  const actionCount = getOpenActionCount();

  return `
    <div class="app-container">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark"><i class="fa-solid fa-users-gear"></i></div>
          <div>
            <strong>İK Pro</strong>
            <span>HR MASTER Suite</span>
          </div>
        </div>
        <ul class="nav-links">
          ${renderNavItems()}
        </ul>
        <div class="sidebar-insight">
          <span>Bugünkü öncelik</span>
          <strong>${actionCount} açık aksiyon</strong>
          <small>Risk, bordro ve uyum takibi</small>
        </div>
      </aside>

      <header class="header">
        <div class="header-tools">
          <button class="btn-icon shell-toggle" onclick="toggleSidebar()" title="Menüyü daralt/genişlet">
            <i class="fa-solid fa-bars-staggered"></i>
          </button>
          <button class="btn-icon theme-toggle" onclick="toggleTheme()" title="Tema değiştir">
            <i id="theme-icon" class="fa-solid fa-moon"></i>
          </button>
        </div>
        <div class="header-heading">
          <span id="page-eyebrow">İK Pro</span>
          <div class="header-title" id="page-title">Risk Merkezi</div>
        </div>
        <button class="header-action-button" onclick="navigateTo('actions', event)" title="Aksiyon Merkezi">
          <i class="fa-solid fa-list-check"></i>
          <span>${actionCount}</span>
        </button>
        <div class="header-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Personel, aday veya işlem ara" />
        </div>
        <div class="user-profile">
          <div class="user-avatar">${user.initials}</div>
          <div>
            <strong>${user.name}</strong>
            <span>${user.roleLabel}</span>
          </div>
          <select class="role-switcher" onchange="switchDemoRole(this.value)" title="Demo rol değiştir">
            <option value="hr-admin" ${user.role === "hr-admin" ? "selected" : ""}>İK Admin</option>
            <option value="manager" ${user.role === "manager" ? "selected" : ""}>Yönetici</option>
            <option value="employee" ${user.role === "employee" ? "selected" : ""}>Çalışan</option>
          </select>
          <button class="btn-icon-sm" onclick="handleLogout()" title="Çıkış yap">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </header>

      <main class="main-content" id="main-content">
        ${content || "<h1>Hoş geldiniz</h1><p>Sol menüden işlem seçebilirsiniz.</p>"}
      </main>
    </div>
  `;
};
