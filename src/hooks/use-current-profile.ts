"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    },
  });
}

export function useUpdateCurrentSppgProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCurrentSppgProfileInput) =>
      updateCurrentSppgProfile(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile.sppg(),
      });
    },
  });
}

export function useUpdateCurrentAdminProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCurrentAdminProfileInput) =>
      updateCurrentAdminProfile(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile.admin(),
      });
    },
  });
}
