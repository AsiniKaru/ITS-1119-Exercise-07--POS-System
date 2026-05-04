  // import { updateDashboardCounts } from "./DashboardController.js";

const CREDENTIALS = { username: 'admin', password: '111' };

//===================== Handle Login Btn==========================

function login() {

    const uName = document.getElementById('username').value.trim();
    const pWord = document.getElementById('password').value;
    const error = document.getElementById('loginError');

    if (uName === CREDENTIALS.username && pWord === CREDENTIALS.password) {

      error.style.display = 'none';
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('app').style.display        = 'block';

      const display = uName.charAt(0).toUpperCase() + uName.slice(1); 
      document.getElementById('loggedUser').textContent  = display;

    // Bootstrap models & controllers
      // Database.init();
      if (typeof window.updateDashboardCount === 'function') {
            window.updateDashboardCount();
        } else {
            console.warn("Dashboard module not loaded yet. Trying again in 100ms...");
            setTimeout(() => window.updateDashboardCount?.(), 100);
        }
    } else {
      error.style.display = 'block';
    }
  }

//====================== Handle Logout Btn ==========================
  function doLogout() {
    closeDropdown();
    if (!confirm('Are you sure you want to logout?')) return;
    document.getElementById('app').style.display        = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }

  // log when enter clicked after enter pword & username
   document.addEventListener('keydown', e => {
    if (e.target.id === 'password' && e.key === 'Enter') login();
    if (e.target.id === 'username'  && e.key === 'Enter') document.getElementById('password').focus();
  });

// ===================== Handle Session changes ====================

function showSection(name, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.navBtn').forEach(b => b.classList.remove('active'));
    document.getElementById('section' + name).classList.add('active');
    if (btn) btn.classList.add('active');
    // if (name === 'Dashboard') window.updateDashboardCount();
    if (typeof window.updateDashboardCount === 'function') {
            window.updateDashboardCount();
        }
  }


  //========================== DropDown =========================
   function toggleDropdown() {
    console.log("Hi");
    document.getElementById('userBtn').classList.toggle('open');
    document.getElementById('userDropdown').classList.toggle('open');
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    const wrapper = document.querySelector('.userWrapper');
    if (wrapper && !wrapper.contains(e.target)) closeDropdown();
  });

  function closeDropdown() {
    document.getElementById('userBtn').classList.remove('open');
    document.getElementById('userDropdown').classList.remove('open');
  }

window.login = login;
window.showSection = showSection;
window.toggleDropdown = toggleDropdown;
window.doLogout = doLogout;