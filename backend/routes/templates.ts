import { Router, Request, Response } from "express";
import { createTemplateExerciseData } from "../lib/utils";
import prisma from "../prismaClient";

const router = Router();

router.route("/").get(async (req, res) => {
  const { email } = req.query as { email?: string };
  try {
    const templates = await prisma.template.findMany({
      where: {
        user: {
          is: {
            email: email,
          },
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
    if (!templates) {
      return res.status(404).json({ error: "Templates not found" });
    }
    console.log("Template retrieved successfully");
    res.json(templates);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/").post(async (req, res) => {
  const { name, exercises, email } = req.body;
  const template = await prisma.template.create({
    data: {
      workout_name: name,
      exercises: {
        create: createTemplateExerciseData(exercises),
      },
      user: {
        connect: {
          email: email,
        },
      },
    },

  });
  res.json(template);
});

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
    });

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const updatedTemplate = await prisma.template.update({
      where: { id: parseInt(id) },
      data: { workout_name: name },
    });

    console.log("Template updated successfully:", updatedTemplate);

    return res.json(updatedTemplate);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
    });

    if (template == null) {
      return res.status(404).json({ error: "Template not found" });
    }
    await prisma.templateExercise.deleteMany({
      where: { template_id: parseInt(id) },
    });
    await prisma.template.delete({
      where: { id: parseInt(id) },
    });

    console.log("Template deleted successfully");

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
