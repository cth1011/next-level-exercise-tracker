import { WorkoutExercise } from "@/types/session";

interface ExerciseWithSets {
    exercise_id: number;
    sets: number;
  }

export const  createExercisePayload = (
    exercisesWithSets: WorkoutExercise[]
  ): ExerciseWithSets[] => {
    return exercisesWithSets.map(({ exercise_id, sets }) => ({exercise_id, sets: sets.length}));
  }