"use client";

import { useEffect, useRef, useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type {
  DraftStorage,
  PersistedDraftEnvelope,
} from "@/lib/form-draft/types";

interface UsePersistedFormDraftOptions<TFormValues extends FieldValues> {
  debounceMs?: number;
  enabled?: boolean;
  form: UseFormReturn<TFormValues>;
  storage: DraftStorage<PersistedDraftEnvelope<TFormValues>>;
  version: number;
}

interface UsePersistedFormDraftResult {
  clearDraft: () => Promise<void>;
  hasDraft: boolean;
  isHydrating: boolean;
}

export function usePersistedFormDraft<TFormValues extends FieldValues>({
  debounceMs = 400,
  enabled = true,
  form,
  storage,
  version,
}: UsePersistedFormDraftOptions<TFormValues>): UsePersistedFormDraftResult {
  const [isHydrating, setIsHydrating] = useState(enabled);
  const [hasDraft, setHasDraft] = useState(false);
  const [isReadyToPersist, setIsReadyToPersist] = useState(!enabled);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setIsHydrating(false);
      setIsReadyToPersist(true);
      return;
    }

    let isMounted = true;

    async function hydrateDraft() {
      try {
        const draft = await storage.load();

        if (!isMounted) {
          return;
        }

        if (draft && draft.version === version) {
          form.reset(draft.data);
          setHasDraft(true);
        } else if (draft) {
          await storage.clear();
        }
      } catch (error) {
        console.error("Failed to hydrate persisted form draft", error);
      } finally {
        if (isMounted) {
          setIsReadyToPersist(true);
          setIsHydrating(false);
        }
      }
    }

    void hydrateDraft();

    return () => {
      isMounted = false;
    };
  }, [enabled, form, storage, version]);

  useEffect(() => {
    if (!enabled || !isReadyToPersist) {
      return;
    }

    const subscription = form.watch(() => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        const nextValues = form.getValues();

        void storage
          .save({
            data: nextValues,
            updatedAt: new Date().toISOString(),
            version,
          })
          .then(() => {
            setHasDraft(true);
          })
          .catch((error) => {
            console.error("Failed to persist form draft", error);
          });
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [debounceMs, enabled, form, isReadyToPersist, storage, version]);

  async function clearDraft() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    await storage.clear();
    setHasDraft(false);
  }

  return {
    clearDraft,
    hasDraft,
    isHydrating,
  };
}
