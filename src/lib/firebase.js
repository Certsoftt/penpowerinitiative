import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc, runTransaction, deleteDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

export const firebaseApp = hasFirebaseConfig ? initializeApp(firebaseConfig) : null
export const auth = firebaseApp ? getAuth(firebaseApp) : null
export const db = firebaseApp ? getFirestore(firebaseApp) : null

export const isFirebaseConfigured = Boolean(firebaseApp)

export const initializeFirestoreData = async (initialData) => {
  if (!db || !auth?.currentUser) {
    return { success: false, message: 'Sign in with Firebase before initializing Firestore.' }
  }

  try {
    const entries = [
      ['siteSettings', 'general', initialData.siteSettings],
      ...initialData.pages.map((item) => ['pages', item.slug, item]),
      ...initialData.sections.map((item) => ['sections', item.type, item]),
      ...initialData.blogPosts.map((item) => ['blogPosts', item.id, item]),
      ...initialData.events.map((item) => ['events', item.id, item]),
    ]

    await Promise.all(entries.map(([collectionName, documentId, payload]) => (
      setDoc(doc(db, collectionName, documentId), payload, { merge: true })
    )))

    return { success: true, mode: 'firebase', count: entries.length }
  } catch (error) {
    console.error('Firestore initialization failed:', error)
    const message = error.code === 'permission-denied'
      ? 'Firestore rules are blocking authenticated users. Publish firestore.rules in the Firebase Console.'
      : error.message
    return { success: false, message }
  }
}

export const adminLogin = async (email, password) => {
  if (!auth || !isFirebaseConfigured) {
    return { success: true, mode: 'demo' }
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, mode: 'firebase', user: result.user }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const adminLogout = async () => {
  if (!auth) {
    return true
  }

  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error('Logout failed', error)
    return false
  }
}

export const subscribeToAuth = (callback) => {
  if (!auth) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(auth, callback)
}

export const getAdminProfile = async (user) => {
  if (!db || !user) return { role: 'editor' }

  try {
    const profile = await getDoc(doc(db, 'admins', user.uid))
    return profile.exists() ? profile.data() : { role: 'editor' }
  } catch (error) {
    console.error('Admin profile lookup failed:', error)
    return { role: 'editor' }
  }
}

export const readCollection = async (collectionName) => {
  if (!db) {
    return []
  }

  try {
    const snapshot = await getDocs(collection(db, collectionName))
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
  } catch (error) {
    console.error(`Failed to read ${collectionName}:`, error)
    return []
  }
}

export const saveDocument = async (collectionName, payload, documentId) => {
  if (!db) {
    return { success: true, mode: 'demo' }
  }

  try {
    if (documentId) {
      const documentRef = doc(db, collectionName, documentId)
      await setDoc(documentRef, payload, { merge: true })
      return { success: true, mode: 'firebase' }
    }

    const newDoc = await addDoc(collection(db, collectionName), payload)
    return { success: true, mode: 'firebase', id: newDoc.id }
  } catch (error) {
    console.error('Save failed:', error)
    return { success: false, message: error.message }
  }
}

export const upsertDocument = async (collectionName, payload, documentId) => {
  if (!db) {
    return { success: true, mode: 'demo' }
  }

  try {
    const docRef = doc(db, collectionName, documentId || payload.id || 'generated')
    await setDoc(docRef, payload)
    return { success: true, mode: 'firebase', id: docRef.id }
  } catch (error) {
    console.error('Upsert failed:', error)
    return { success: false, message: error.message }
  }
}

export const removeDocument = async (collectionName, documentId) => {
  if (!db) {
    return { success: true, mode: 'demo' }
  }

  try {
    await deleteDoc(doc(db, collectionName, documentId))
    return { success: true, mode: 'firebase' }
  } catch (error) {
    console.error('Delete failed:', error)
    return { success: false, message: error.message }
  }
}

export const createEventReservation = async (eventId, reservation) => {
  if (!db) {
    return { success: true, mode: 'demo', id: `demo-${Date.now()}` }
  }

  try {
    const reservationId = crypto.randomUUID()
    await runTransaction(db, async (transaction) => {
      const eventRef = doc(db, 'events', eventId)
      const eventSnapshot = await transaction.get(eventRef)
      if (!eventSnapshot.exists()) throw new Error('This event is no longer available.')

      const event = eventSnapshot.data()
      const reservedSeats = Number(event.reservedSeats || 0)
      const capacity = Number(event.capacity || 0)
      if (capacity > 0 && reservedSeats >= capacity) throw new Error('This event is full.')

      transaction.update(eventRef, { reservedSeats: reservedSeats + 1 })
      transaction.set(doc(db, 'eventReservations', reservationId), {
        eventId,
        ...reservation,
        createdAt: new Date().toISOString(),
        status: 'reserved',
      })
    })
    return { success: true, mode: 'firebase', id: reservationId }
  } catch (error) {
    console.error('Reservation failed:', error)
    return { success: false, message: error.message }
  }
}

export const createDonation = async (donation) => {
  if (!db) {
    return { success: true, mode: 'demo', id: `demo-${Date.now()}` }
  }

  try {
    const newDonation = await addDoc(collection(db, 'donations'), {
      ...donation,
      amount: Number(donation.amount),
      currency: donation.currency || 'NGN',
      status: 'pending',
      supporterBadge: false,
      createdAt: new Date().toISOString(),
    })
    return { success: true, mode: 'firebase', id: newDonation.id }
  } catch (error) {
    console.error('Donation creation failed:', error)
    return { success: false, message: error.message }
  }
}

export const recordPageView = async (path) => {
  if (!db) return { success: true, mode: 'demo' }

  try {
    await addDoc(collection(db, 'pageViews'), {
      path,
      createdAt: new Date().toISOString(),
    })
    return { success: true, mode: 'firebase' }
  } catch (error) {
    console.error('Page view recording failed:', error)
    return { success: false, message: error.message }
  }
}
