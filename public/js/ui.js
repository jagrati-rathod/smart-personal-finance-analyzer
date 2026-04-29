window.UI = {
  getSidebarHTML(activePage) {
    return `
      <aside class="sidebar">
        <div class="sidebar-logo">
          <i class="fa-solid fa-wallet"></i> <span>Spendify</span>
        </div>
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">
              <i class="fa-solid fa-chart-pie"></i> Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a href="add-expense.html" class="nav-link ${activePage === 'add-expense' ? 'active' : ''}">
              <i class="fa-solid fa-plus-circle"></i> Add Expense
            </a>
          </li>
          <li class="nav-item">
            <a href="history.html" class="nav-link ${activePage === 'history' ? 'active' : ''}">
              <i class="fa-solid fa-list"></i> History
            </a>
          </li>
          <li class="nav-item">
            <a href="set-budget.html" class="nav-link ${activePage === 'set-budget' ? 'active' : ''}">
              <i class="fa-solid fa-bullseye"></i> Budget Limits
            </a>
          </li>
          <li class="nav-item">
            <a href="health.html" class="nav-link ${activePage === 'health' ? 'active' : ''}">
              <i class="fa-solid fa-heart-pulse"></i> Health Profile
            </a>
          </li>
        </ul>
        <div style="margin-top:auto" class="nav-item">
          <a href="#" id="logout-btn" class="nav-link text-danger">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </a>
        </div>
      </aside>
    `;
  },

  injectSidebar(activePage) {
    const container = document.getElementById('sidebar-container');
    if (container) {
      container.innerHTML = this.getSidebarHTML(activePage);
      
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.API.logoutUser();
          window.location.href = 'login.html';
        });
      }
    }
  },

  async checkAuth(requireAuth = true) {
    const token = window.API.getToken();
    if (requireAuth && !token) {
      window.location.href = 'login.html';
      return null;
    } 
    if (token) {
      try {
        const profile = await window.API.getProfile();
        if (!requireAuth) {
           window.location.href = 'dashboard.html';
        }
        return profile;
      } catch (err) {
        if (requireAuth) window.location.href = 'login.html';
        return null;
      }
    }
    return null;
  },
  
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '8px';
    toast.style.color = 'white';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '9999';
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.backgroundColor = type === 'success' ? 'var(--success)' : 'var(--danger)';
    toast.innerText = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
