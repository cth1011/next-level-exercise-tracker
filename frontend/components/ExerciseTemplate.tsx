import Link from "next/link";
import MoreIcon from "./icons/MoreIcon";

export interface IExerciseTemplate {
  exercises: [number, string][];
  date: Date;
  workout_name: string;
}

const ExerciseTemplate = ({
  exercises,
  date,
  workout_name,
}: IExerciseTemplate) => {
  return (
    <div className=" mb-2 h-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{workout_name}</span>
        <div className="dropdown-end dropdown">
          <button
            tabIndex={0}
            type="button"
            className="btn-ghost btn-xs btn-circle btn"
          >
            <MoreIcon />
          </button>
          <ul
            tabIndex={0}
            className="py-1 shadow dropdown-content menu rounded-box w-52 bg-base-100"
          >
            <li>
              <Link href="/">Edit Workout</Link>
            </li>
            <li>
              <button>Rename</button>
            </li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <span className="text-sm text-gray-500">
        Last performed on: {date.toDateString()}
      </span>
      <span className="text-sm text-gray-500">
        {exercises.map(([reps, exercise]) => (
          <div>
            {reps} x {exercise}
          </div>
        ))}
      </span>
    </div>
  );
};

export default ExerciseTemplate;
