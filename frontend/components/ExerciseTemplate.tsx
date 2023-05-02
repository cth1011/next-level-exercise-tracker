import MoreIcon from "@/icons/MoreIcon";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { WorkoutExercise, WorkoutSet } from "@/types/session";
import { useState } from "react";

const ExerciseTemplate = ({ exercise_id, name, sets }: WorkoutExercise) => {
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>(sets!);
  const newSetNo = workoutSets.length + 1;
  const addWorkoutSet = useWorkoutStore((state) => state.addWorkoutSet);

  const handleAddSet = () => {
    //TODO: Add previous weight and reps to new set
    setWorkoutSets((state) => [...state, { set_no: newSetNo }]);
    addWorkoutSet(exercise_id);
  };
  return (
    <div className="h-full w-full overflow-x-auto rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-2 text-sm font-medium">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-rose-700">{name}</span>
        <div className="dropdown-end dropdown">
          <button
            tabIndex={0}
            type="button"
            className="btn-ghost btn-xs btn-circle btn"
          >
            <MoreIcon color="text-rose-700" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 py-1 shadow"
          >
            {/* <li>
            <label htmlFor={`rename-${name}`}>Replace Exercise</label>
          </li> */}
            <li>
              <label htmlFor={`adjust-${name}`}>Remove Exercise</label>
            </li>
          </ul>
        </div>
      </div>
      <table className="table-compact table w-full text-center">
        <thead>
          <tr>
            <th className="bg-white">SET</th>
            <th className="bg-white">PREVIOUS</th>
            <th className="bg-white">(+LBS)</th>
            <th className="bg-white">REPS</th>
            <th className="bg-white"></th>
          </tr>
        </thead>
        <tbody>
          {workoutSets.map((set, index) => (
            <tr key={index}>
              <td className="border-0">{set.set_no}</td>
              <td className="border-0">{set.previous || "-"}</td>
              <td className="border-0">
                <input
                  type="number"
                  placeholder={set?.weight?.toString() || "0"}
                  className="input-bordered input input-sm max-w-[50px] border-gray-500"
                />
              </td>
              <td className="border-0">
                {" "}
                <input
                  type="number"
                  placeholder={set?.reps?.toString() || "0"}
                  className="input-bordered input input-sm max-w-[50px] border-gray-500"
                />
              </td>
              <td className="border-0">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn-ghost no-animation btn mt-2 w-full text-rose-700 "
        onClick={handleAddSet}
      >
        Add Set
      </button>
    </div>
  );
};

export default ExerciseTemplate;
