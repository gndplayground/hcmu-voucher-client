import { useAuthStore } from "@stores/auth";
import { User, UserProfile } from "@types";
import React from "react";
import { Navigate } from "react-router-dom";

export interface GuardRouteProps {
  children: (auth: { user: User; profile?: UserProfile }) => React.ReactNode;
}

export function GuardRoute(props: GuardRouteProps) {
  const { children } = props;
  const authStore = useAuthStore();

  if (authStore.isValidating && !authStore.user) return <></>;

  return !authStore.user ? (
    <Navigate to="/login" />
  ) : (
    <>
      {children({
        profile: authStore.profile,
        user: authStore.user,
      })}
    </>
  );
}
