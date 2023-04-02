import ExerciseTemplate, {
  IExerciseTemplate,
} from "@/components/ExerciseTemplate";
import Layout from "@/components/Layout";
import AddIcon from "@/components/icons/AddIcon";

const FAKE_DATA = [
  {
    workout_name: "Legs",
    exercises: [
      [5, "Squat (Barbell)"],
      [3, "Pull Up"],
      [5, "Lying Leg Curl (Machine)"],
    ],
    date: new Date(),
  },
  {
    workout_name: "Strength",
    exercises: [
      [5, "Squat (Barbell)"],
      [3, "Pull Up"],
      [5, "Lying Leg Curl (Machine)"],
      [3, "Pull Up"],
      [5, "Lying Leg Curl (Machine)"],
    ],
    date: new Date(),
  },
  {
    workout_name: "Biceps",
    exercises: [
      [5, "Squat (Barbell)"],
      [3, "Pull Up"],
      [5, "Lying Leg Curl (Machine)"],
      [3, "Pull Up"],
      [5, "Lying Leg Curl (Machine)"],
    ],
    date: new Date(),
  },
];

const Workout = () => (
  <Layout>
    <div className="">
      <span className="text-sm text-gray-500">Quick Start</span>
      <button
        type="button"
        className="mt-2 block h-[50px] w-full rounded-lg bg-rose-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300 sm:w-[200px]"
      >
        Start an Empty Workout
      </button>
    </div>
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Workout Templates</span>
        <button type="button" className="btn-ghost btn-xs btn-circle btn">
          <AddIcon />
        </button>
      </div>
      <div className="w-full mt-2 md: md:flex md:space-x-2">
        {FAKE_DATA.map(({ exercises, workout_name, date }, index) => (
          <div key={index} className="md:w-1/2">
            <ExerciseTemplate
              exercises={exercises as [number, string][]}
              workout_name={workout_name}
              date={date}
            />
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default Workout;
