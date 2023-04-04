import { create } from "zustand";

import { Template } from "@/types/session";

type TemplateState = {
  templates: Template[];
  setNewTemplate: (template: Template) => void;
  setTemplateName: (id: number, newName: string) => void;
  deleteTemplate: (id: number) => void;
};

const MOCK_VALUES = [
  {
    template_id: 1,
    workout_name: "Strength",
    exercises: [
      {
        set: 1,
        reps: 5,
        exercise_name: "Pull Up",
        weight: 0,
      },
      {
        set: 1,
        reps: 5,
        exercise_name: "Squats (Barbell)",
        weight: 0,
      },
    ],
    last_date_performed: new Date(),
  },
  {
    template_id: 2,
    workout_name: "Legs",
    exercises: [
      {
        set: 1,
        reps: 5,
        exercise_name: "Pull Up",
        weight: 0,
      },
    ],
    last_date_performed: new Date(),
  },
];

export const useTemplateStore = create<TemplateState>((set) => ({
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
}));
