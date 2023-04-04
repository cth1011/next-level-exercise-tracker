export type WorkoutSession = {};

export type SetSession = {
  workout_name: string;
  exercise_name: string;
  rep: number;
  set: number;
};

export type Template = {
  template_id: number;
  workout_name: string;
  exercises: Exercise[];
  last_date_performed: Date;
};

export type Exercise = {
  set?: number;
  reps?: number;
  exercise_name: string;
  weight: number;
};
