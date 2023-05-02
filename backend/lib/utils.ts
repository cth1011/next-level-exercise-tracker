import { ExerciseWithSets, TemplateExerciseData } from "./types";


export const  createTemplateExerciseData = (
  exercisesWithSets: ExerciseWithSets[]
): TemplateExerciseData[] => {
  return exercisesWithSets.map(({ exercise_id, sets }) => ({
    exercise: {
      connect: {
        id: exercise_id,
      },
    },
    sets,
  }));
}
