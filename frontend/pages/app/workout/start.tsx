import { useRouter } from "next/router";
import ExerciseTemplate from "@/components/ExerciseTemplate";
import Layout from "@/components/Layout";
import { EDIT, GUEST_EMAIL, NOT_STARTED } from "@/constants";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import Exercises from "../exercises";
import { createTemplate, fetchExercises } from "@/hooks/api";
import { QueryClient, dehydrate } from "react-query";
import { GetStaticProps } from "next";
import { createExercisePayload } from "@/lib/utils";

const StartWorkout: React.FC = () => {
  const router = useRouter();
  const exercisePageStatus = useWorkoutStore(
    (state) => state.exercisePageStatus
  );
  const workoutName = useWorkoutStore((state) => state.workoutName);
  const resetWorkoutExercises = useWorkoutStore(
    (state) => state.resetWorkoutExercises
  );
  const setExercisePageStatus = useWorkoutStore(
    (state) => state.setExercisePageStatus
  );
  const setWorkoutName = useWorkoutStore((state) => state.setWorkoutName);
  const setWorkoutStatus = useWorkoutStore((state) => state.setWorkoutStatus);
  const workoutExercises = useWorkoutStore((state) => state.workoutExercises);

  const handleSubmit = () => {
    //TODO: Change email for user when authentication is fixed
    createTemplate({
      name: workoutName,
      email: GUEST_EMAIL,
      exercises: createExercisePayload(workoutExercises),
    });
    setWorkoutStatus(NOT_STARTED);
    resetWorkoutExercises();
    router.push("/app/workout");
  };

  if (exercisePageStatus === EDIT) {
    return (
      <div className="container mx-auto lg:max-w-4xl ">
        <Exercises />
      </div>
    );
  }
  return (
    <Layout>
      <div className="text-gray-900">
        <div className="flex justify-between py-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder={workoutName}
              className="input-ghost input input-sm max-w-xs text-lg font-bold"
              onChange={(e) => setWorkoutName(e.target.value)}
              value={workoutName}
            />
            {/* TODO: Add Time Feature */}
            {/* <div className="dropdown dropdown-right">
              <button
                tabIndex={0}
                type="button"
                className="btn-ghost btn-xs btn-circle btn"
              >
                <MoreIcon />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-base-100 py-1 shadow"
              >
                <li>
                  <label htmlFor={`rename`}>Rename Workout</label>
                </li>
                <li>
                  <label htmlFor={`adjust`}>Adjust start/end time</label>
                </li>
              </ul>
            </div> */}
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
          {[...workoutExercises].map(({ exercise_id, name, sets }, index) => (
            <div key={index} className="w-full">
              <ExerciseTemplate
                exercise_id={exercise_id}
                name={name}
                sets={sets}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 block w-full items-center space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
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
              resetWorkoutExercises();
              router.push("/app/workout");
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary no-animation btn w-full sm:w-[150px]"
            onClick={handleSubmit}
          >
            Finish
          </button>
        </div>

        {/* <Modal
          id={`rename`}
          title="Rename Workout"
          onClick={() => setWorkoutRename(name)}
        >
          <label className="label">
            <span className="label-text text-xs text-gray-500">
              Workout Name
            </span>
          </label>
          <input
            type="text"
            placeholder={workoutExercises?.workout_name || "Workout"}
            className="input-bordered input-primary input input-sm w-full max-w-xs"
            onChange={(e) => setName(e.target.value)}
          />
        </Modal> */}
      </div>
    </Layout>
  );
};

export default StartWorkout;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(["exercises"], () => fetchExercises());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
