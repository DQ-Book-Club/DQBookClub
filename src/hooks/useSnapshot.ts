import { DocumentReference, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useSnapshot<T extends { id: string }>(reference: DocumentReference<T>): T | undefined
export function useSnapshot<T extends { id: string }>(reference: Query<T>): T[] | undefined
export function useSnapshot<T extends { id: string }>(reference: Query<T> | DocumentReference<T>): T | T[] | undefined {
  const [document, setDocument] = useState<T[] | T | undefined>()

  useEffect(() => {
    if (reference instanceof Query) {
      return onSnapshot(reference, (snapshot) => {
        setDocument(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      })
    } else {
      return onSnapshot(reference, (doc) => {
        setDocument({ ...doc.data(), id: doc.id } as T)
      })
    }
  }, [])

  return document
}