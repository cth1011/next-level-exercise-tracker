import WorkoutTemplate from "@/components/WorkoutTemplate";
import Layout from "@/components/Layout";
import AddIcon from "@/icons/AddIcon";
import { useRouter } from "next/router";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import React from "react";
import { IN_PROGRESS } from "@/constants";

const Workout: React.FC = () => {
  const router = useRouter();
  const setWorkoutStatus = useWorkoutStore((state) => state.setWorkoutStatus);
  const setWorkoutSession = useWorkoutStore((state) => state.setWorkoutSession);
  const templates = useWorkoutStore((state) => state.templates);
  return (
    <Layout>
      <div className="pt-4">
        <button
          type="button"
          className="btn-primary no-animation btn block w-full sm:w-[250px]"
          onClick={() => {
            setWorkoutStatus(IN_PROGRESS);
            router.push("/app/workout/start");
          }}
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
        <div
          data-testid="templates"
          className="w-full mt-2 md: md:flex md:space-x-2"
        >
          {templates &&
            templates.map((template, index) => (
              <div
                data-testid={`template-${index}`}
                key={index}
                className="md:w-1/2"
              >
                <WorkoutTemplate
                  template={template}
                  onClick={() => {
                    setWorkoutStatus(IN_PROGRESS);
                    setWorkoutSession(template);
                    router.push("/app/workout/start");
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Workout;
