import Layout from "@/components/Layout";
import SearchField from "@/components/SearchField";
import { EDIT, GUEST_EMAIL, VIEW } from "@/constants";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import BackIcon from "@/icons/BackIcon";
import React, { useState } from "react";
import { WorkoutExercise } from "@/types/session";
import CheckIcon from "@/icons/CheckIcon";
import { fetchExercises } from "@/hooks/api";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { GetStaticProps } from "next";

interface IEditLayout {
  children: React.ReactNode;
}

interface IHandleCheck {
  id: number;
  checked: boolean;
  name: string;
}

const EditLayout: React.FC<IEditLayout> = ({ children }) => (
  <div className="p-4 text-gray-900">{children}</div>
);

const Exercises = () => {
  const [workoutExercises, setExercises] = useState<WorkoutExercise[]>([]);
  const { data: exercises } = useQuery(["exercises"], () => fetchExercises());
  const exercisePageStatus = useWorkoutStore(
    (state) => state.exercisePageStatus
  );
  const setExercisePageStatus = useWorkoutStore(
    (state) => state.setExercisePageStatus
  );
  const setWorkoutExercise = useWorkoutStore(
    (state) => state.setWorkoutExercise
  );
  const Component = exercisePageStatus === EDIT ? EditLayout : Layout;

  const handleCheck = ({ id, checked, name }: IHandleCheck) => {
    if (checked) {
      setExercises([
        ...workoutExercises,
        { name, exercise_id: id, sets: [{ set_no: 1 }] },
      ]);
    } else {
      setExercises(workoutExercises.filter((ex) => ex.exercise_id !== id));
    }
  };

  const handleSubmit = () => {
    setWorkoutExercise(workoutExercises);
    setExercisePageStatus(VIEW);
  };
  return (
    <Component>
      <div className="inline-flex items-center space-x-2">
        {exercisePageStatus === EDIT && (
          <button
            type="button"
            className="btn-outline btn-square btn-xs btn"
            onClick={() => setExercisePageStatus(VIEW)}
          >
            <BackIcon />
          </button>
        )}
        <h1 className="mb-2 text-xl font-bold">Exercises</h1>
      </div>

      <SearchField />

      <div className="mt-2 w-full overflow-x-auto rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-2 text-sm font-medium">
        <table className="table w-full">
          <thead>
            <tr>
              {exercisePageStatus === EDIT && <th className="bg-white "></th>}
              <th className="bg-white">Exercise Name</th>
              <th className="hidden bg-white lg:table-cell">Muscle</th>
              <th className="hidden bg-white lg:table-cell">Difficulty</th>
              <th className="hidden bg-white lg:table-cell">TYPE</th>
            </tr>
          </thead>
          <tbody>
            {exercises!.map((exercise, index) => (
              <tr key={index}>
                {exercisePageStatus === EDIT && (
                  <td className="border-0">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-primary checkbox"
                        onChange={(e) =>
                          handleCheck({
                            id: exercise.id,
                            name: exercise.name,
                            checked: e.target.checked,
                          })
                        }
                      />
                    </label>
                  </td>
                )}
                <td className="border-0 ">{exercise.name}</td>
                <td className="hidden border-0 lg:table-cell">
                  {exercise.muscle}
                </td>
                <td className="hidden border-0 lg:table-cell">
                  {exercise.difficulty}
                </td>
                <td className="hidden border-0 lg:table-cell">
                  {exercise.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {exercisePageStatus === EDIT && workoutExercises.length > 0 && (
          <button
            className="btn-primary btn-circle btn fixed bottom-8 right-8"
            onClick={handleSubmit}
          >
            <CheckIcon />
          </button>
        )}
      </div>
    </Component>
  );
};

export default Exercises;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["exercises"], () => fetchExercises());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
