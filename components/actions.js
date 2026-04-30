const actionLevelText = (level) => ({ high: "Yüksek", medium: "Orta", low: "Düşük" }[level] || "Normal");
const actionStatusText = (status) => ({ open: "Açık", week: "Bu Hafta", done: "Tamamlandı" }[status] || "Açık");

const renderActionCard = (action) => `
  <article class="global-action-card ${action.priority}">
    <div class="global-action-top">
      <span class="status-pill ${action.priority === "high" ? "rejected" : action.priority === "medium" ? "pending" : "approved"}">${actionLevelText(action.priority)}</span>
      <span>${action.due}</span>
    </div>
    <h4>${action.title}</h4>
    <p>${action.action}</p>
    <div class="global-action-meta">
      <span><i class="fa-solid fa-layer-group"></i> ${action.source}</span>
      <span><i class="fa-solid fa-user"></i> ${action.owner}</span>
    </div>
    <div class="global-action-footer">
      <span class="status-pill info">${actionStatusText(action.status)}</span>
      <button class="btn btn-secondary btn-sm" onclick="navigateTo('${action.sourceRoute}', event)">Kaynağa git</button>
    </div>
  </article>
`;

const renderAuditTimeline = () => `
  <div class="audit-timeline">
    ${getMockAuditLogs()
      .map(
        (log) => `
          <div class="audit-item">
            <div class="audit-dot"></div>
            <div class="audit-body">
              <div class="audit-head">
                <strong>${log.action}</strong>
                <span>${log.time}</span>
              </div>
              <p>${log.detail}</p>
              <small>${log.actor} · ${log.module}</small>
            </div>
          </div>
        `
      )
      .join("")}
  </div>
`;

const ActionsCenter = () => {
  const actions = getMockActions();
  const kpis = {
    today: actions.filter((item) => item.due === "Bugün").length,
    overdue: 1,
    high: actions.filter((item) => item.priority === "high" && item.status !== "done").length,
    done: actions.filter((item) => item.status === "done").length,
  };

  return `
    <div id="actions-screen">
      <div class="page-header">
        <div>
          <h2>Global Aksiyon Merkezi</h2>
          <p>Risk, bordro, uyum ve çalışan deneyimi aksiyonlarını tek operasyon merkezinde takip edin.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-secondary"><i class="fa-solid fa-filter"></i> Filtrele</button>
          <button class="btn btn-primary"><i class="fa-solid fa-plus"></i> Aksiyon oluştur</button>
        </div>
      </div>

      <div class="actions-kpi-grid">
        <div class="stat-box"><span class="sb-label">Bugün</span><strong class="sb-val">${kpis.today}</strong><small>Kapanması beklenen</small></div>
        <div class="stat-box"><span class="sb-label">Geciken</span><strong class="sb-val text-red">${kpis.overdue}</strong><small>Riskli aksiyon</small></div>
        <div class="stat-box"><span class="sb-label">Yüksek Öncelik</span><strong class="sb-val text-orange">${kpis.high}</strong><small>Aktif takip</small></div>
        <div class="stat-box"><span class="sb-label">Tamamlanan</span><strong class="sb-val">${kpis.done}</strong><small>Bu hafta</small></div>
      </div>

      <section class="card actions-filter-bar">
        <select class="small-select"><option>Öncelik: Tümü</option><option>Yüksek</option><option>Orta</option><option>Düşük</option></select>
        <select class="small-select"><option>Kaynak: Tümü</option><option>Risk Merkezi</option><option>Bordro</option><option>Uyum</option></select>
        <select class="small-select"><option>Sahip: Tümü</option><option>İK Operasyon</option><option>Yönetici</option></select>
        <select class="small-select"><option>Durum: Tümü</option><option>Açık</option><option>Bu Hafta</option><option>Tamamlandı</option></select>
      </section>

      <div class="actions-tabs">
        <button class="action-tab active" onclick="switchActionsTab('actions-open', event)">Açık</button>
        <button class="action-tab" onclick="switchActionsTab('actions-week', event)">Bu Hafta</button>
        <button class="action-tab" onclick="switchActionsTab('actions-done', event)">Tamamlanan</button>
        <button class="action-tab" onclick="switchActionsTab('actions-audit', event)">Denetim İzi</button>
      </div>

      <section id="actions-open" class="actions-tab-content active">
        <div class="global-actions-grid">${actions.filter((item) => item.status === "open").map(renderActionCard).join("")}</div>
      </section>
      <section id="actions-week" class="actions-tab-content">
        <div class="global-actions-grid">${actions.filter((item) => item.status === "week").map(renderActionCard).join("")}</div>
      </section>
      <section id="actions-done" class="actions-tab-content">
        <div class="global-actions-grid">${actions.filter((item) => item.status === "done").map(renderActionCard).join("")}</div>
      </section>
      <section id="actions-audit" class="actions-tab-content">
        <section class="card">${renderAuditTimeline()}</section>
      </section>
    </div>
  `;
};

window.switchActionsTab = (tabId, evt) => {
  document.querySelectorAll(".action-tab").forEach((tab) => tab.classList.remove("active"));
  document.querySelectorAll(".actions-tab-content").forEach((content) => content.classList.remove("active"));
  evt?.currentTarget?.classList.add("active");
  document.getElementById(tabId)?.classList.add("active");
};
