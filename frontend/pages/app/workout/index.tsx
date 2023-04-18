import { useSession } from "next-auth/react";
import { dehydrate, useQuery, QueryClient } from "react-query";
import authOptions from "@/pages/api/auth/[...nextauth]";
import WorkoutTemplate from "@/components/WorkoutTemplate";
import Layout from "@/components/Layout";
import AddIcon from "@/icons/AddIcon";
import { useRouter } from "next/router";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import React, { Suspense } from "react";
import { GUEST_EMAIL, IN_PROGRESS } from "@/constants";
import Loading from "./loading";

import { fetchTemplates } from "@/hooks/useTemplates";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";

const Workout: React.FC = () => {
  const router = useRouter();

  const setWorkoutStatus = useWorkoutStore((state) => state.setWorkoutStatus);
  const setWorkoutSession = useWorkoutStore((state) => state.setWorkoutSession);

  const { data: session } = useSession();
  const email = session?.user?.email || GUEST_EMAIL;

  const { data: templates } = useQuery(
    ["templates", email],
    () => fetchTemplates(email)
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
          <button type="button" className="btn-ghost btn-xs btn-circle btn">
            <AddIcon />
          </button>
        </div>
        <Suspense fallback={<Loading />}>
          <div
            data-testid="templates"
            className="w-full mt-2 md: md:flex md:space-x-2"
          >
            {templates?.map((template, index) => {
              return (
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
              );
            })}
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const queryClient = new QueryClient();
  const email = session?.user?.email || GUEST_EMAIL;
  await queryClient.prefetchQuery(["templates", email], () =>
    fetchTemplates(email)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Workout;
