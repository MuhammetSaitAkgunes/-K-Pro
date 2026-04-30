document.addEventListener("DOMContentLoaded", () => {
  bootstrapApp();
});

window.addEventListener("hashchange", () => {
  renderCurrentRoute();
});

window.bootstrapApp = (initialRoute) => {
  if (initialRoute) {
    const route = findRoute(initialRoute);
    if (route && setHashPath(route.path)) return;
  }

  renderCurrentRoute();
};

const renderCurrentRoute = () => {
  const fallbackPath = isAuthenticated() ? DefaultProtectedRoute : DefaultPublicRoute;
  if (!getHashPath()) {
    navigateTo(fallbackPath);
    return;
  }
  const route = getRouteByPath(getHashPath() || fallbackPath) || getRouteByPath(fallbackPath);
  renderRoute(route);
};

const ensureAppShell = () => {
  const root = document.getElementById("root");
  if (!document.querySelector(".app-container")) {
    root.innerHTML = Layout();
    initializeShellPreferences();
  }
};

const renderAuthRoute = (route) => {
  document.getElementById("root").innerHTML = AuthScreen(route.authMode || "login");
};

const renderRestrictedRoute = (route) => {
  ensureAppShell();
  setPageChrome({ title: "Yetki Gerekli", eyebrow: "İK Pro", navKey: route.navKey });
  document.getElementById("main-content").innerHTML = `
    <section class="surface empty-state">
      <i class="fa-solid fa-lock"></i>
      <h2>Bu alan için yetki gerekli</h2>
      <p>Bu rol ile seçilen modüle erişim kapalı. Gerçek yetki kontrolü backend policy katmanında yapılacaktır.</p>
    </section>
  `;
};

const renderRoute = (route) => {
  if (!route) {
    navigateTo(isAuthenticated() ? DefaultProtectedRoute : DefaultPublicRoute);
    return;
  }

  if (route.public) {
    if (isAuthenticated()) {
      navigateTo(DefaultProtectedRoute);
      return;
    }
    renderAuthRoute(route);
    return;
  }

  if (!isAuthenticated()) {
    navigateTo(DefaultPublicRoute);
    return;
  }

  if (!canAccessRoute(route)) {
    renderRestrictedRoute(route);
    return;
  }

  ensureAppShell();
  setPageChrome(route);

  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = route.render ? route.render() : emptyRouteState();
  route.afterRender?.();
};

const setPageChrome = (route) => {
  const pageTitle = document.getElementById("page-title");
  const pageEyebrow = document.getElementById("page-eyebrow");
  if (pageTitle) pageTitle.innerText = route.title || "Yakında";
  if (pageEyebrow) pageEyebrow.innerText = route.eyebrow || "İK Pro";

  document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("active"));
  const activeItem = document.querySelector(`.nav-item[data-page="${route.navKey || route.key}"]`);
  if (activeItem) activeItem.classList.add("active");
};

const emptyRouteState = () => `
  <section class="surface empty-state">
    <i class="fa-regular fa-compass"></i>
    <h2>Bu alan hazırlanıyor</h2>
    <p>Seçtiğiniz modül henüz demo kapsamına eklenmedi.</p>
  </section>
`;

window.navigateTo = (routeOrPath, evt) => {
  evt?.preventDefault?.();

  const route = findRoute(routeOrPath) || getRouteByPath(isAuthenticated() ? DefaultProtectedRoute : DefaultPublicRoute);
  if (setHashPath(route.path)) return;
  renderRoute(route);
};

const initializeShellPreferences = () => {
  const savedTheme = localStorage.getItem("ikpro-theme") || "light";
  const sidebarCollapsed = localStorage.getItem("ikpro-sidebar") === "collapsed";

  applyTheme(savedTheme);
  applySidebarState(sidebarCollapsed);
};

const applySidebarState = (collapsed) => {
  const app = document.querySelector(".app-container");
  if (!app) return;

  app.classList.toggle("sidebar-collapsed", collapsed);
  localStorage.setItem("ikpro-sidebar", collapsed ? "collapsed" : "expanded");
};

window.toggleSidebar = () => {
  const app = document.querySelector(".app-container");
  applySidebarState(!app?.classList.contains("sidebar-collapsed"));
};

const applyTheme = (theme) => {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("ikpro-theme", nextTheme);

  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.className = nextTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
};

window.toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(currentTheme === "dark" ? "light" : "dark");
};

window.handleLogout = () => {
  logout();
  navigateTo("login");
};
