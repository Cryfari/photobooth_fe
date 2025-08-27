/**
 * admin_sidebar.js
 * Bertanggung jawab untuk membuat, menata, dan menyuntikkan navigasi sidebar
 * ke dalam halaman admin mana pun yang memanggilnya.
 */

const injectSidebarCSS = () => {
    // CSS untuk sidebar dan layout dasar admin.
    // Dipindahkan dari file HTML untuk enkapsulasi.
    const sidebarCSS = `
        :root {
            --sidebar-bg: #FFFFFF;
            --main-bg: #F7F8FC;
            --card-bg: #FFFFFF;
            --primary-orange: #F58D3D;
            --text-dark: #252733;
            --text-gray: #9FA2B4;
            --text-inactive: #4B5563;
            --border-color: #DFE0EB;
            --danger-color: #D73737;
            --font-family: 'Mulish', sans-serif;
        }
        *, *::before, *::after {
            box-sizing: border-box;
        }
        body {
            margin: 0;
            font-family: var(--font-family);
            background-color: var(--main-bg);
            color: var(--text-dark);
            font-size: 14px;
        }
        .admin-layout {
            display: flex;
            min-height: 100vh;
        }
        .sidebar {
            width: 255px;
            background-color: var(--sidebar-bg);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }
        .main-content {
            flex-grow: 1;
            padding: 30px;
        }
        .sidebar-header {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 24px 30px;
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: 0.3px;
            border-bottom: 1px solid var(--border-color);
        }
        .sidebar-nav {
            padding: 16px;
            flex-grow: 1; /* Membuat nav mengisi ruang yang tersedia */
        }
        .sidebar-nav .nav-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            color: var(--text-gray);
            font-weight: 700;
            padding: 8px 14px;
            margin-bottom: 8px;
        }
        .sidebar-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .sidebar-nav a {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 14px;
            margin-bottom: 4px;
            border-radius: 8px;
            text-decoration: none;
            color: var(--text-inactive);
            font-weight: 600;
            transition: all 0.2s ease-in-out;
        }
        .sidebar-nav a:hover {
            background-color: #F3F4F6;
        }
        .sidebar-nav a.active {
            background-color: var(--primary-orange);
            color: white;
        }
        .sidebar-nav a.active svg {
            fill: white;
        }
        .sidebar-nav a.active:hover {
            background-color: #E8832E;
        }
        .sidebar-nav svg {
            width: 20px;
            height: 20px;
            fill: var(--text-inactive);
        }
    `;

    // Buat elemen <style> dan tambahkan ke <head>
    const styleElement = document.createElement('style');
    styleElement.id = 'sidebar-styles'; // Beri ID agar tidak terduplikasi
    styleElement.innerHTML = sidebarCSS;

    // Hanya tambahkan jika belum ada
    if (!document.getElementById(styleElement.id)) {
        document.head.appendChild(styleElement);
    }
};

