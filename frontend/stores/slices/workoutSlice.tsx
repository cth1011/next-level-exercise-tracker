import { StateCreator } from "zustand";

import {
  Exercise,
  ExercisePageStatus,
  Template,
  WorkoutStatus,
} from "@/types/session";
import { EXERCISES, VIEW, NOT_STARTED } from "@/constants";

import { TemplateState } from "./templateSlice";

export type WorkoutState = {
  exercises: Exercise[];
  workoutStatus: WorkoutStatus;
  exercisePageStatus: ExercisePageStatus;
  workoutSession?: Template | null;
  setExercisePageStatus: (status: ExercisePageStatus) => void;
  setWorkoutStatus: (status: WorkoutStatus) => void;
  setWorkoutSession: (session: Template) => void;
  setWorkoutRename: (newName: string) => void;
};

export const createWorkoutSlice: StateCreator<
  TemplateState & WorkoutState,
  [],
  [],
  WorkoutState
> = (set) => ({
  exercises: EXERCISES,
  workoutStatus: NOT_STARTED,
  exercisePageStatus: VIEW,
  workoutSession: null,
  setExercisePageStatus: (status) =>
    set((state) => ({ ...state, exercisePageStatus: status })),
  setWorkoutStatus: (status) =>
    set((state) => ({ ...state, workoutStatus: status })),
  setWorkoutSession: (session) =>
    set((state) => ({ ...state, workoutSession: session })),
  setWorkoutRename: (newName) =>
    set((state) => ({
      ...state,
      workoutSession: { ...state.workoutSession!, workout_name: newName },
    })),
});
