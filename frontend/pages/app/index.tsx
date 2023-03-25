import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";

import Dashboard from "./dashboard";

const ExerciseApp: React.FC = () => {
  return <Dashboard />;
};

export default ExerciseApp;
