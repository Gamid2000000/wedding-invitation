import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import type { GuestResponse } from '../components/RsvpModal';

const LOCAL_KEY = 'nazim_yulduz_all_rsvps';
const COLLECTION = 'rsvps';

export const isSharedStoreConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const db = isSharedStoreConfigured ? getFirestore(initializeApp(firebaseConfig)) : null;

const docId = (name: string) => name.trim().toLowerCase().replace(/\//g, '_');

const sortByDate = (list: GuestResponse[]) =>
  [...list].sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));

const readLocal = (): GuestResponse[] => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
};

export async function saveRsvp(response: GuestResponse): Promise<void> {
  if (db) {
    // Firestore rejects undefined fields
    const data = JSON.parse(JSON.stringify(response));
    await setDoc(doc(db, COLLECTION, docId(response.name)), data);
    return;
  }
  const list = readLocal().filter((g) => g.name.toLowerCase() !== response.name.toLowerCase());
  list.push(response);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
}

/** Calls back with the full guest list now and on every change. Returns an unsubscribe function. */
export function subscribeRsvps(
  onChange: (list: GuestResponse[]) => void,
  onError?: () => void,
): () => void {
  if (!db) {
    onChange(sortByDate(readLocal()));
    return () => {};
  }
  return onSnapshot(
    collection(db, COLLECTION),
    (snap) => onChange(sortByDate(snap.docs.map((d) => d.data() as GuestResponse))),
    () => onError?.(),
  );
}
