window.database = firebase.database();
const storage = firebase.storage();


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
                            <h2>Hình Ảnh</h2>
                            <div id="entryImageContainer" style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #f4f4f4;">
                                <img src="https://www.circuitdigest.cloud/static/V5mg4zAvZdy3.jpeg" alt="Hình Ảnh Vào" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h2>Video Camera</h2>
                            <div id="exitImageContainer" style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden; ">
                                <iframe src="http://192.168.244.18/" style="width: 100%; height: 100%; border: none;"></iframe>
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
                                <td id="idCard">N/A</td>
                                <td id="numberPlate">N/A</td>
                                <td id="numberPlateOut">N/A</td>
                                <td id="timeIn">N/A</td>
                                <td id="timeout">N/A</td>
                                <td id="payment">N/A</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                     <button id="openBarrierButton" class="btn btn-primary mt-3">Mở Barie</button>
                </div>
            `;
            addBarrierEventListener();
            fetchParkingData();
            getImagesFromFolder("INTPUT/", "in");
            getImagesFromFolder("OUTPUT/", "out");
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
                            <tbody id="historyTableBody">
                            </tbody>
                        </table>
                    </div>
            `;
            loadHistory();
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
                requestNotification(title, body);
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
async function loadHistory() {
    const historyRef = database.ref("history");
    try {
        const snapshot =  await historyRef.once("value");
        // await historyRef.once("value");
        if (snapshot.exists()) {
            const data = snapshot.val();
            const tableBody = document.getElementById("historyTableBody");

            tableBody.innerHTML = ""; // Xóa dữ liệu cũ trước khi render mới

            Object.keys(data).forEach((timestamp) => {
                const item = data[timestamp]; // Lấy trực tiếp thông tin của timestamp

                const row = `
                    <tr>
                        <td>${item.icCard}</td>
                        <td>${item.numberPlate}</td>
                        <td>${item.time_in}</td>
                        <td>${item.time_out}</td>
                        <td>${item.money}</td>
                        <td>${item.type}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            console.log("Không có dữ liệu trong history.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
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
function updateHistoryWithExit(numberPlate, timeOut, money) {
    database.ref("history")
        .orderByChild("numberPlate")
        .equalTo(numberPlate)
        .once("value", (snapshot) => {
            if (snapshot.exists()) {
                let latestKey = null;
                let latestTime = 0;

                snapshot.forEach((childSnapshot) => {
                    const entry = childSnapshot.val();
                    const entryTime = parseInt(childSnapshot.key, 10); // Timestamp key của bản ghi

                    if (!isNaN(entryTime) && entryTime > latestTime) {
                        latestTime = entryTime;
                        latestKey = childSnapshot.key;
                    }
                });

                if (latestKey) {
                    database.ref(`history/${latestKey}`).update({
                        time_out: timeOut,
                        money: money
                    }).then(() => {
                        console.log(`Cập nhật thành công: ${latestKey} - time_out = ${timeOut}, money = ${money}`);
                    }).catch((error) => {
                        console.error("Lỗi khi cập nhật lịch sử:", error);
                    });
                } else {
                    console.log("Không tìm thấy lịch sử phù hợp.");
                }
            } else {
                console.log(`Không có lịch sử nào trùng với biển số xe: ${numberPlate}`);
            }
        });
}

function pushHistory(data1, data2, data3, data4, data5, data6) {
    const datetimeNow = Math.floor(new Date().getTime() / 1000);// Lấy timestamp đến mili giây
    const idCard =  database.ref(`history/${datetimeNow}/icCard`);
    const numberPlate =  database.ref(`history/${datetimeNow}/numberPlate`);
    const timeIn =  database.ref(`history/${datetimeNow}/time_in`);
    const timeout =  database.ref( `history/${datetimeNow}/time_out`);
    const payment =  database.ref( `history/${datetimeNow}/money`);
    const type =  database.ref(`history/${datetimeNow}/type`);
    idCard.set(data1)
      .then(() => {
        console.log("Dữ liệu đã được đẩy lên Firebase thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đẩy dữ liệu:", error);
      });
    numberPlate.set(data2)
      .then(() => {
        console.log("Dữ liệu đã được đẩy lên Firebase thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đẩy dữ liệu:", error);
      });
    timeIn.set(data3)
      .then(() => {
        console.log("Dữ liệu đã được đẩy lên Firebase thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đẩy dữ liệu:", error);
      });
    timeout.set(data4)
      .then(() => {
        console.log("Dữ liệu đã được đẩy lên Firebase thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đẩy dữ liệu:", error);
      }); 
    payment.set(data5)
      .then(() => {
        console.log("Dữ liệu đã được đẩy lên Firebase thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đẩy dữ liệu:", error);
      }); 
      type.set(data6)
      .then(() => {
        console.log("Dữ liệu đã được đẩy lên Firebase thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đẩy dữ liệu:", error);
      });
}
async function checkIfKeyExists(checkKey) {
    const dbRef = database.ref("history");
    try {
        const snapshot = await dbRef.child("parking/checklist/Monthly").get();
        if (snapshot.exists()) {
            const data = snapshot.val();
            return data.hasOwnProperty(checkKey);
        } else {
            return false;
        }
    } catch (error) {
        console.error("Lỗi khi kiểm tra key:", error);
        return false;
    }
}

function fetchParkingData() {
    const idCardElement = document.getElementById("idCard");
    const timeInElement = document.getElementById("timeIn");
    const timeoutElement = document.getElementById("timeout");
    const numberPlateElement = document.getElementById("numberPlate");
    const numberPlateElementOut = document.getElementById("numberPlateOut");
    const paymentElement = document.getElementById("payment");
    // Lắng nghe thay đổi real-time của `status`
    database.ref("parking/rfid_realtime/status").on("value", (snapshot) => {
        const status = snapshot.val();
    
        // Kiểm tra giá trị check trước khi xử lý
        database.ref("parking/rfid_realtime/checked").once("value", (checkSnapshot) => {
            const check = checkSnapshot.val();
    
            if (check === true) {
                if (status === "IN") {
                    // Cập nhật dữ liệu khi xe vào
                    database.ref("parking/rfid_realtime/idCard").once("value", (snapshot) => {
                        idCardElement.innerText = snapshot.val() || "N/A";
                    });
    
                    database.ref("parking/rfid_realtime/time_in").once("value", (snapshot) => {
                        timeInElement.innerText = snapshot.val() || "N/A";
                    });
    
                    database.ref("parking/rfid_realtime/numberPlate").once("value", (snapshot) => {
                        numberPlateElement.innerText = snapshot.val() || "N/A";
                    });
    
                    let type = "Vãng lai";
                    checkIfKeyExists(idCardElement.innerText).then((exists) => {
                        if (exists) {
                            type = "Thành viên";
                            console.log(`Key "${idCardElement.innerText}" tồn tại trong database.`);
                        } else {
                            type = "Vãng lai";
                            console.log(`Key "${idCardElement.innerText}" KHÔNG tồn tại trong database.`);
                        }
    
                        // Đẩy lịch sử vào database
                        pushHistory(idCardElement.innerText, numberPlateElement.innerText, timeInElement.innerText, "0", "0", type);
                    });
                } else if (status === "OUT") {
                    // Cập nhật dữ liệu khi xe ra
                    database.ref("parking/rfid_realtime/idCard").once("value", (snapshot) => {
                        idCardElement.innerText = snapshot.val() || "N/A";
                    });
    
                    // database.ref("parking/rfid_realtime/time_in").once("value", (snapshot) => {
                    //     timeInElement.innerText = snapshot.val() || "N/A";
                    // });
    
                    database.ref("parking/rfid_realtime/time_out").once("value", (snapshot) => {
                        timeoutElement.innerText = snapshot.val() || "N/A";
                    });
                    
                    database.ref("parking/rfid_realtime/numberPlate").once("value", (snapshot) => {
                        const plate = snapshot.val() || "N/A";
                        numberPlateElement.innerText = plate;
                        numberPlateElementOut.innerText = plate;
                    
                        const money = calculateParkingFee(timeoutElement.innerText);
                        paymentElement.innerText = money;
                    
                        // Tìm lịch sử cuối cùng có biển số trùng
                        findLatestHistoryByPlate(plate).then((history) => {
                            if (!history) {
                                console.error("Không tìm thấy lịch sử vào cho biển số:", plate);
                                return;
                            }
                            var historyId = history.id;
                            database.ref("parking/history/historyId/numberPlate").once("value", (snapshot) => {
                                const numberPlate = snapshot.val() || "N/A";
                                timeInElement.innerText = history.time_in;
                                updateHistoryWithExit(numberPlate, timeoutElement.innerText, money);
                            });
                        });
                    });
                }
            }
        });
    });
    
}
function findLatestHistoryByPlate(numberPlate) {
    return database.ref("history")
        .orderByChild("numberPlate")
        .equalTo(numberPlate)
        .once("value")
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.log("Không tìm thấy lịch sử cho biển số:", numberPlate);
                return null;
            }

            let latestEntry = null;
            let latestKey = null;
            let latestTime = 0;

            snapshot.forEach((childSnapshot) => {
                const entry = childSnapshot.val();
                const entryTime = parseInt(childSnapshot.key, 10); // Key là timestamp

                if (!isNaN(entryTime) && entryTime > latestTime) {
                    latestTime = entryTime;
                    latestKey = childSnapshot.key;
                    latestEntry = entry;
                }
            });

            if (latestEntry && latestKey) {
                return { id: latestKey, ...latestEntry };
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Lỗi khi truy vấn lịch sử:", error);
            return null;
        });
}

function parseDate(timeString) {
    // Chuyển "15-02-2025 02:08:14" → "2025-02-15T02:08:14"
    const parts = timeString.split(" ");
    const dateParts = parts[0].split("-").reverse().join("-");
    return new Date(`${dateParts}T${parts[1]}`);
}
function calculateParkingFee(timeOut) {
    if (!timeOut) {
        console.error("Thiếu dữ liệu timeOut");
        return 0;
    }

    const outTime = parseDate(timeOut);; // Chuyển đổi thành đối tượng Date
    if (isNaN(outTime.getTime())) {
        console.error("Lỗi khi chuyển đổi timeOut:", timeOut);
        return 0;
    }

    // Lấy giờ của thời gian out
    const hour = outTime.getHours();

    // So sánh với 18h
    return hour < 18 ? 3000 : 5000;
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
async function requestNotification(title, body) {
    const tokens = "cRgCOIlORois6-tTQS7iD9:APA91bGczgs17YaXK-T-TqA-PLXPNKgq9t5s8VYgxYRHhKYHH0xd7CLMom5XtbGTNNmW0zb_KoVgTHsCA_VDutB3dnmpqAN4InoIdufKzgLrTdVjxxjkZhc";

    try {
        const response = await fetch('/api/send-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tokens, title, body })
        });

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu thông báo:', error);
    }
}

// Gọi hàm requestNotification khi cần


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
  function getImagesFromFolder(folderName, path) {
    const folderRef = storage.ref(folderName);
    const imageContainer = document.getElementById(path);
  
    // Fetch the image name from the database
    const nameImagePromise = new Promise((resolve, reject) => {
      database.ref("parking/rfid_realtime/idCard").on(
        "value",
        (snapshot) => {
          if (snapshot.exists()) {
            resolve(JSON.stringify(snapshot.val()));
          } else {
            reject("No data available");
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  
    // Resolve the promise to get the image name
    nameImagePromise
      .then((nameImage) => {
        folderRef
          .listAll()
          .then((res) => {
            // console.log(JSON.stringify(res));
            res.items.forEach((itemRef) => {
              console.log(itemRef.name);
              console.log(nameImage.replace(/^"(.*)"$/, "$1"));
              console.log(itemRef.name === nameImage.replace(/^"(.*)"$/, "$1"));
              if (itemRef.name === nameImage.replace(/^"(.*)"$/, "$1")) {
                itemRef
                  .getDownloadURL()
                  .then((url) => {
                    const img = document.createElement("img");
                    img.src = url;
                    img.alt = nameImage;
  
                    img.className = "storage-image";
                    imageContainer.appendChild(img);
                  })
                  .catch((error) => {
                    console.error("Lỗi khi lấy URL download:", error);
                  });
              }
            });
          })
          .catch((error) => {
            console.log("Lỗi khi liệt kê ảnh:", error);
          });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  
//   // Gọi hàm để lấy ảnh từ hai thư mục
  getImagesFromFolder("INTPUT/", "in");
  getImagesFromFolder("OUTPUT/", "out");