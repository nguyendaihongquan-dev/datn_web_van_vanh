
window.database = firebase.database();
const messaging = firebase.messaging();

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
            
        case 'parking':
            mainContent.innerHTML = `
               <h3>Chỗ trống: <span id="available-count">0</span></h3>
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
            updateParkingSlots();
            countAvailableSlots();
            break;
            
        case 'home':
            mainContent.innerHTML = `
                <div class="container">
                    <h1>Quản Lý Ra Vào Bãi Đỗ Xe</h1>
                    <div class="row">
                        <div class="col-md-6">
                            <h2>Hình Ảnh Vào</h2>
                            <div id="entryImageContainer">
                            <iframe src="http://172.20.10.14/" width="100%" height="600px" style="border: none;"></iframe>  
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h2>Hình Ảnh Ra</h2>
                            <div id="exitImageContainer">
                                <img src="./assets/images/car.jpg" alt="Hình Ảnh Ra" class="img-fluid">
                            </div>
                        </div>
                    </div>
                    <div class="info-panel mt-4">
                        <h2>Thông Tin Xe</h2>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Mã thẻ</th>
                                    <th>Biển xe vào</th>
                                    <th>Biển xe ra</th>
                                    <th>Thời Gian Vào</th>
                                    <th>Thời Gian Ra</th> 
                                    <th>Thanh toán</th>
                                </tr>
                            </thead>
                            <tbody id="vehicleInfoTableBody">
                            <tr>
                              <td>KJHSGDHSG</td>
                                <td>18A123456</td>
                                <td>18A123456</td>
                                <td>08:00 27/10/2024 AM</td>
                                <td>10:00 27/10/2024 AM</td>
                                <td>20.000 VNĐ</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                     <button id="openBarrierButton" class="btn btn-primary mt-3">Mở Barie</button>
                </div>
            `;
            addBarrierEventListener();
            break;
            
        case 'ticket':
            mainContent.innerHTML = `
                 <div class="info-panel mt-4">
                        <h2>Lịch sử</h2>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Mã thẻ</th>
                                    <th>Biển xe</th>                                 
                                    <th>Thời Gian Vào</th>
                                    <th>Thời Gian Ra</th> 
                                    <th>Thanh toán</th>
                                    <th>Loại khách</th>
                                </tr>
                            </thead>
                            <tbody id="vehicleInfoTableBody">
                            <tr>
                              <td>123456</td>
                                <td>18A123456</td>  
                                <td>27/10/2024 08:00 </td>
                                <td>27/10/2024 10:00 </td>
                                <td>20.000 VNĐ</td>
                                <td>Thành viên</td>
                            </tr>
                            <tr>
                              <td>KJHSGDHSG</td>
                                <td>29A123456</td>  
                                <td>27/10/2024 08:00 </td>
                                <td>27/10/2024 10:00 </td>
                                <td>20.000 VNĐ</td>
                                 <td>Thành viên</td>
                            </tr>
                            <tr>
                              <td>KJHSGDHSG</td>
                                <td>17A123456</td>  
                                <td>27/10/2024 08:00 </td>
                                <td>27/10/2024 10:00 </td>
                                <td>20.000 VNĐ</td>
                                <td>Vãng lai</td>
                            </tr>
                            <tr>
                              <td>KJHSGDHSG</td>
                                <td>13A123456</td>  
                                <td>27/10/2024 08:00 </td>
                                <td>27/10/2024 10:00 </td>
                                <td>20.000 VNĐ</td>
                                <td>Vãng lai</td>
                            </tr>
                        </tbody>
                        </table>
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
            
        case 'alert':
            mainContent.innerHTML = `
                <div class="container mt-5">
                    <h2>Gửi Thông Báo</h2>
                    <form id="notificationForm">
                        <div class="form-group">
                            <label for="contentTitle">Tiêu đề thông báo</label>
                            <input type="text" class="form-control" id="contentTitle" placeholder="Nhập tiêu đề thông báo" required>
                        </div>
                        <div class="form-group mt-3">
                            <label for="contentBody">Nội dung thông báo</label>
                            <textarea class="form-control" id="contentBody" placeholder="Nhập nội dung thông báo" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">Gửi</button>
                    </form>
                </div>
            `;
            document.getElementById('notificationForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const title = document.getElementById('contentTitle').value;
                const body = document.getElementById('contentBody').value;
                sendNotification(title, body);
            });
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
function countAvailableSlots() {
    let totalSlots = 24;
    let availableCount = 0;

    for (let i = 1; i <= totalSlots; i++) {
        let irSensorRef = database.ref(`parking/parkingLot/slots/slot${i}/irSensor`);
        let datchoRef = database.ref(`parking/parkingLot/slots/slot${i}/datcho`);

        Promise.all([
            irSensorRef.once("value"),
            datchoRef.once("value")
        ]).then(([irSnapshot, datchoSnapshot]) => {
            let irSensor = irSnapshot.val() || false;
            let datcho = datchoSnapshot.val() || false;
            let isOccupied = irSensor || datcho; // Chỉ cần 1 trong 2 là true thì "Kín"

            let spaceElement = document.getElementById(`space-${i}`);
            if (spaceElement) {
                let statusBadge = spaceElement.querySelector(".status-badge");
                if (isOccupied) {
                    statusBadge.textContent = "Kín";
                    statusBadge.classList.remove("available");
                    statusBadge.classList.add("occupied");
                } else {
                    availableCount++;
                    statusBadge.textContent = "Trống";
                    statusBadge.classList.remove("occupied");
                    statusBadge.classList.add("available");
                }
            }

            // **Cập nhật UI sau khi kiểm tra tất cả slots**
            if (i === totalSlots) {
                document.getElementById("available-count").textContent = availableCount + " / " + totalSlots;
            }
        });
    }
}

