import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { PropsWithChildren } from "react";
import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from "reactfire";

// must be child of FirebaseAppProvider
export default function FirebaseProviders({ children }: PropsWithChildren) {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={db}>
        <StorageProvider sdk={storage}>
          {children}
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  )
}