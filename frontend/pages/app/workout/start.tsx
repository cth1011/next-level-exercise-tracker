import { useRouter } from "next/router";
import ExerciseTemplate from "@/components/ExerciseTemplate";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { EDIT, NOT_STARTED } from "@/constants";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import MoreIcon from "@/icons/MoreIcon";
import Exercises from "../exercises";
import { useState } from "react";

const StartWorkout: React.FC = () => {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const exercisePageStatus = useWorkoutStore(
    (state) => state.exercisePageStatus
  );
  const setExercisePageStatus = useWorkoutStore(
    (state) => state.setExercisePageStatus
  );
  const setWorkoutRename = useWorkoutStore((state) => state.setWorkoutRename);
  const setWorkoutStatus = useWorkoutStore((state) => state.setWorkoutStatus);
  const workoutSession = useWorkoutStore((state) => state.workoutSession);

  if (exercisePageStatus === EDIT) {
    return <Exercises />;
  }
  return (
    <Layout>
      <div className="text-gray-900">
        <div className="flex justify-between py-2">
          <div className="flex items-center">
            <span className="text-lg font-bold ">
              {workoutSession?.workout_name || "Workout"}
            </span>
            <div className="dropdown-right dropdown">
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
                  <label htmlFor={`rename`}>Rename Workout</label>
                </li>
                <li>
                  <label htmlFor={`adjust`}>Adjust start/end time</label>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="btn-ghost no-animation btn hidden w-[150px] text-rose-700 sm:block"
            onClick={() => setExercisePageStatus(EDIT)}
          >
            Add Exercise
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 ">
          {workoutSession?.exercises.map((exercise, index) => (
            <div key={index} className="w-full">
              <ExerciseTemplate exercise={exercise} />
            </div>
          ))}
        </div>

        <div className="items-center block w-full mt-4 space-y-2 sm:flex sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            className="btn-ghost no-animation btn w-full text-rose-700 sm:hidden sm:w-[150px]"
            onClick={() => setExercisePageStatus(EDIT)}
          >
            Add Exercise
          </button>
          <button
            type="button"
            className="btn-outline no-animation btn w-full sm:w-[150px]"
            onClick={() => {
              setWorkoutStatus(NOT_STARTED);
              router.push("/app/workout");
            }}
          >
            Cancel Workout
          </button>
          <button
            type="button"
            className="btn-primary no-animation btn w-full sm:w-[150px]"
          >
            Finish
          </button>
        </div>

        <Modal
          id={`rename`}
          title="Rename Workout"
          onClick={() => setWorkoutRename(name)}
        >
          <label className="label">
            <span className="text-xs text-gray-500 label-text">
              Workout Name
            </span>
          </label>
          <input
            type="text"
            placeholder={workoutSession?.workout_name || "Workout"}
            className="w-full max-w-xs input-bordered input-primary input input-sm"
            onChange={(e) => setName(e.target.value)}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default StartWorkout;
