import { UrlObject } from "url";

export * from "@tanstack/react-query";

interface ErrorMeta {
  skipError?: boolean;
  errorMessages?: {
    400?: string;
    403?: string;
    404?: string;
    401?: string;
    500?: string;
    default?: string;
    [key: string]: string;
  };
}

interface CustomMutationMeta extends ErrorMeta {
  redirectTo?: string;
  redirectAs?: string;
  successMessage?: string;
}

declare module "@tanstack/react-query" {
  interface QueryMeta extends ErrorMeta {
    skipLoading?: boolean;
  }
  interface MutationMeta extends CustomMutationMeta {
    skipLoading?: boolean;
  }
}
