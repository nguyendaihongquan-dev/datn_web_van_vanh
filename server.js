require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

// Khởi tạo express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Khởi tạo Firebase Admin
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middleware xác thực token
async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Token không hợp lệ hoặc không tồn tại' 
            });
        }

        const token = authHeader.split('Bearer ')[1];
        console.log('Received token:', token ? 'Yes' : 'No');

        if (!token) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Token không tồn tại' 
            });
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            console.log('Token verified for user:', decodedToken.email);
            next();
        } catch (verifyError) {
            console.error('Token verification error:', verifyError);
            return res.status(403).json({ 
                error: 'Forbidden',
                message: 'Token không hợp lệ' 
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: 'Lỗi xác thực' 
        });
    }
}

// API endpoints
// 1. Lấy danh sách users
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const listUsers = await admin.auth().listUsers();
        res.json(listUsers.users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ 
            error: 'Không thể lấy danh sách người dùng',
            message: error.message 
        });
    }
});

// 2. Tạo user mới
app.post('/api/users/create', authenticateToken, async (req, res) => {
    try {
        const { email, password, displayName } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email và mật khẩu là bắt buộc' 
            });
        }

        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: displayName || undefined,
            emailVerified: false,
            disabled: false
        });

        res.json({
            message: 'Tạo tài khoản thành công',
            user: userRecord
        });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'auth/email-already-exists') {
            return res.status(400).json({ 
                error: 'Email đã tồn tại',
                message: 'Email này đã được sử dụng cho tài khoản khác' 
            });
        }
        res.status(500).json({ 
            error: 'Không thể tạo tài khoản',
            message: error.message 
        });
    }
});

// 3. Cập nhật trạng thái user
app.post('/api/users/:uid/toggle-status', authenticateToken, async (req, res) => {
    try {
        const { uid } = req.params;
        const { disabled } = req.body;

        // Không cho phép vô hiệu hóa tài khoản admin
        const userRecord = await admin.auth().getUser(uid);
        if (userRecord.email === 'admin@gmail.com' && disabled) {
            return res.status(403).json({ 
                error: 'Không thể vô hiệu hóa tài khoản admin' 
            });
        }

        await admin.auth().updateUser(uid, { disabled });
        
        res.json({
            message: `Đã ${disabled ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản`,
            uid
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ 
            error: 'Không thể cập nhật trạng thái người dùng',
            message: error.message 
        });
    }
});

// 4. Xóa user
app.delete('/api/users/:uid', authenticateToken, async (req, res) => {
    try {
        const { uid } = req.params;
        
        // Kiểm tra không cho xóa tài khoản admin
        const userRecord = await admin.auth().getUser(uid);
        if (userRecord.email === 'admin@gmail.com') {
            return res.status(403).json({ 
                error: 'Không thể xóa tài khoản admin' 
            });
        }

        await admin.auth().deleteUser(uid);
        res.json({
            message: 'Đã xóa người dùng thành công',
            uid
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            error: 'Không thể xóa người dùng',
            message: error.message 
        });
    }
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
}); 