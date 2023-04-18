import { create } from "zustand";

import { createWorkoutSlice, WorkoutState } from "./slices/workoutSlice";

import { persist } from "zustand/middleware";

export const useWorkoutStore = create<WorkoutState>()(
  (...a) => ({
    ...createWorkoutSlice(...a),
  })
);
