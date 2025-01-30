// Function toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    
    // Toggle icon
    const icon = event.currentTarget.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Load danh sách users
async function loadUsers() {
    const userTableBody = document.getElementById('userTableBody');
    try {
        userTableBody.innerHTML = '<tr><td colspan="4" class="text-center">Đang tải dữ liệu...</td></tr>';

        // Đảm bảo đã đăng nhập
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            throw new Error('Vui lòng đăng nhập lại');
        }

        // Lấy token mới
        const token = await currentUser.getIdToken(true);
        console.log('Token obtained:', token ? 'Yes' : 'No');

        const response = await fetch('/api/users', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể tải danh sách người dùng');
        }

        const users = await response.json();
        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="4" class="text-center">Chưa có người dùng nào</td></tr>';
            return;
        }

        userTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.email}</td>
                <td>${user.displayName || 'Chưa đặt tên'}</td>
                <td>
                    <span class="badge ${user.disabled ? 'bg-danger' : 'bg-success'}">
                        ${user.disabled ? 'Vô hiệu hóa' : 'Hoạt động'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="toggleUserStatus('${user.uid}', ${user.disabled})">
                        <i class="fas ${user.disabled ? 'fa-lock-open' : 'fa-lock'}"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.uid}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Load users error:', error);
        userTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Lỗi: ${error.message}</td></tr>`;
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: error.message
        });
    }
}

// Tạo tài khoản mới
async function createNewUser(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        displayName: document.getElementById('displayName').value
    };

    if (formData.password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Mật khẩu phải có ít nhất 6 ký tự'
        });
        return;
    }

    try {
        const token = await firebase.auth().currentUser?.getIdToken();
        const response = await fetch('/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Không thể tạo tài khoản');
        }

        // Đóng modal và reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        document.getElementById('addUserForm').reset();
        
        // Thông báo thành công
        Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Đã tạo tài khoản mới',
            timer: 2000,
            showConfirmButton: false
        });
        
        // Tải lại danh sách
        loadUsers();
    } catch (error) {
        console.error('Lỗi:', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: error.message
        });
    }
}

// Vô hiệu hóa/Kích hoạt tài khoản
async function toggleUserStatus(uid, currentStatus) {
    try {
        const token = await firebase.auth().currentUser?.getIdToken();
        const response = await fetch(`/api/users/${uid}/toggle-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ disabled: !currentStatus })
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: `Đã ${!currentStatus ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản`,
                timer: 2000,
                showConfirmButton: false
            });
            loadUsers();
        }
    } catch (error) {
        console.error('Lỗi:', error);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể cập nhật trạng thái tài khoản'
        });
    }
}

// Xóa tài khoản
async function deleteUser(uid) {
    const result = await Swal.fire({
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc chắn muốn xóa tài khoản này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
        try {
            const token = await firebase.auth().currentUser?.getIdToken();
            const response = await fetch(`/api/users/${uid}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Đã xóa tài khoản',
                    timer: 2000,
                    showConfirmButton: false
                });
                loadUsers();
            }
        } catch (error) {
            console.error('Lỗi:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể xóa tài khoản'
            });
        }
    }
}

// Load danh sách khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    // Tự động đăng nhập với tài khoản admin
    firebase.auth().signInWithEmailAndPassword('nguyenquan@gmail.com', '123456')
        .then(() => {
            console.log('Đã đăng nhập với tài khoản admin');
            loadUsers();
        })
        .catch(error => {
            console.error('Lỗi đăng nhập:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi đăng nhập',
                text: 'Không thể đăng nhập với tài khoản admin'
            });
        });
}); 