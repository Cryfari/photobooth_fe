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
            <h4 class="nav-title">Settings</h4>
            <ul>
                <li>
                    <a href="${base_path}admin_dashboard.html" class="${activePage === 'templates' ? 'active' : ''}">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.1135 0.715174C9.44522 0.833588 9.66668 1.14778 9.66668 1.5V6.5H14.6667C14.9887 6.5 15.2818 6.6855 15.4197 6.97648C15.5576 7.26745 15.5155 7.61183 15.3116 7.86104L7.81164 17.0277C7.5886 17.3003 7.21825 17.4032 6.88652 17.2848C6.55479 17.1664 6.33334 16.8522 6.33334 16.5V11.5H1.33334C1.01135 11.5 0.718171 11.3145 0.580284 11.0235C0.442398 10.7326 0.484481 10.3882 0.688378 10.139L8.18838 0.972306C8.41142 0.699697 8.78177 0.596761 9.1135 0.715174ZM3.09188 9.83334H7.16668C7.62691 9.83334 8.00001 10.2064 8.00001 10.6667V14.1655L12.9081 8.16667H8.83334C8.3731 8.16667 8.00001 7.79357 8.00001 7.33334V3.83451L3.09188 9.83334Z"/></svg>
                        <span>Manage Template</span>
                    </a>
                </li>
                <li>
                    <a href="${base_path}admin_manage_layouts.html" class="${activePage === 'layouts' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z"/></svg>
                        <span>Manage Layouts</span>
                    </a>
                </li>
                <li>
                    <a href="${base_path}admin_manage_packages.html" class="${activePage === 'packages' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58c.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7z"/></svg>
                        <span>Manage Packages</span>
                    </a>
                </li>
                <li>
                    <a href="${base_path}admin_add_ticket.html" class="${activePage === 'tickets' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .35.07.69.18 1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-8-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 10.5 6A1.5 1.5 0 0 1 12 4.5M4 19V8h16v11z"/></svg>
                        <span>Generate Ticket</span>
                    </a>
                </li>
                <li>
                    <a href="${base_path}admin_change_password.html" class="${activePage === 'password' ? 'active' : ''}">
                       <svg width="20" height="16" viewBox="0 0 20 16"><path d="M10 2.16667C9.55801 2.16667 9.13409 2.34226 8.82153 2.65482C8.50897 2.96738 8.33337 3.39131 8.33337 3.83333C8.33337 4.27536 8.50897 4.69928 8.82153 5.01185C9.13409 5.32441 9.55801 5.5 10 5.5C10.4421 5.5 10.866 5.32441 11.1786 5.01185C11.4911 4.69928 11.6667 4.27536 11.6667 3.83333C11.6667 3.39131 11.4911 2.96738 11.1786 2.65482C10.866 2.34226 10.4421 2.16667 10 2.16667ZM7.64302 1.47631C8.26814 0.851189 9.11598 0.5 10 0.5C10.8841 0.5 11.7319 0.851189 12.3571 1.47631C12.9822 2.10143 13.3334 2.94928 13.3334 3.83333C13.3334 4.71739 12.9822 5.56523 12.3571 6.19036C11.7319 6.81548 10.8841 7.16667 10 7.16667C9.11599 7.16667 8.26814 6.81548 7.64302 6.19036C7.0179 5.56523 6.66671 4.71739 6.66671 3.83333C6.66671 2.94928 7.0179 2.10143 7.64302 1.47631ZM4.16671 5.5C3.94569 5.5 3.73373 5.5878 3.57745 5.74408C3.42117 5.90036 3.33337 6.11232 3.33337 6.33333C3.33337 6.55435 3.42117 6.76631 3.57745 6.92259C3.73373 7.07887 3.94569 7.16667 4.16671 7.16667C4.38772 7.16667 4.59968 7.07887 4.75596 6.92259C4.91224 6.76631 5.00004 6.55435 5.00004 6.33333C5.00004 6.11232 4.91224 5.90036 4.75596 5.74408C4.59968 5.5878 4.38772 5.5 4.16671 5.5ZM2.39894 4.56557C2.86778 4.09673 3.50367 3.83333 4.16671 3.83333C4.82975 3.83333 5.46563 4.09673 5.93447 4.56557C6.40331 5.03441 6.66671 5.67029 6.66671 6.33333C6.66671 6.99637 6.40331 7.63226 5.93447 8.1011C5.46563 8.56994 4.82975 8.83333 4.16671 8.83333C3.50367 8.83333 2.86778 8.56994 2.39894 8.1011C1.9301 7.63226 1.66671 6.99637 1.66671 6.33333C1.66671 5.67029 1.9301 5.03441 2.39894 4.56557ZM15.8334 5.5C15.6124 5.5 15.4004 5.5878 15.2441 5.74408C15.0878 5.90036 15 6.11232 15 6.33333C15 6.55435 15.0878 6.76631 15.2441 6.92259C15.4004 7.07887 15.6124 7.16667 15.8334 7.16667C16.0544 7.16667 16.2663 7.07887 16.4226 6.92259C16.5789 6.76631 16.6667 6.55435 16.6667 6.33333C16.6667 6.11232 16.5789 5.90036 16.4226 5.74408C16.2663 5.5878 16.0544 5.5 15.8334 5.5ZM14.0656 4.56557C14.5344 4.09673 15.1703 3.83333 15.8334 3.83333C16.4964 3.83333 17.1323 4.09673 17.6011 4.56557C18.07 5.03441 18.3334 5.67029 18.3334 6.33333C18.3334 6.99637 18.07 7.63226 17.6011 8.1011C17.1323 8.56994 16.4964 8.83333 15.8334 8.83333C15.1703 8.83333 14.5344 8.56994 14.0656 8.1011C13.5968 7.63226 13.3334 6.99637 13.3334 6.33333C13.3334 5.67029 13.5968 5.03441 14.0656 4.56557ZM10 9.66608C9.33359 9.66608 8.68242 9.86576 8.13052 10.2394C7.57863 10.613 7.15133 11.1433 6.90373 11.7621C6.75109 12.143 6.66671 12.5608 6.66671 13V13.8333H13.3334V13C13.3334 12.5608 13.2491 12.1434 13.0965 11.7625C12.8489 11.1437 12.4215 10.613 11.8696 10.2394C11.3177 9.86576 10.6665 9.66608 10 9.66608ZM15 13.8333H17.5V13.0001C17.5 13 17.5 13.0001 17.5 13.0001C17.5 12.6537 17.3921 12.3159 17.1912 12.0337C16.9904 11.7515 16.7066 11.5389 16.3793 11.4255C16.0521 11.312 15.6976 11.3033 15.3652 11.4006C15.1679 11.4584 14.9842 11.5518 14.8226 11.675C14.9385 12.0979 15 12.5425 15 13V13.8333ZM14.1082 10.148C13.7584 9.64433 13.317 9.20656 12.8038 8.85918C11.9761 8.29888 10.9996 7.99941 10 7.99941C9.00052 7.99941 8.02393 8.29888 7.19623 8.85918C6.68306 9.20656 6.24172 9.64433 5.89191 10.148C5.6465 9.99958 5.38156 9.88258 5.10308 9.80107C4.43824 9.60647 3.72928 9.62384 3.07476 9.85077C2.42025 10.0777 1.85269 10.5029 1.451 11.0673C1.0493 11.6317 0.833425 12.3072 0.833374 12.9999V14.6667C0.833374 15.1269 1.20647 15.5 1.66671 15.5H18.3334C18.7936 15.5 19.1667 15.1269 19.1667 14.6667V13C19.1667 12.3073 18.9508 11.6317 18.5491 11.0673C18.1474 10.5029 17.5798 10.0777 16.9253 9.85077C16.2708 9.62384 15.5618 9.60647 14.897 9.80107C14.6185 9.88258 14.3536 9.99958 14.1082 10.148ZM5.1775 11.675C5.01591 11.5518 4.8322 11.4584 4.6349 11.4006C4.30247 11.3033 3.94799 11.312 3.62074 11.4255C3.29348 11.5389 3.0097 11.7515 2.80885 12.0337C2.60802 12.3159 2.50008 12.6537 2.50004 13C2.50004 13 2.50004 13 2.50004 13V13.8333H5.00004V13C5.00004 12.5425 5.06157 12.0979 5.1775 11.675Z"/></svg>
                        <span>Setting Password</span>
                    </a>
                </li>
                <li>
                    <a href="${base_path}admin_setting_gdrive.html" class="${activePage === 'gdrive' ? 'active' : ''}">
                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M1.23223 1.23223C1.70107 0.763392 2.33696 0.5 3 0.5H13C13.663 0.5 14.2989 0.763392 14.7678 1.23223C15.2366 1.70107 15.5 2.33696 15.5 3V13C15.5 13.663 15.2366 14.2989 14.7678 14.7678C14.2989 15.2366 13.663 15.5 13 15.5H3C2.33696 15.5 1.70107 15.2366 1.23223 14.7678C0.763392 14.2989 0.5 13.663 0.5 13V3C0.5 2.33696 0.763392 1.70107 1.23223 1.23223ZM10.5 2.16667H5.5V9.98497L7.62732 8.92131C7.86193 8.80401 8.13807 8.80401 8.37268 8.92131L10.5 9.98497V2.16667ZM3.83333 2.16667H3C2.77899 2.16667 2.56702 2.25446 2.41074 2.41074C2.25446 2.56702 2.16667 2.77899 2.16667 3V13C2.16667 13.221 2.25446 13.433 2.41074 13.5893C2.56702 13.7455 2.77899 13.8333 3 13.8333H13C13.221 13.8333 13.433 13.7455 13.5893 13.5893C13.7455 13.433 13.8333 13.221 13.8333 13V3C13.8333 2.77899 13.7455 2.56702 13.5893 2.41074C13.433 2.25446 13.221 2.16667 13 2.16667H12.1667V11.3333C12.1667 11.6221 12.0171 11.8904 11.7714 12.0422C11.5258 12.194 11.219 12.2079 10.9607 12.0787L8 10.5984L5.03934 12.0787C4.78102 12.2079 4.47424 12.194 4.22856 12.0422C3.98288 11.8904 3.83333 11.6221 3.83333 11.3333V2.16667Z"/></svg>
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