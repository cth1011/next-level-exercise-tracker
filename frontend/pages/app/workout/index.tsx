import WorkoutTemplate from "@/components/WorkoutTemplate";
import Layout from "@/components/Layout";
import AddIcon from "@/icons/AddIcon";
import Link from "next/link";
import { useTemplateStore } from "@/hooks/useTemplateStore";
import React from "react";

const Workout: React.FC = () => {
  const templates = useTemplateStore((state) => state.templates);
  return (
    <Layout>
      <div className="pt-4">
        <Link href="/app/workout/start">
          <button
            type="button"
            className="btn-primary no-animation btn block w-full sm:w-[250px]"
          >
            Start an Empty Workout
          </button>
        </Link>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Workout Templates</span>
          <button type="button" className="btn-ghost btn-xs btn-circle btn">
            <AddIcon />
          </button>
        </div>
        <div className="w-full mt-2 md: md:flex md:space-x-2">
          {templates &&
            templates.map((template, index) => (
              <div key={index} className="md:w-1/2">
                <WorkoutTemplate template={template} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Workout;
