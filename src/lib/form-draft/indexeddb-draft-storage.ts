import type { DraftStorage } from "@/lib/form-draft/types";

const DEFAULT_DB_NAME = "pagar-form-drafts";
const DEFAULT_STORE_NAME = "drafts";
const DB_VERSION = 1;

interface DraftRecord<TData> {
  id: string;
  value: TData;
}

interface IndexedDbDraftStorageOptions {
  dbName?: string;
  key: string;
  storeName?: string;
}

function isIndexedDbAvailable() {
  return typeof window !== "undefined" && "indexedDB" in window;
}

function openDatabase(dbName: string, storeName: string) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(dbName, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to open IndexedDB"));
  });
}

function withStore<TResult>(
  database: IDBDatabase,
  storeName: string,
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore) => IDBRequest<TResult>,
) {
  return new Promise<TResult>((resolve, reject) => {
    const transaction = database.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = handler(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("IndexedDB request failed"));
  });
}

export function createIndexedDbDraftStorage<TData>({
  dbName = DEFAULT_DB_NAME,
  key,
  storeName = DEFAULT_STORE_NAME,
}: IndexedDbDraftStorageOptions): DraftStorage<TData> {
  async function getDatabase(): Promise<IDBDatabase | null> {
    if (!isIndexedDbAvailable()) {
      return null;
    }

    return openDatabase(dbName, storeName);
  }

  return {
    async clear() {
      const database = await getDatabase();

      if (!database) {
        return;
      }

      await withStore(database, storeName, "readwrite", (store) =>
        store.delete(key),
      );
      database.close();
    },

    async load() {
      const database = await getDatabase();

      if (!database) {
        return null;
      }

      const record = await withStore<DraftRecord<TData> | undefined>(
        database,
        storeName,
        "readonly",
        (store) => store.get(key),
      );
      database.close();

      return record?.value ?? null;
    },

    async save(data) {
      const database = await getDatabase();

      if (!database) {
        return;
      }

      await withStore(database, storeName, "readwrite", (store) =>
        store.put({
          id: key,
          value: data,
        } satisfies DraftRecord<TData>),
      );
      database.close();
    },
  };
}