// **Hàm cập nhật slots theo thời gian thực**
function updateParkingSlots() {
    let totalSlots = 24;
    let availableCount = 0;

    for (let i = 1; i <= totalSlots; i++) {
        let irSensorRef = database.ref(`parking/parkingLot/slots/slot${i}/irSensor`);
        let datchoRef = database.ref(`parking/parkingLot/slots/slot${i}/datcho`);

        irSensorRef.on("value", (irSnapshot) => {
            datchoRef.on("value", (datchoSnapshot) => {
                let irSensor = irSnapshot.val() || false;
                let datcho = datchoSnapshot.val() || false;
                let isOccupied = irSensor || datcho; // Chỉ cần 1 trong 2 là true thì "Kín"

                let spaceElement = document.getElementById(`space-${i}`);
                if (spaceElement) {
                    let statusBadge = spaceElement.querySelector(".status-badge");
                    if (isOccupied) {
                        statusBadge.textContent = "Kín";
                        statusBadge.classList.remove("available");
                        statusBadge.classList.add("occupied");
                    } else {
                        statusBadge.textContent = "Trống";
                        statusBadge.classList.remove("occupied");
                        statusBadge.classList.add("available");
                    }
                }

                // **Tính toán lại số chỗ trống**
                updateAvailableCount();
            });
        });
    }
}
async function getAllTokens() {
    try {
        const usersRef = database.ref("users"); // Đường dẫn tới danh sách user

        const snapshot = await usersRef.once("value");

        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const tokens = Object.values(usersData)
                .map(user => user.token)
                .filter(token => token);

            console.log("✅ Danh sách token:", tokens);
            return tokens;
        } else {
            console.log("⚠️ Không tìm thấy dữ liệu trong Realtime Database.");
            return [];
        }
    } catch (error) {
        console.error("🚨 Lỗi khi lấy danh sách token:", error);
        return [];
    }
}
// Hàm gửi thông báo
async function sendNotification(contentTitle, contentBody) {
    try {
        const tokens = await getAllTokens();
        
        if (tokens.length === 0) {
            console.log('Không có token nào để gửi thông báo.');
            return;
        }

        // Create a new notifications reference in the database
        const notificationsRef = database.ref('notifications').push();
        
        // Save notification data
        const notificationData = {
            title: contentTitle,
            body: contentBody,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            tokens: tokens,
            status: 'pending'
        };

        // Save to database
        await notificationsRef.set(notificationData);

        // Update UI to show notification was queued
        console.log('Thông báo đã được lưu và đang chờ xử lý');
        
        // Optional: Show success message to user
        alert('Thông báo đã được gửi thành công!');
        
        // Clear the form
        document.getElementById('notificationForm').reset();

    } catch (error) {
        console.error('Lỗi khi gửi thông báo:', error);
        alert('Có lỗi xảy ra khi gửi thông báo. Vui lòng thử lại sau.');
    }
}
// **Hàm cập nhật số lượng chỗ trống**
function updateAvailableCount() {
    let totalSlots = 24;
    let availableCount = 0;
    let checkedSlots = 0;

    for (let i = 1; i <= totalSlots; i++) {
        let irSensorRef = database.ref(`parking/parkingLot/slots/slot${i}/irSensor`);
        let datchoRef = database.ref(`parking/parkingLot/slots/slot${i}/datcho`);

        Promise.all([
            irSensorRef.once("value"),
            datchoRef.once("value")
        ]).then(([irSnapshot, datchoSnapshot]) => {
            let irSensor = irSnapshot.val() || false;
            let datcho = datchoSnapshot.val() || false;
            let isOccupied = irSensor || datcho;

            if (!isOccupied) {
                availableCount++;
            }

            checkedSlots++;

            if (checkedSlots === totalSlots) {
                document.getElementById("available-count").textContent = availableCount + " / " + totalSlots;
            }
        });
    }
}

