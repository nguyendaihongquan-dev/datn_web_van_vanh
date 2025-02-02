// Load content function
// const firebaseConfig = {
//     apiKey: "AIzaSyCPdW9jcXHwzFWvY86nGJORllpNDRn35zI",
//     authDomain: "smartparkingsystem-f9fdd.firebaseapp.com",
//     databaseURL: "https://smartparkingsystem-f9fdd-default-rtdb.firebaseio.com",
//     projectId: "smartparkingsystem-f9fdd",
//     storageBucket: "smartparkingsystem-f9fdd.firebasestorage.app",
//     messagingSenderId: "811572822581",
//     appId: "1:811572822581:web:afb9206bd2e1d3a4e3a77c"
//   };
//     firebase.initializeApp(firebaseConfig);
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
                <h5>Số vị trí trống :24</h5>
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
            
        case 'home':
            mainContent.innerHTML = `
                <div class="container">
                    <h1>Quản Lý Ra Vào Bãi Đỗ Xe</h1>
                    <div class="row">
                        <div class="col-md-6">
                            <h2>Hình Ảnh Vào</h2>
                            <div id="entryImageContainer">
                                <img src="./assets/images/car.jpg" alt="Hình Ảnh Vào" class="img-fluid">
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
                    <button class="btn btn-primary mt-3" id="openBarrierButton">Mở Barie</button>
                </div>
            `;
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
            
        case 'parking':
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
    loadContent('ticket');
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