import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  DocumentData,
  serverTimestamp,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './config';

// Generic CRUD operations

// Create document with auto ID
export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> => {
  const docRef = doc(collection(db, collectionName));
  await setDoc(docRef, {
    ...data,
    id: docRef.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

// Create document with custom ID
export const createDocumentWithId = async <T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> => {
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    id: docId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Get single document
export const getDocument = async <T>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
};

// Get all documents in collection
export const getCollection = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as T);
};

// Update document
export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Delete document
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  await deleteDoc(doc(db, collectionName, docId));
};

// Real-time listener for single document
export const subscribeToDocument = <T>(
  collectionName: string,
  docId: string,
  callback: (data: T | null) => void
): Unsubscribe => {
  const docRef = doc(db, collectionName, docId);
  return onSnapshot(docRef, (docSnap) => {
    callback(docSnap.exists() ? (docSnap.data() as T) : null);
  });
};

// Real-time listener for collection
export const subscribeToCollection = <T>(
  collectionName: string,
  callback: (data: T[]) => void,
  constraints: QueryConstraint[] = []
): Unsubscribe => {
  const q = query(collection(db, collectionName), ...constraints);
  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data() as T);
    callback(data);
  });
};

// Paginated query helper
export const getPaginatedCollection = async <T>(
  collectionName: string,
  pageSize: number,
  lastDoc?: DocumentData,
  constraints: QueryConstraint[] = []
): Promise<{ data: T[]; lastDoc: DocumentData | null }> => {
  const baseConstraints = [...constraints, limit(pageSize)];
  
  if (lastDoc) {
    baseConstraints.push(startAfter(lastDoc));
  }
  
  const q = query(collection(db, collectionName), ...baseConstraints);
  const querySnapshot = await getDocs(q);
  
  const data = querySnapshot.docs.map((doc) => doc.data() as T);
  const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
  
  return { data, lastDoc: newLastDoc };
};

// Export Firestore query helpers
export { where, orderBy, limit, startAfter, collection, doc, query };
