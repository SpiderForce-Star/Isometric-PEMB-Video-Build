import { create } from "zustand";
import {
  type CameraPreset,
  type StageDef,
  STAGES,
  progressForStage,
  stageFromProgress,
} from "./stages";

interface ErectionState {
  progress: number;
  playing: boolean;
  speed: number;
  stageIndex: number;
  cameraPreset: CameraPreset;
  autoCamera: boolean;
  embed: boolean;
  setProgress: (p: number) => void;
  setPlaying: (v: boolean) => void;
  togglePlay: () => void;
  setSpeed: (s: number) => void;
  goStage: (index: number) => void;
  nextStage: () => void;
  prevStage: () => void;
  setCameraPreset: (c: CameraPreset) => void;
  setAutoCamera: (v: boolean) => void;
  setEmbed: (v: boolean) => void;
  tick: (dt: number) => void;
  currentStage: () => StageDef;
}

export const useErectionStore = create<ErectionState>((set, get) => ({
  progress: 0,
  playing: true,
  speed: 1,
  stageIndex: 0,
  cameraPreset: "high",
  autoCamera: true,
  embed: false,

  setProgress: (p) => {
    const progress = Math.max(0, Math.min(1, p));
    const stage = stageFromProgress(progress);
    set({
      progress,
      stageIndex: stage.index,
      ...(get().autoCamera ? { cameraPreset: stage.camera } : {}),
    });
  },

  setPlaying: (playing) => set({ playing }),
  togglePlay: () => set((s) => ({ playing: !s.playing })),
  setSpeed: (speed) => set({ speed }),

  goStage: (index) => {
    const i = Math.max(0, Math.min(STAGES.length - 1, index));
    const progress = progressForStage(i);
    const stage = STAGES[i]!;
    set({
      progress,
      stageIndex: i,
      playing: false,
      ...(get().autoCamera ? { cameraPreset: stage.camera } : {}),
    });
  },

  nextStage: () => {
    const { stageIndex } = get();
    if (stageIndex >= STAGES.length - 1) {
      get().goStage(0);
      set({ playing: true });
    } else {
      get().goStage(stageIndex + 1);
    }
  },

  prevStage: () => get().goStage(get().stageIndex - 1),

  setCameraPreset: (cameraPreset) => set({ cameraPreset, autoCamera: false }),
  setAutoCamera: (autoCamera) => {
    if (autoCamera) {
      const stage = stageFromProgress(get().progress);
      set({ autoCamera, cameraPreset: stage.camera });
    } else {
      set({ autoCamera });
    }
  },
  setEmbed: (embed) => set({ embed }),

  tick: (dt) => {
    const { playing, speed, progress } = get();
    if (!playing) return;
    // Full sequence ~72 seconds at 1x
    const rate = (1 / 72) * speed;
    let next = progress + dt * rate;
    if (next >= 1) {
      next = 1;
      set({ playing: false });
    }
    get().setProgress(next);
  },

  currentStage: () => stageFromProgress(get().progress),
}));
