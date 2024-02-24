"use client";

import { Loading } from "@/components/Loading/Loading";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const isMutating = useIsMutating({
    predicate: (query) =>
      query.state.status === "pending" && !query.meta?.skipLoading
  });
  const isFetching = useIsFetching({
    predicate: (query) =>
      query.state.status === "pending" && !query.meta?.skipLoading
  });

  const networkRequestInProgress = Boolean(isMutating) || Boolean(isFetching);

  return (
    <>
      {networkRequestInProgress && <Loading />}

      {children}
    </>
  );
}
