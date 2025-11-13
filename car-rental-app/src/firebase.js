import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
// These values are loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Auth helper functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// ==================== CAR LISTING FUNCTIONS ====================

/**
 * Yeni araç ilanı oluştur
 * @param {Object} listingData - Araç ilanı verileri
 * @param {string} userId - Kullanıcı ID'si
 * @returns {Promise<string>} - Oluşturulan ilanın ID'si
 */
export const createCarListing = async (listingData, userId) => {
  try {
    const carListingsRef = collection(db, 'carListings');
    const docRef = await addDoc(carListingsRef, {
      ...listingData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'pending', // pending, approved, rejected
      views: 0,
      bookings: 0
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating car listing:', error);
    throw error;
  }
};

/**
 * Araç ilanını güncelle
 * @param {string} listingId - İlan ID'si
 * @param {Object} updateData - Güncellenecek veriler
 */
export const updateCarListing = async (listingId, updateData) => {
  try {
    const listingRef = doc(db, 'carListings', listingId);
    await updateDoc(listingRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating car listing:', error);
    throw error;
  }
};

/**
 * Araç ilanını sil
 * @param {string} listingId - İlan ID'si
 */
export const deleteCarListing = async (listingId) => {
  try {
    const listingRef = doc(db, 'carListings', listingId);
    await deleteDoc(listingRef);
  } catch (error) {
    console.error('Error deleting car listing:', error);
    throw error;
  }
};

/**
 * Tek bir araç ilanını getir
 * @param {string} listingId - İlan ID'si
 * @returns {Promise<Object>} - İlan verisi
 */
export const getCarListing = async (listingId) => {
  try {
    const listingRef = doc(db, 'carListings', listingId);
    const docSnap = await getDoc(listingRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('İlan bulunamadı');
    }
  } catch (error) {
    console.error('Error getting car listing:', error);
    throw error;
  }
};

/**
 * Tüm araç ilanlarını getir
 * @returns {Promise<Array>} - İlan listesi
 */
export const getAllCarListings = async () => {
  try {
    const carListingsRef = collection(db, 'carListings');
    const q = query(carListingsRef, where('status', '==', 'approved'));
    const querySnapshot = await getDocs(q);

    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });

    return listings;
  } catch (error) {
    console.error('Error getting car listings:', error);
    throw error;
  }
};

/**
 * Kullanıcının araç ilanlarını getir
 * @param {string} userId - Kullanıcı ID'si
 * @returns {Promise<Array>} - İlan listesi
 */
export const getUserCarListings = async (userId) => {
  try {
    const carListingsRef = collection(db, 'carListings');
    const q = query(carListingsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });

    return listings;
  } catch (error) {
    console.error('Error getting user car listings:', error);
    throw error;
  }
};

// ==================== FILE UPLOAD FUNCTIONS ====================

/**
 * Dosya yükle (resim, belge vb.)
 * @param {File} file - Yüklenecek dosya
 * @param {string} path - Storage'da kaydedilecek yol (örn: 'carPhotos/userId/fileName')
 * @returns {Promise<string>} - Dosyanın indirme URL'si
 */
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Birden fazla dosya yükle
 * @param {FileList|Array} files - Yüklenecek dosyalar
 * @param {string} basePath - Storage'da kaydedilecek temel yol
 * @returns {Promise<Array<string>>} - Dosyaların indirme URL'leri
 */
export const uploadMultipleFiles = async (files, basePath) => {
  try {
    const uploadPromises = Array.from(files).map((file, index) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${index}_${file.name}`;
      const path = `${basePath}/${fileName}`;
      return uploadFile(file, path);
    });

    const downloadURLs = await Promise.all(uploadPromises);
    return downloadURLs;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw error;
  }
};

export default app;
