async function checkIfKeyExists(checkKey) {
    const dbRef = ref(database);
    // database.ref("history");
    try {
        const snapshot = await get(child(dbRef, "parking/checklist/Monthly"));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return data.hasOwnProperty(checkKey); // Kiểm tra key có tồn tại không
        } else {
            return false; // Nhánh Monthly không tồn tại
        }
    } catch (error) {
        console.error("Lỗi khi kiểm tra key:", error);
        return false;
    }
}