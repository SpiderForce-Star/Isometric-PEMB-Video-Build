import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Video,
} from "lucide-react";
import { STAGES } from "@/lib/stages";
import { useErectionStore } from "@/lib/erection-store";
import { cn } from "@/lib/utils";

export function ErectionOverlay() {
  const progress = useErectionStore((s) => s.progress);
  const playing = useErectionStore((s) => s.playing);
  const speed = useErectionStore((s) => s.speed);
  const stageIndex = useErectionStore((s) => s.stageIndex);
  const autoCamera = useErectionStore((s) => s.autoCamera);
  const cameraPreset = useErectionStore((s) => s.cameraPreset);
  const embed = useErectionStore((s) => s.embed);
  const togglePlay = useErectionStore((s) => s.togglePlay);
  const setSpeed = useErectionStore((s) => s.setSpeed);
  const goStage = useErectionStore((s) => s.goStage);
  const nextStage = useErectionStore((s) => s.nextStage);
  const prevStage = useErectionStore((s) => s.prevStage);
  const setProgress = useErectionStore((s) => s.setProgress);
  const setAutoCamera = useErectionStore((s) => s.setAutoCamera);
  const setCameraPreset = useErectionStore((s) => s.setCameraPreset);
  const setPlaying = useErectionStore((s) => s.setPlaying);

  const stage = STAGES[stageIndex] ?? STAGES[0]!;
  const pct = Math.round(progress * 100);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-5 safe-pb">
      <div className="pointer-events-auto flex items-start justify-between gap-3">
        <div
          className={cn(
            "rounded-xl border border-border bg-surface/90 shadow-xl backdrop-blur-md",
            embed ? "px-3 py-2" : "px-4 py-3",
          )}
        >
          <div className="flex items-center gap-2">
            <Video className="size-4 text-primary" aria-hidden />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Stamps Steel · 3D Erection
              </p>
              <h1 className={cn("font-semibold text-fg", embed ? "text-sm" : "text-base sm:text-lg")}>
                50′ × 100′ × 20′ Clear-Span Gable
              </h1>
            </div>
          </div>
          {!embed && (
            <p className="mt-1 max-w-md text-xs text-muted">
              Silent multi-angle sequence · MBMA-aligned process · telehandler frame erection
            </p>
          )}
        </div>

        {!embed && (
          <a
            href="https://SpiderForce-Star.github.io/Stamps-Steel/erection.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/90 px-3 py-2 text-xs font-medium text-muted backdrop-blur-md transition hover:border-primary hover:text-primary"
          >
            Stamps Steel Erection page
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>

      <div className="pointer-events-none flex flex-1 items-end justify-between gap-3 pt-4">
        <div
          className={cn(
            "pointer-events-auto max-w-md rounded-xl border border-border bg-surface/92 shadow-xl backdrop-blur-md",
            embed ? "p-3" : "p-4",
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
            Stage {stage.index + 1} of {STAGES.length}
          </p>
          <h2 className="mt-0.5 text-lg font-semibold text-fg sm:text-xl">{stage.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.body}</p>
        </div>

        <div className="pointer-events-auto hidden flex-col gap-2 sm:flex">
          <span className="rounded-lg border border-border bg-surface/90 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-wide text-muted backdrop-blur-md">
            Camera
          </span>
          {(
            [
              ["iso", "Isometric"],
              ["side", "Side"],
              ["end", "End"],
              ["high", "Overhead"],
              ["closeBolt", "Haunch bolt"],
              ["telehandler", "Telehandler"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setCameraPreset(id)}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium backdrop-blur-md transition",
                cameraPreset === id && !autoCamera
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-surface/90 text-muted hover:border-primary hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAutoCamera(true)}
            className={cn(
              "rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium backdrop-blur-md transition",
              autoCamera
                ? "border-primary bg-primary/20 text-primary"
                : "border-border bg-surface/90 text-muted hover:border-primary hover:text-fg",
            )}
          >
            Auto camera
          </button>
        </div>
      </div>

      <div className="pointer-events-auto mt-3 space-y-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goStage(s.index)}
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition sm:text-xs",
                s.index === stageIndex
                  ? "border-primary bg-primary text-primary-fg"
                  : s.index < stageIndex
                    ? "border-border-strong bg-surface-elevated text-fg"
                    : "border-border bg-surface/90 text-muted hover:border-primary hover:text-fg",
              )}
            >
              {s.short}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface/95 p-2.5 shadow-xl backdrop-blur-md sm:p-3">
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(e) => setProgress(Number(e.target.value) / 1000)}
            className="mb-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
            aria-label="Timeline"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={prevStage}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-fg transition hover:border-primary"
              aria-label="Previous stage"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex size-11 items-center justify-center rounded-lg bg-primary text-primary-fg transition hover:bg-primary-hover"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="size-5" /> : <Play className="size-5 pl-0.5" />}
            </button>
            <button
              type="button"
              onClick={nextStage}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-fg transition hover:border-primary"
              aria-label="Next stage"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setProgress(0);
                goStage(0);
                setPlaying(true);
                setAutoCamera(true);
              }}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-fg transition hover:border-primary"
              aria-label="Restart"
            >
              <RotateCcw className="size-4" />
            </button>

            <div className="ml-1 flex items-center gap-1 rounded-lg border border-border bg-surface-elevated p-0.5">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-xs font-semibold",
                    speed === s ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {s}×
                </button>
              ))}
            </div>

            <span className="ml-auto font-mono text-xs tabular-nums text-muted">{pct}%</span>

            {embed && (
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs text-muted hover:text-primary"
              >
                <Maximize2 className="size-3.5" /> Full
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
