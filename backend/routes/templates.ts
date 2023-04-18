import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router();

router.route("/").post(async (req, res) => {
  const { email } = req.body;
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
  res.json(templates);
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

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

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
