import { ClientOnly } from "@tanstack/react-router";
import { useEffect } from "react";
import { ErectionScene } from "@/components/erection/Scene";
import { ErectionOverlay } from "@/components/erection/Controls";
import { useErectionStore } from "@/lib/erection-store";

export function ErectionPage() {
  const setEmbed = useErectionStore((s) => s.setEmbed);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmbed(params.get("embed") === "1" || params.get("embed") === "true");
  }, [setEmbed]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-bg">
      <ClientOnly
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-bg text-muted">
            Loading 3D erection sequence…
          </div>
        }
      >
        <ErectionScene />
        <ErectionOverlay />
      </ClientOnly>
    </div>
  );
}
