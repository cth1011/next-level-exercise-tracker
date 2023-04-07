import { create } from "zustand";

import {
  Exercise,
  ExercisePageStatus,
  Template,
  WorkoutStatus,
} from "@/types/session";
import { EXERCISES, VIEW, NOT_STARTED, MOCK_VALUES } from "@/constants";

type WorkoutState = {
  templates: Template[];
  exercises: Exercise[];
  workoutStatus: WorkoutStatus;
  exercisePageStatus: ExercisePageStatus;
  workoutSession?: Template | null;
  setNewTemplate: (template: Template) => void;
  setTemplateName: (id: number, newName: string) => void;
  deleteTemplate: (id: number) => void;
  setExercisePageStatus: (status: ExercisePageStatus) => void;
  setWorkoutStatus: (status: WorkoutStatus) => void;
  setWorkoutSession: (session: Template) => void;
  setWorkoutRename: (newName: string) => void;
};

export const useWorkoutStore = create<WorkoutState>((set) => ({
  templates: MOCK_VALUES,
  exercises: EXERCISES,
  workoutStatus: NOT_STARTED,
  exercisePageStatus: VIEW,
  workoutSession: null,
  setNewTemplate: (template) =>
    set((state) => ({ templates: { ...state.templates, template } })),
  setTemplateName: (id, newName) =>
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.template_id === id) {
          return { ...template, workout_name: newName };
        }
        return template;
      });
      return { templates: updatedTemplates };
    }),
  deleteTemplate: (id) =>
    set((state) => {
      const updatedTemplates = state.templates.filter(
        (template) => template.template_id !== id
      );
      return { templates: updatedTemplates };
    }),
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
}));
