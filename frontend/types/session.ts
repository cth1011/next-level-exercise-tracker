import { EDIT, IN_PROGRESS, NOT_STARTED, VIEW } from "@/constants";

export type Template = {
  id: number;
  workout_name: string;
  exercises: TemplateExercise[];
  last_date_performed?: Date;
  user_id: number;
};

export type TemplateExercise = {
  id: number;
  exercise_id: number;
  sets: number;
  template_id: number;
  exercise: Exercise

}

export type Exercise = {
  name: string;
  type: string;
  sets?: Set[];
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
