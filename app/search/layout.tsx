import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Articles",
  description: "Search for articles about influences and protection",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
