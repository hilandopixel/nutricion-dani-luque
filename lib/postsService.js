import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit as limitTo, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

const POSTS_COLLECTION = 'posts';

// 1. Obtener todas las entradas para la vista /blog
export async function getAllPosts() {
	console.log('call')
  try {
    // Intenta ordenar por fecha
    const q = query(collection(db, POSTS_COLLECTION), orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
	console.log(querySnapshot)
    return querySnapshot.docs.map(doc => parsePostDoc(doc));
  } catch (error) {
    console.warn('Fallo al ordenar por fecha, obteniendo sin orden:', error);
    // Respaldos sin ordenación si falta el campo o el índice de Firebase
    const querySnapshot = await getDocs(collection(db, POSTS_COLLECTION));
    return querySnapshot.docs.map(doc => parsePostDoc(doc));
  }
}

function parsePostDoc(doc) {
  const data = doc.data();
  let dateStr = 'Sin fecha';
  console.log('doc.id')
  if (data.fecha?.toDate) {
    dateStr = data.fecha.toDate().toISOString().split('T')[0];
  } else if (typeof data.fecha === 'string') {
    dateStr = data.createdAt;
  }

	const language = 'ES';

  return {
    id: doc.id,
    title: data.titulo || 'Sin título',
    slug: data.slug || doc.id,
    excerpt: data.excerpt || '',
    content: data.content || '',
    createdAt: dateStr
  };
}

// 2. Obtener las últimas N entradas para el carrusel del Inicio
export async function getLatestPosts(limitCount = 10) {
  const q = query(
    collection(db, POSTS_COLLECTION), 
    orderBy('createdAt', 'desc'), 
    limitTo(limitCount)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate()?.toISOString().split('T')[0] || ''
  }));
}

// 3. Obtener el detalle de una entrada filtrando por el campo 'slug'
export async function getPostBySlug(slug) {
  const q = query(collection(db, POSTS_COLLECTION), where('slug', '==', slug), limitTo(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  
  const docData = querySnapshot.docs[0];
  return {
    id: docData.id,
    ...docData.data(),
    createdAt: docData.data().createdAt?.toDate()?.toISOString().split('T')[0] || ''
  };
}

// 4. Crear nueva entrada desde el Panel de Admin
export async function createPost(postData) {
  return await addDoc(collection(db, POSTS_COLLECTION), {
    title: postData.title,
    slug: postData.slug,
    excerpt: postData.excerpt,
    content: postData.content,
    createdAt: serverTimestamp()
  });
}

// 5. Editar entrada existente
export async function updatePost(id, updatedData) {
  const postRef = doc(db, POSTS_COLLECTION, id);
  return await updateDoc(postRef, {
    title: updatedData.title,
    slug: updatedData.slug,
    excerpt: updatedData.excerpt,
    content: updatedData.content
  });
}

// 6. Eliminar entrada por ID de documento
export async function deletePost(id) {
  const postRef = doc(db, POSTS_COLLECTION, id);
  return await deleteDoc(postRef);
}