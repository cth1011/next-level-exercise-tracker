import { useSession } from "next-auth/react";
import { dehydrate, useQuery, QueryClient } from "react-query";
import authOptions from "@/pages/api/auth/[...nextauth]";
import WorkoutTemplate from "@/components/WorkoutTemplate";
import Layout from "@/components/Layout";
import AddIcon from "@/icons/AddIcon";
import { useRouter } from "next/router";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import React, { Suspense } from "react";
import { GUEST_EMAIL, IN_PROGRESS, TEMPLATE_CREATION } from "@/constants";
import Loading from "./loading";

import { fetchTemplates } from "@/hooks/api";
import { GetStaticProps } from "next";

const Workout: React.FC = () => {
  const router = useRouter();

  const setWorkoutStatus = useWorkoutStore((state) => state.setWorkoutStatus);

  const { data: session } = useSession();
  const email = session?.user?.email || GUEST_EMAIL;

  const { data: templates } = useQuery(["templates", email], () =>
    fetchTemplates(email)
  );

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
          <button
            type="button"
            className="btn-ghost btn-xs btn-circle btn"
            onClick={() => {
              setWorkoutStatus(TEMPLATE_CREATION);
              router.push("/app/workout/start");
            }}
          >
            <AddIcon />
          </button>
        </div>
        <Suspense fallback={<Loading />}>
          <div
            data-testid="templates"
            className="w-full gap-2  md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3"
          >
            {templates?.map((template, index) => {
              return (
                <div data-testid={`template-${index}`} key={index}>
                  <WorkoutTemplate
                    template={template}
                    onClick={() => {
                      setWorkoutStatus(IN_PROGRESS);
                      router.push("/app/workout/start");
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const email = GUEST_EMAIL;
  await queryClient.fetchQuery(["templates", email], () =>
    fetchTemplates(email)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Workout;
