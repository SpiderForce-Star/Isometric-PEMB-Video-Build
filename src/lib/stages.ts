export type StageId =
  | "foundation"
  | "unload"
  | "columns"
  | "rafters"
  | "secondary"
  | "insulation"
  | "sheeting"
  | "trim"
  | "complete";

export type CameraPreset = "iso" | "side" | "end" | "high" | "closeBolt" | "telehandler";

export interface StageDef {
  id: StageId;
  index: number;
  label: string;
  short: string;
  title: string;
  body: string;
  camera: CameraPreset;
  /** Visibility thresholds — progress 0..1 across whole sequence */
  reveal: number;
}

/** Building geometry constants (feet) */
export const BUILDING = {
  width: 50,
  length: 100,
  eave: 20,
  bays: 5,
  baySpacing: 20,
  pitchRise: 2, // 2:12 pitch
  pitchRun: 12,
} as const;

export function ridgeHeight(): number {
  const half = BUILDING.width / 2;
  return BUILDING.eave + (half * BUILDING.pitchRise) / BUILDING.pitchRun;
}

export const STAGES: StageDef[] = [
  {
    id: "foundation",
    index: 0,
    label: "1 Foundation",
    short: "Foundation",
    title: "Slab with anchor bolts",
    body: "Existing cured concrete slab. Anchor bolts verified square and level per manufacturer plan. Ready for primary steel.",
    camera: "high",
    reveal: 0,
  },
  {
    id: "unload",
    index: 1,
    label: "2 Unload",
    short: "Unload",
    title: "Unload & stage with telehandler",
    body: "Flatbed delivery. Telehandler offloads columns, rafters, secondary, panels, and trim. Material staged on blocking with center access lane open.",
    camera: "telehandler",
    reveal: 0.12,
  },
  {
    id: "columns",
    index: 2,
    label: "3 Columns",
    short: "Columns",
    title: "Raise columns — braced bay first",
    body: "Telehandler sets rigid-frame columns on anchors. Nuts and washers installed. Temporary bracing for stability. Start at the braced bay.",
    camera: "side",
    reveal: 0.25,
  },
  {
    id: "rafters",
    index: 3,
    label: "4 Rafters",
    short: "Rafters",
    title: "Raise rafters & haunch connections",
    body: "Rafters assembled on ground where practical, then lifted and bolted at haunches. Close-up on primary A325 connections. Plumb the first bay.",
    camera: "closeBolt",
    reveal: 0.4,
  },
  {
    id: "secondary",
    index: 4,
    label: "5 Secondary",
    short: "Secondary",
    title: "Purlins, girts & permanent bracing",
    body: "Eave struts, purlins, wall girts, flange braces, and permanent rod/cable bracing. Secondary left adjustable until the skeleton is plumb.",
    camera: "iso",
    reveal: 0.55,
  },
  {
    id: "insulation",
    index: 5,
    label: "6 Insulation",
    short: "Insulation",
    title: "Roll-out insulation before sheeting",
    body: "Faced fiberglass blanket rolled over purlins and girts. Vapor retarder to the interior. Laps sealed — installed before wall and roof panels.",
    camera: "high",
    reveal: 0.68,
  },
  {
    id: "sheeting",
    index: 6,
    label: "7 Sheeting",
    short: "Sheeting",
    title: "Wall & roof panels",
    body: "Wall panels then roof panels (or per drawings). Proper fastener patterns, end-laps over purlins, sidelap sealant. Openings framed for doors and windows.",
    camera: "iso",
    reveal: 0.8,
  },
  {
    id: "trim",
    index: 7,
    label: "8 Trim",
    short: "Trim",
    title: "Trim, gutters & flashings",
    body: "Base, corner, eave, rake, ridge, gutters and downspouts. Closures and flashings for a weather-tight shell.",
    camera: "end",
    reveal: 0.9,
  },
  {
    id: "complete",
    index: 8,
    label: "9 Complete",
    short: "Complete",
    title: "Doors, windows & finished shell",
    body: "Two large sectional overhead doors, walk doors, and windows installed and flashed. 50′ × 100′ × 20′ gable shell ready for turn-over.",
    camera: "iso",
    reveal: 1,
  },
];

export function stageFromProgress(p: number): StageDef {
  let current = STAGES[0]!;
  for (const s of STAGES) {
    if (p + 0.001 >= s.reveal) current = s;
  }
  return current;
}

export function progressForStage(index: number): number {
  const s = STAGES[Math.max(0, Math.min(STAGES.length - 1, index))];
  return s?.reveal ?? 0;
}
