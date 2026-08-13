import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "AgoraSim | Open-source simulation for public policy in Portugal" },
      {
        name: "description",
        content:
          "AgoraSim is an open-source simulation platform for modelling public systems, testing policy alternatives, and generating evidence-based proposals for Portugal.",
      },
      { property: "og:title", content: "AgoraSim | Open-source simulation for public policy in Portugal" },
      {
        property: "og:description",
        content:
          "Open-source simulation for modelling public systems, testing alternatives, and producing evidence-based proposals.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
