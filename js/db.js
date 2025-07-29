// Nama database dan object store
const DB_NAME = 'AIPhotoboothDB';
const STORE_NAME = 'generatedImages';
let db;

/**
 * Membuka koneksi ke database IndexedDB.
 * @returns {Promise<IDBDatabase>} Promise yang resolve dengan objek database.
 */
function openDB() {
    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(db);
        }

        const request = indexedDB.open(DB_NAME, 1);

        request.onerror = (event) => {
            console.error("Database error:", event.target.error);
            reject("Error opening database");
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        // Dijalankan jika database perlu dibuat atau di-upgrade versinya
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Buat object store (seperti tabel di SQL) untuk menyimpan gambar
            // Pastikan 'id' adalah keyPath dan autoIncrement
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

/**
 * Menyimpan sebuah gambar (dalam format Blob) ke IndexedDB.
 * @param {Blob} imageBlob - Blob dari gambar yang akan disimpan.
 * @returns {Promise<number>} Promise yang resolve dengan ID dari item yang baru disimpan.
 */
export async function saveImage(imageBlob) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        // Mulai transaksi dengan mode readwrite
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Simpan objek yang berisi blob gambar
        const request = store.add({ image: imageBlob, timestamp: new Date() });

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject("Error saving image: " + event.target.error);
    });
}

/**
 * [BARU] Memperbarui gambar yang ada di IndexedDB berdasarkan ID-nya.
 * @param {number} id - ID dari gambar yang akan diperbarui.
 * @param {Blob} imageBlob - Blob dari gambar baru.
 * @returns {Promise<number>} Promise yang resolve dengan ID dari item yang diperbarui.
 */
export async function updateImage(id, imageBlob) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Gunakan .put() untuk memperbarui record yang ada.
        // .put() akan menimpa record jika key (id) sudah ada.
        const request = store.put({ id: id, image: imageBlob, timestamp: new Date() });

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject("Error updating image: " + event.target.error);
    });
}


/**
 * Mengambil semua gambar dari IndexedDB.
 * @returns {Promise<Array<{id: number, image: Blob}>>} Promise yang resolve dengan array objek gambar.
 */
export async function getAllImages() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject("Error fetching images: " + event.target.error);
    });
}

/**
 * Membersihkan semua gambar dari object store.
 * @returns {Promise<void>}
 */
export async function clearImages() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject("Error clearing images: " + event.target.error);
    });
}
