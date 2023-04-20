import { Exercise, Template } from "@/types/session";

export const fetchTemplates = async (
  email: string
): Promise<Template[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates?email=${email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch templates");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch templates", error);
  }
};

export const fetchExercises = async (): Promise<Exercise[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch exercises");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch exercises", error);
  }
};

interface IExerciseSet {
  exercise_id: number;
  sets: number;
}

interface ICreateTemplate {
  name: string;
  email: string;
  exercises: IExerciseSet[];
}

export const createTemplate = async ({
  name,
  email,
  exercises,
}: ICreateTemplate): Promise<Template[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, exercises }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to create template");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to create template", error);
  }
};

export const updateTemplate = async ({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<Template[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update template");
    }
    return await res.json();
  } catch {
    console.error("Failed to update template");
  }
};

export const deleteTemplate = async (
  id: number
): Promise<Template[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete template");
    }
    return await res.json();
  } catch {
    console.error("Failed to delete template");
  }
};
