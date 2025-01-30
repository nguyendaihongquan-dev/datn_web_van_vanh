// Khởi tạo Firebase Admin
const firebaseConfig = {
    // Thêm config của bạn vào đây
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Function để load danh sách users
async function loadUsers() {
    try {
        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Đang tải dữ liệu...</td></tr>';

        const usersSnapshot = await firebase.auth().listUsers();
        userTableBody.innerHTML = '';

        usersSnapshot.users.forEach(user => {
            const creationDate = new Date(user.metadata.creationTime).toLocaleDateString('vi-VN');
            const row = `
                <tr>
                    <td>${user.uid}</td>
                    <td>${user.email}</td>
                    <td>${user.displayName || 'Chưa đặt tên'}</td>
                    <td>
                        <span class="badge ${user.disabled ? 'bg-danger' : 'bg-success'}">
                            ${user.disabled ? 'Vô hiệu hóa' : 'Hoạt động'}
                        </span>
                    </td>
                    <td>${creationDate}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="toggleUserStatus('${user.uid}', ${user.disabled})">
                            <i class="fas ${user.disabled ? 'fa-lock-open' : 'fa-lock'}"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.uid}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            userTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
        showToast('Lỗi', 'Không thể tải danh sách người dùng', 'error');
    }
}

// Function để toggle trạng thái user
async function toggleUserStatus(uid, currentStatus) {
    try {
        await firebase.auth().updateUser(uid, {
            disabled: !currentStatus
        });
        showToast('Thành công', 'Đã cập nhật trạng thái người dùng', 'success');
        loadUsers();
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        showToast('Lỗi', 'Không thể cập nhật trạng thái người dùng', 'error');
    }
}

// Function để xóa user
async function deleteUser(uid) {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;

    try {
        await firebase.auth().deleteUser(uid);
        showToast('Thành công', 'Đã xóa người dùng', 'success');
        loadUsers();
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        showToast('Lỗi', 'Không thể xóa người dùng', 'error');
    }
}

// Function để refresh danh sách
function refreshUserList() {
    loadUsers();
}

// Function hiển thị thông báo
function showToast(title, message, type) {
    Swal.fire({
        title: title,
        text: message,
        icon: type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
}

// Hàm load nội dung trang quản lý tài khoản
function loadContent(page) {
    if (page === 'account') {
        const content = `
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Quản lý tài khoản</h2>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                        <i class="fas fa-plus"></i> Thêm tài khoản
                    </button>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Tên hiển thị</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="userList">
                        <!-- Danh sách tài khoản sẽ được thêm vào đây -->
                    </tbody>
                </table>
            </div>
        `;
        document.getElementById('mainContent').innerHTML = content;
        loadUserList(); // Load danh sách tài khoản
    }
}

// Hàm tạo tài khoản mới
function createNewUser(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const displayName = document.getElementById('displayName').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Cập nhật displayName
            return userCredential.user.updateProfile({
                displayName: displayName
            });
        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Tạo tài khoản mới thành công!'
            });
            document.getElementById('addUserForm').reset();
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
            loadUserList(); // Tải lại danh sách
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.message
            });
        });
}

// Hàm load danh sách tài khoản
function loadUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Xóa nội dung cũ

    // Trong thực tế, bạn sẽ cần lấy danh sách từ Realtime Database
    // Đây là ví dụ đơn giản để hiển thị cấu trúc
    const sampleUsers = [
        { email: 'user1@example.com', displayName: 'Người dùng 1' },
        { email: 'user2@example.com', displayName: 'Người dùng 2' }
    ];

    sampleUsers.forEach(user => {
        const row = `
            <tr>
                <td>${user.email}</td>
                <td>${user.displayName}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        userList.innerHTML += row;
    });
} 