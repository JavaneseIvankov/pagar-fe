export interface PersistedDraftEnvelope<TData> {
  data: TData;
  updatedAt: string;
  version: number;
}

export interface DraftStorage<TData> {
  clear: () => Promise<void>;
  load: () => Promise<TData | null>;
  save: (data: TData) => Promise<void>;
}
