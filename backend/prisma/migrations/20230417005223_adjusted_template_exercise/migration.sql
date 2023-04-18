/*
  Warnings:

  - You are about to drop the column `exercise_name` on the `TemplateExercise` table. All the data in the column will be lost.
  - Added the required column `exercise_id` to the `TemplateExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplateExercise" DROP COLUMN "exercise_name",
ADD COLUMN     "exercise_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TemplateExercise" ADD CONSTRAINT "TemplateExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
