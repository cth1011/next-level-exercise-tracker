import { EDIT, IN_PROGRESS, NOT_STARTED, VIEW, TEMPLATE_CREATION } from "@/constants";

export type Template = {
  id: number;
  workout_name: string;
  exercises?: TemplateExercise[];
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
  id: number;
  name: string;
  type: string;
  sets?: WorkoutSet[];
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

export type WorkoutSession = {
  workout_name: string;
}

export type WorkoutExercise = {
  exercise_id: number;
  name: string;
  sets: WorkoutSet[]
}

export type WorkoutSet = {
  set_no: number;
  reps?: number;
  previous?: number;
  weight?: number;
  checked?: boolean;
};

export type WorkoutStatus = typeof NOT_STARTED | typeof IN_PROGRESS | typeof TEMPLATE_CREATION;
export type ExercisePageStatus = typeof VIEW | typeof EDIT;
