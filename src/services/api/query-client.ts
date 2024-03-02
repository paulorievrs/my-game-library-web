import axios, { HttpStatusCode } from "axios";
import * as feedback from "../../utils/feedback";

import {
  QueryCache,
  QueryClient,
  MutationMeta,
  MutationCache
} from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000
      }
    },
    queryCache: new QueryCache({
      onError: (err, query) => handleError(err, query.meta)
    }),
    mutationCache: new MutationCache({
      onError: (err, _vars, _ctx, mutation) => handleError(err, mutation.meta),
      onSuccess: (_data, _vars, _ctx, mutation) => {
        const feedbackSuccessFn = feedback.success;

        if (mutation.meta?.successMessage) {
          feedbackSuccessFn(mutation.meta.successMessage);
        }

        if (mutation.meta?.redirectTo) {
          window.location.href = mutation.meta.redirectTo;
        }
      }
    })
  });
}

function handleError(error: Error, meta?: MutationMeta) {
  const feedbackErrorFn = feedback.error;

  if (!axios.isAxiosError(error)) {
    return feedbackErrorFn(`An error occured: ${error.message}`);
  }
  const errorCode = error.response?.status;
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    const errorMessage = meta?.errorMessages?.[errorCode as number];
    if (errorMessage) {
      feedbackErrorFn(errorMessage ?? "Please, login again");
    }
    signOut();
  }

  if (error.response && !meta?.skipError) {
    const errorCode = error.response.status;
    let errorMessage =
      meta?.errorMessages?.[errorCode] ??
      meta?.errorMessages?.default ??
      `An error occurred: ${error.message}`;

    if (error?.response?.data?.message) {
      if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      } else if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((message: string) =>
          feedbackErrorFn(message)
        );
        return;
      }
    }

    return feedbackErrorFn(errorMessage);
  }
}
