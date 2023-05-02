import { useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useSession } from "next-auth/react";

import ExerciseApp from "./app";
import Hero from "@/components/Hero";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/app");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>NextLevel</title>
        <meta
          name="description"
          content="Transform your fitness journey with our advanced exercise tracker. Stay motivated and track your progress with ease. Get personalized workout plans, detailed reports, and achieve your fitness goals faster than ever before."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
}
