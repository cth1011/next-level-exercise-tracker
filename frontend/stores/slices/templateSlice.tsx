import { create, StateCreator } from "zustand";

import {
  Exercise,
  ExercisePageStatus,
  Template,
  WorkoutStatus,
} from "@/types/session";
import { EXERCISES, VIEW, NOT_STARTED, MOCK_VALUES } from "@/constants";
import { WorkoutState } from "./workoutSlice";

export type TemplateState = {
  templates: Template[];
  setNewTemplate: (template: Template) => void;
  setTemplateName: (id: number, newName: string) => void;
  deleteTemplate: (id: number) => void;
};

export const createTemplateSlice: StateCreator<
  TemplateState & WorkoutState,
  [],
  [],
  TemplateState
> = (set) => ({
  templates: MOCK_VALUES,
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
});
