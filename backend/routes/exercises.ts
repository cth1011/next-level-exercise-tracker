import { Router, Request, Response } from "express";
import Exercise, { IExercise } from "../models/exercise.model";

const router = Router();

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req: Request, res: Response) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise: IExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req: Request, res: Response) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req: Request, res: Response) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req: Request, res: Response) => {
  Exercise.findById(req.params.id)
    .then((exercise: IExercise | null) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        ?.save()
        .then(() => res.json("Exercise updated!"))
        .catch((err: Error) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

export default router;
