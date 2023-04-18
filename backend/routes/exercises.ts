import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router();

router.route("/").get(async (req, res) => {
  const { muscle } = req.query as {muscle?: string};
try {
  const exercises = await prisma.exercise.findMany({
    where: {
      muscle: {
        equals: muscle,
      },
    },
  });
  res.json(exercises);
} catch {
  console.error("Could not find exercises")
}

});

export default router;
