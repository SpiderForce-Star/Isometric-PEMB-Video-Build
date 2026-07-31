import { createFileRoute } from "@tanstack/react-router";
import { ErectionPage } from "@/components/erection/ErectionPage";

export const Route = createFileRoute("/")({
  component: ErectionPage,
});