// Khởi tạo Firebase
// const database = firebase.database();

function addBarrierEventListener() {
    const openBarrierButton = document.getElementById('openBarrierButton');
    const barrierRef = firebase.database().ref('parking/barrier');

    barrierRef.on('value', (snapshot) => {
        const isBarrierOpen = snapshot.val();
        if (isBarrierOpen) {
            openBarrierButton.textContent = 'Đóng Barie';
        } else {
            openBarrierButton.textContent = 'Mở Barie';
        }
    });
    
    if (openBarrierButton) {
        openBarrierButton.addEventListener('click', () => {
            

            const barrierRef = database.ref('parking/barrier');

            barrierRef.once('value').then((snapshot) => {
                const currentStatus = snapshot.val();
                const newStatus = !currentStatus;

                barrierRef.set(newStatus)
                    .then(() => console.log('Cập nhật trạng thái barie thành công:', newStatus))
                    .catch((error) => console.error('Lỗi cập nhật trạng thái barie:', error));
            }).catch((error) => console.error('Lỗi khi đọc trạng thái barie:', error));
        });
    } else {
        console.error('Không tìm thấy nút mở barie.');
    }
}


// Load trang mặc định khi vừa vào
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home');
    // loadContent('ticket');
    // loadContent('parking');
}); 
// function listenToParkingSlotChanges(id, slot) {
//     const parkingStatusDiv = document.getElementById(id);
//     database.ref(slot).on("value", (snapshot) => {
//       const status = snapshot.val();
//       if (status === 0) {
//         parkingStatusDiv.classList.remove("red");
//         parkingStatusDiv.classList.add("green");
//       } else if (status === 1) {
//         parkingStatusDiv.classList.remove("green");
//         parkingStatusDiv.classList.add("red");
//       }
//     });
//   }
//   function getData(path) {
//     return new Promise((resolve, reject) => {
//       database.ref(path).on(
//         "value",
//         (snapshot) => {
//           if (snapshot.exists()) {
//             return JSON.stringify(snapshot.val());
//           } else {
//             reject("No data available");
//           }
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//     // database.ref(path).on('value', (snapshot) => {
//     //     console.log(JSON.stringify(snapshot.val()).replace("\"", "").replace("\"","").toString());
//     //     return JSON.stringify(snapshot.val()).replace("\"", "").replace("\"","").toString();
//     // })
//   }
  
//   async function retrieveData() {
//     try {
//       const data = await getData("history/uid");
//       console.log("Data inside retrieveData:", data);
//       return data + ".jpg"; // Outputs the data at 'history/uid'
//     } catch (error) {
//       console.error("Error retrieving data:", error);
//     }
//   }
  
//   // const x = retrieveData();
//   // console.log("name: " +JSON.stringify(x));
//   const storage = firebase.storage();
  
//   // const targetImageName = getData()+".jpg";
//   // console.log(targetImageName);
//   // Hàm để lấy danh sách ảnh từ một thư mục
//   function getImagesFromFolder(folderName, path) {
//     const folderRef = storage.ref(folderName);
//     const imageContainer = document.getElementById(path);
  
//     // Fetch the image name from the database
//     const nameImagePromise = new Promise((resolve, reject) => {
//       database.ref("history/uid").on(
//         "value",
//         (snapshot) => {
//           if (snapshot.exists()) {
//             resolve(JSON.stringify(snapshot.val()));
//           } else {
//             reject("No data available");
//           }
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
  
//     // Resolve the promise to get the image name
//     nameImagePromise
//       .then((nameImage) => {
//         folderRef
//           .listAll()
//           .then((res) => {
//             // console.log(JSON.stringify(res));
//             res.items.forEach((itemRef) => {
//               console.log(itemRef.name);
//               console.log(nameImage.replace(/^"(.*)"$/, "$1"));
//               console.log(itemRef.name === nameImage.replace(/^"(.*)"$/, "$1"));
//               if (itemRef.name === nameImage.replace(/^"(.*)"$/, "$1")) {
//                 itemRef
//                   .getDownloadURL()
//                   .then((url) => {
//                     const img = document.createElement("img");
//                     img.src = url;
//                     img.alt = nameImage;
  
//                     img.className = "storage-image";
//                     imageContainer.appendChild(img);
//                   })
//                   .catch((error) => {
//                     console.error("Lỗi khi lấy URL download:", error);
//                   });
//               }
//             });
//           })
//           .catch((error) => {
//             console.log("Lỗi khi liệt kê ảnh:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Lỗi khi lấy dữ liệu:", error);
//       });
//   }
  
//   // Gọi hàm để lấy ảnh từ hai thư mục
//   getImagesFromFolder("input/", "in");
//   getImagesFromFolder("output/", "out");