const createSidebar = (activePage = '') => {
    // 1. Suntikkan CSS ke dalam halaman
    injectSidebarCSS();

    // 2. Tentukan path relatif untuk halaman
    const base_path = ''; // Kosongkan jika semua file ada di root

    const sidebarContainer = document.querySelector('.sidebar');
    if (!sidebarContainer) {
        console.error("Elemen '.sidebar' tidak ditemukan. Pastikan ada <aside class='sidebar'></aside> di HTML.");
        return;
    }
    
    // 3. Buat HTML untuk sidebar
    const sidebarHTML = `
        <div class="sidebar-header">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 1.29289C18.0976 1.68342 18.0976 2.31658 17.7071 2.70711L14.4142 6L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071C17.3166 11.0976 16.6834 11.0976 16.2929 10.7071L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289L16.2929 1.29289C16.6834 0.902369 17.3166 0.902369 17.7071 1.29289Z" fill="#F59E0B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C4.82841e-08 0.447715 0.447715 -4.8282e-08 1 0L13 1.04907e-06C13.5523 1.09736e-06 14 0.447716 14 1C14 1.55229 13.5523 2 13 2L1 2C0.447715 2 -4.82804e-08 1.55228 0 1Z" fill="#F59E0B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11C4.82841e-08 10.4477 0.447715 10 1 10L13 10C13.5523 10 14 10.4477 14 11C14 11.5523 13.5523 12 13 12L1 12C0.447715 12 -4.82804e-08 11.5523 0 11Z" fill="#F59E0B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C4.82841e-08 5.44772 0.447715 5 1 5L9 5C9.55229 5 10 5.44772 10 6C10 6.55229 9.55229 7 9 7L1 7C0.447715 7 -4.82804e-08 6.55228 0 6Z" fill="#F59E0B"/></svg>
            <span>AI Photobooth</span>
        </div>
        <nav class="sidebar-nav">
            <div>
                <h4 class="nav-title">Overview</h4>
                <ul>
                    <li>
                        <a href="${base_path}admin_dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 3v6h8V3h-8zM3 13V3h8v10H3zm10 8v-6h8v6h-8zM3 21v-6h8v6H3z"/></svg>
                            <span>Dashboard</span>
                        </a>
                    </li>
                </ul>
                <h4 class="nav-title">Management</h4>
                <ul>
                    <li>
                        <a href="${base_path}admin_manage_templates.html" class="${activePage === 'templates' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.6,4.4C21.2,4.1,20.7,4,20.2,4H3.8C3.3,4,2.8,4.1,2.4,4.4C2,4.7,1.8,5.2,1.8,5.7v12.6c0,0.5,0.2,1,0.6,1.4c0.4,0.3,0.9,0.4,1.4,0.4h16.4c0.5,0,1-0.1,1.4-0.4c0.4-0.3,0.6-0.8,0.6-1.4V5.7C22.2,5.2,22,4.7,21.6,4.4z M4.8,17.3V6.7h14.4v10.6H4.8z M7.8,8.2v7.1l5.1-3.5L7.8,8.2z"/></svg>
                            <span>Manage Templates</span>
                        </a>
                    </li>
                    <li>
                        <a href="${base_path}admin_manage_layouts.html" class="${activePage === 'layouts' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z"/></svg>
                            <span>Manage Layouts</span>
                        </a>
                    </li>
                    <li>
                        <a href="${base_path}admin_composed_gallery.html" class="${activePage === 'gallery' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>
                            <span>Composed Gallery</span>
                        </a>
                    </li>
                    <!-- [BARU] Tautan ke galeri generated -->
                    <li>
                        <a href="${base_path}admin_generated_gallery.html" class="${activePage === 'generated_gallery' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.83 12.67l-2.17-2.17-2.17 2.17-1.41-1.41 2.17-2.17-2.17-2.17 1.41-1.41 2.17 2.17 2.17-2.17 1.41 1.41-2.17 2.17 2.17 2.17-1.41 1.41z"/></svg>
                            <span>Generated Gallery</span>
                        </a>
                    </li>
                    <li>
                        <a href="${base_path}admin_manage_packages.html" class="${activePage === 'packages' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58c.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7z"/></svg>
                            <span>Manage Packages</span>
                        </a>
                    </li>
                    <li>
                        <a href="${base_path}admin_add_ticket.html" class="${activePage === 'tickets' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .35.07.69.18 1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-8-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 10.5 6A1.5 1.5 0 0 1 12 4.5M4 19V8h16v11z"/></svg>
                            <span>Generate Ticket</span>
                        </a>
                    </li>
                    <li>
                        <a href="${base_path}admin_manage_transactions.html" class="${activePage === 'transactions' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 20V4h14v16H5zm-2-2h18V2H3v16zM11 6h2v12h-2V6zm-4 4h2v8H7v-8zm8 0h2v8h-2v-8z"/></svg>
                            <span>Transactions</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <h4 class="nav-title">Settings</h4>
                <ul>
                    <li>
                        <a href="${base_path}admin_change_password.html" class="${activePage === 'password' ? 'active' : ''}">
                           <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            <span>Setting Password</span>
                        </a>
                    </li>
                    <li>
                        <a href="${base_path}admin_setting_gdrive.html" class="${activePage === 'gdrive' ? 'active' : ''}">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
                            <span>Setting Google Drive</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="logoutButton">
                            <svg viewBox="0 0 24 24"><path d="M17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4L17 8z M5 5h7V3H5C3.9 3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"></path></svg>
                            <span>Logout Admin</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    
    sidebarContainer.innerHTML = sidebarHTML;

    // 4. Tambahkan event listener untuk logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminToken');
            window.location.href = `${base_path}admin_login.html`;
        });
    }
};
