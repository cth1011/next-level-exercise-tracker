import { StateCreator } from "zustand";

import {
  Exercise,
  ExercisePageStatus,
  WorkoutExercise,
  WorkoutStatus,
  WorkoutSet,
} from "@/types/session";
import { EXERCISES, VIEW, NOT_STARTED } from "@/constants";

export type WorkoutState = {
  exercises: Exercise[];
  workoutStatus: WorkoutStatus;
  exercisePageStatus: ExercisePageStatus;
  workoutName: string;
  workoutExercises: WorkoutExercise[];
  setExercisePageStatus: (status: ExercisePageStatus) => void;
  setWorkoutStatus: (status: WorkoutStatus) => void;
  setWorkoutName: (name: string) => void;
  setWorkoutExercise: (exercise: WorkoutExercise[]) => void;
  resetWorkoutExercises: () => void;
  addWorkoutSet: (exercise_id: number) => void;
};

export const createWorkoutSlice: StateCreator<
  WorkoutState,
  [],
  [],
  WorkoutState
> = (set) => ({
  exercises: EXERCISES,
  workoutStatus: NOT_STARTED,
  workoutExercises: [],
  exercisePageStatus: VIEW,
  workoutName: "Workout",
  setExercisePageStatus: (status) =>
    set((state) => ({ ...state, exercisePageStatus: status })),
  setWorkoutStatus: (status) =>
    set((state) => ({ ...state, workoutStatus: status })),
  setWorkoutName: (name) => set((state) => ({ ...state, workoutName: name })),
  setWorkoutExercise: (exercise) =>
    set((state) => ({
      ...state,
      workoutExercises: [...state.workoutExercises, ...exercise],
    })),
  resetWorkoutExercises: () =>
    set((state) => ({
      ...state,
      workoutExercises: [],
      workoutName: "Workout",
    })),
  addWorkoutSet: (exercise_id) => {
    set((state) => {
      const newWorkoutExercises = state.workoutExercises.map((exercise) => {
        if (exercise.exercise_id === exercise_id) {
          const newSets = [
            ...exercise.sets!,
            { set_no: exercise.sets!.length + 1 },
          ];
          return { ...exercise, sets: newSets };
        }
        return exercise;
      });
      return { ...state, workoutExercises: newWorkoutExercises };
    });
  },
});
