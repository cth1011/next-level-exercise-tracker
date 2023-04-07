import MoreIcon from "@/icons/MoreIcon";
import { Exercise } from "@/types/session";

type Props = {
  exercise: Exercise;
};

const ExerciseTemplate = ({ exercise }: Props) => (
  <div className="w-full overflow-x-auto rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-2 text-sm font-medium">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold text-rose-700">{exercise.name}</span>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          type="button"
          className="btn-ghost btn-xs btn-circle btn"
        >
          <MoreIcon color="text-rose-700" />
        </button>
        <ul
          tabIndex={0}
          className="py-1 shadow dropdown-content menu rounded-box w-52 bg-base-100"
        >
          <li>
            <label htmlFor={`rename-${exercise.name}`}>Replace Exercise</label>
          </li>
          <li>
            <label htmlFor={`adjust-${exercise.name}`}>Remove Exercise</label>
          </li>
        </ul>
      </div>
    </div>
    <table className="table w-full text-center table-compact">
      <thead>
        <tr>
          <th className="bg-white">SET</th>
          <th className="bg-white">PREVIOUS</th>
          <th className="bg-white">(+{exercise.unit || "lbs"})</th>
          <th className="bg-white">REPS</th>
          <th className="bg-white"></th>
        </tr>
      </thead>
      <tbody>
        {exercise.sets?.map((set, index) => (
          <tr key={index}>
            <td className="border-0">{set.set_no}</td>
            <td className="border-0">{set.previous || "-"}</td>
            <td className="border-0">
              <input
                type="number"
                placeholder={set.weight.toString() || "0"}
                className="input-bordered input input-sm max-w-[50px] border-gray-500"
              />
            </td>
            <td className="border-0">
              {" "}
              <input
                type="number"
                placeholder={set.reps.toString() || "0"}
                className="input-bordered input input-sm max-w-[50px] border-gray-500"
              />
            </td>
            <td className="border-0">
              <label>
                <input type="checkbox" className="checkbox-primary checkbox" />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      type="button"
      className="w-full mt-2 btn-ghost no-animation btn text-rose-700 "
    >
      Add Set
    </button>
  </div>
);

export default ExerciseTemplate;
