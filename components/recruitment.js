const Recruitment = () => {
  const candidates = [
    { name: "Burak Yılmaz", role: "Senior Frontend Developer", date: "2s önce", status: "Mülakat", score: 92, avatar: "BY", active: true },
    { name: "Selin Koç", role: "UI/UX Designer", date: "1g önce", status: "Yeni", score: 85, avatar: "SK", active: false },
    { name: "Mert Demir", role: "Backend Developer", date: "2g önce", status: "Teklif", score: 78, avatar: "MD", active: false },
    { name: "Ayşe Vural", role: "İK Uzmanı", date: "3g önce", status: "Red", score: 45, avatar: "AV", active: false },
  ];

  const renderList = () =>
    candidates
      .map(
        (candidate) => `
          <div class="candidate-item ${candidate.active ? "active" : ""}" onclick="selectCandidate(this)">
            <div class="ci-avatar">${candidate.avatar}</div>
            <div class="ci-info">
              <div class="ci-header">
                <h4>${candidate.name}</h4>
                <span class="ci-time">${candidate.date}</span>
              </div>
              <p>${candidate.role}</p>
              <div class="ci-meta">
                <span class="status-tag ${candidate.status.toLowerCase()}">${candidate.status}</span>
                <span class="score-text ${candidate.score > 80 ? "high" : "mid"}">%${candidate.score} uygun</span>
              </div>
            </div>
          </div>
        `
      )
      .join("");

  return `
    <div id="ats-container">
      <aside class="ats-sidebar">
        <div class="sidebar-header">
          <div>
            <h3>Aday Havuzu <span class="badge-count">12</span></h3>
            <p>Aktif pozisyonlara göre sıralandı</p>
          </div>
          <div class="search-wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Aday ara" />
          </div>
          <div class="filter-tabs">
            <button class="ft-btn active">Tümü</button>
            <button class="ft-btn">Yeni</button>
            <button class="ft-btn">Mülakat</button>
          </div>
        </div>
        <div class="candidate-list">${renderList()}</div>
      </aside>

      <main class="ats-detail">
        <div class="detail-header">
          <div class="dh-profile">
            <div class="dh-avatar-lg">BY</div>
            <div>
              <h2>Burak Yılmaz</h2>
              <p class="dh-role">Senior Frontend Developer</p>
              <div class="dh-tags">
                <span class="tag-pill"><i class="fa-solid fa-location-dot"></i> İstanbul</span>
                <span class="tag-pill"><i class="fa-solid fa-briefcase"></i> 5 yıl deneyim</span>
              </div>
            </div>
          </div>
          <div class="dh-actions">
            <div class="match-score"><span class="score-circle">92</span><span class="score-label">AI puanı</span></div>
            <button class="btn btn-primary"><i class="fa-solid fa-thumbs-up"></i> İşe Al</button>
            <button class="btn-icon-only"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          </div>
        </div>

        <div class="detail-tabs">
          <button class="tab-link active" onclick="switchDetailTab(event, 'tab-cv')">Özgeçmiş</button>
          <button class="tab-link" onclick="switchDetailTab(event, 'tab-notes')">Mülakat Notları</button>
          <button class="tab-link" onclick="switchDetailTab(event, 'tab-eval')">Değerlendirme</button>
          <button class="tab-link" onclick="switchDetailTab(event, 'tab-history')">Geçmiş</button>
        </div>

        <div class="detail-content-wrapper">
          <div id="tab-cv" class="tab-content active">
            <div class="content-block">
              <h4><i class="fa-regular fa-file-lines"></i> Başvuru Özeti</h4>
              <p class="summary-text">React ve modern JavaScript konusunda 5 yıllık deneyime sahip, ürün ekipleriyle çalışmış güçlü bir aday. Portfolyosu pozisyon beklentileriyle uyumlu.</p>
            </div>
            <div class="content-block">
              <h4><i class="fa-solid fa-wand-magic-sparkles"></i> Yetenek Seti</h4>
              <div class="skills-wrap">
                <span class="skill-tag">React.js</span>
                <span class="skill-tag">Next.js</span>
                <span class="skill-tag">TypeScript</span>
              </div>
            </div>
            <div class="content-block">
              <h4><i class="fa-solid fa-history"></i> İş Deneyimi</h4>
              <div class="timeline">
                <div class="tl-item">
                  <div class="tl-dot"></div>
                  <div class="tl-content">
                    <strong>Senior Frontend Developer</strong>
                    <span>TechSolutions A.Ş. • 2021 - Günümüz</span>
                    <p>Büyük ölçekli e-ticaret ürününde arayüz geliştirme ve performans iyileştirme sorumluluğu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="tab-notes" class="tab-content">
            <div class="notes-container">
              <div class="add-note-box">
                <textarea placeholder="Mülakat notunuzu buraya girin"></textarea>
                <div class="note-actions">
                  <select><option>Teknik Mülakat</option><option>İK Görüşmesi</option></select>
                  <button class="btn btn-primary btn-sm">Not Ekle</button>
                </div>
              </div>
              <div class="note-item">
                <div class="note-avatar">AD</div>
                <div class="note-body">
                  <div class="note-header"><strong>Ayşe Demir (İK)</strong> <span>Dün, 14:30</span></div>
                  <p>İletişim becerileri kuvvetli. Kültür uyumu ve motivasyon seviyesi olumlu.</p>
                </div>
              </div>
            </div>
          </div>

          <div id="tab-eval" class="tab-content">
            <div class="eval-grid">
              <div class="eval-card"><div class="eval-header"><span>Teknik Yeterlilik</span><strong>4.5/5</strong></div><div class="progress-bg"><div class="progress-fill" style="width: 90%"></div></div></div>
              <div class="eval-card"><div class="eval-header"><span>İletişim</span><strong>5.0/5</strong></div><div class="progress-bg"><div class="progress-fill" style="width: 100%"></div></div></div>
            </div>
          </div>

          <div id="tab-history" class="tab-content">
            <div class="history-list">
              <div class="hist-item"><i class="fa-solid fa-envelope bg-blue"></i><div><strong>Teklif hazırlığı başlatıldı</strong><small>Bugün 10:00</small></div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
};

window.selectCandidate = (el) => {
  document.querySelectorAll(".candidate-item").forEach((candidate) => candidate.classList.remove("active"));
  el.classList.add("active");
};

window.switchDetailTab = (event, tabId) => {
  document.querySelectorAll(".tab-link").forEach((button) => button.classList.remove("active"));
  event.currentTarget.classList.add("active");
  document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
};
