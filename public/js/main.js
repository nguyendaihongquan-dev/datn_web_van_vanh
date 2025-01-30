// Load content function
function loadContent(page) {
    const mainContent = document.getElementById('mainContent');
    
    switch(page) {
        case 'account':
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Quản Lý Tài Khoản</h5>
                        <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addUserModal">
                            <i class="fas fa-user-plus"></i> Thêm tài khoản
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Tên hiển thị</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="userTableBody">
                                    <!-- Dữ liệu sẽ được thêm vào đây -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            loadUsers(); // Load danh sách users
            break;
            
        case 'home':
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Sơ Đồ Bãi Đỗ Xe</h5>
                    </div>
                    <div class="card-body">
                        <div class="parking-lot">
                            <div class="row">
                                ${Array(24).fill().map((_, index) => `
                                    <div class="col-md-3 mb-3">
                                        <div class="parking-space" id="space-${index + 1}">
                                            <i class="fas fa-car"></i>
                                            <h5>A${index + 1}</h5>
                                            <span class="status-badge available">Trống</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'parking':
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Quản Lý Xe</h5>
                        <p class="card-text">Chức năng đang phát triển...</p>
                    </div>
                </div>
            `;
            break;
            
        case 'ticket':
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Quản Lý Vé Xe</h5>
                        <p class="card-text">Chức năng đang phát triển...</p>
                    </div>
                </div>
            `;
            break;
            
        case 'stats':
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Thống Kê</h5>
                        <p class="card-text">Chức năng đang phát triển...</p>
                    </div>
                </div>
            `;
            break;
            
        case 'settings':
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Cài Đặt</h5>
                        <p class="card-text">Chức năng đang phát triển...</p>
                    </div>
                </div>
            `;
            break;
            
        default:
            mainContent.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">404</h5>
                        <p class="card-text">Không tìm thấy trang.</p>
                    </div>
                </div>
            `;
    }
}

// Load trang mặc định khi vừa vào
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home');
}); 