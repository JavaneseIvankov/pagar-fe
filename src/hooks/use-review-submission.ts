"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchCurrentReviewSubmissionContext,
  submitCurrentRoleReview,
} from "@/rpc";

export function useCurrentReviewSubmissionContext() {
  return useQuery({
    queryKey: queryKeys.reviewSubmission.context(),
    queryFn: fetchCurrentReviewSubmissionContext,
  });
}

export function useSubmitCurrentRoleReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => submitCurrentRoleReview(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.publicReviews.list(),
      });
    },
  });
}
