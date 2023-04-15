import { create } from "zustand";

import { createTemplateSlice,TemplateState } from "./slices/templateSlice";
import { createWorkoutSlice, WorkoutState} from "./slices/workoutSlice"

import {persist} from "zustand/middleware"

export const useWorkoutStore = create<TemplateState & WorkoutState>()(persist((...a) => ({
...createTemplateSlice(...a),
...createWorkoutSlice(...a)
}),{name: 'workout-store'}));
