import Layout from "@/components/Layout";
import SearchField from "@/components/SearchField";
import Select from "@/components/Select";
import { EDIT, VIEW } from "@/constants";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import BackIcon from "@/icons/BackIcon";
import React from "react";

type IEditLayout = {
  children: React.ReactNode;
};

const EditLayout: React.FC<IEditLayout> = ({ children }) => (
  <div className="p-4 text-gray-900">{children}</div>
);

const Exercises = () => {
  const exercises = useWorkoutStore((state) => state.exercises);
  const exercisePageStatus = useWorkoutStore(
    (state) => state.exercisePageStatus
  );
  const setExercisePageStatus = useWorkoutStore(
    (state) => state.setExercisePageStatus
  );

  const Component = exercisePageStatus === EDIT ? EditLayout : Layout;

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
            {exercises.map((exercise, index) => (
              <>
                <tr key={index}>
                  {exercisePageStatus === EDIT && (
                    <td className="border-0">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox-primary checkbox"
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
              </>
            ))}
          </tbody>
        </table>
        {exercisePageStatus === EDIT && (
          <button className="btn-primary btn-circle btn fixed bottom-8 right-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        )}
      </div>
    </Component>
  );
};

export default Exercises;
