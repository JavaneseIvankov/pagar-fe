"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchCurrentAdminProfile,
  fetchCurrentProfile,
  fetchCurrentSppgProfile,
  type UpdateCurrentAdminProfileInput,
  type UpdateCurrentSchoolProfileInput,
  type UpdateCurrentSppgProfileInput,
  updateCurrentAdminProfile,
  updateCurrentSchoolProfile,
  updateCurrentSppgProfile,
} from "@/rpc";

export function useCurrentProfile() {
  return useQuery({
    queryKey: queryKeys.profile.current(),
    queryFn: fetchCurrentProfile,
  });
}

export function useCurrentSppgProfile() {
  return useQuery({
    queryKey: queryKeys.profile.sppg(),
    queryFn: fetchCurrentSppgProfile,
  });
}

export function useCurrentAdminProfile() {
  return useQuery({
    queryKey: queryKeys.profile.admin(),
    queryFn: fetchCurrentAdminProfile,
  });
}

export function useUpdateCurrentSchoolProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCurrentSchoolProfileInput) =>
      updateCurrentSchoolProfile(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile.current(),
      });
      toast.success("Profil sekolah berhasil diperbarui!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui profil sekolah.",
      );
    },
  });
}

export function useUpdateCurrentSppgProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCurrentSppgProfileInput) =>
      updateCurrentSppgProfile(input),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile.sppg(),
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui profil SPPG.",
      );
    },
  });
}

export function useUpdateCurrentAdminProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCurrentAdminProfileInput) =>
      updateCurrentAdminProfile(input),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile.admin(),
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui profil admin.",
      );
    },
  });
}
