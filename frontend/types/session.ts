import { EDIT, IN_PROGRESS, NOT_STARTED, VIEW } from "@/constants";

export type Template = {
  template_id: number;
  workout_name: string;
  exercises: Exercise[];
  last_date_performed?: Date;
};

export type Exercise = {
  name: string;
  type: string;
  sets?: Set[];
  unit?: Unit;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

export type Set = {
  set_no: number;
  reps: number;
  previous?: number;
  weight: number;
};

export type WorkoutStatus = typeof NOT_STARTED | typeof IN_PROGRESS;
export type ExercisePageStatus = typeof VIEW | typeof EDIT;
export type Unit = "lbs" | "kg";
