export interface ExerciseWithSets {
    exercise_id: number;
    sets: number;
  }
  
  export interface TemplateExerciseData {
    exercise: {
      connect: {
        id: number;
      };
    };
    sets: number;
  }