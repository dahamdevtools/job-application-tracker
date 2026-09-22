import React from "react";

export type DashboardRoutesTypes = "/dashboard" | "/applications" | "/profile";

export type NavItemTypes = {
  route: DashboardRoutesTypes;
  label: string;
  icon: React.ReactNode;
};
