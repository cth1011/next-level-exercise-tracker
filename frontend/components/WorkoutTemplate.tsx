import { useState } from "react";

import Link from "next/link";
import MoreIcon from "@/icons/MoreIcon";
import Modal from "./Modal";

import type { Template } from "@/types/session";
import React from "react";
import { useTemplateStore } from "@/hooks/useTemplateStore";

type Props = {
  template: Template;
  onClick: () => void;
};

const WorkoutTemplate: React.FC<Props> = ({ template, onClick }) => {
  const { last_date_performed, workout_name, template_id, exercises } =
    template;
  const [name, setName] = useState<string>(workout_name);
  const setTemplateName = useTemplateStore((state) => state.setTemplateName);
  const deleteTemplate = useTemplateStore((state) => state.deleteTemplate);
  return (
    <div
      className="mb-2 h-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{workout_name}</span>
        <div className="dropdown-end dropdown">
          <button
            tabIndex={0}
            type="button"
            className="btn-ghost btn-xs btn-circle btn"
          >
            <MoreIcon />
          </button>
          <ul
            tabIndex={0}
            className="py-1 shadow dropdown-content menu rounded-box w-52 bg-base-100"
          >
            <li>
              <Link href="/">Edit Workout</Link>
            </li>
            <li>
              <label htmlFor={`remake-${template_id}`}>Rename</label>
            </li>
            <li>
              <label htmlFor={`delete-${template_id}`}>Delete</label>
            </li>
          </ul>
        </div>
      </div>
      <span className="text-sm text-gray-500">
        Last performed on: {last_date_performed.toDateString()}
      </span>
      <span className="text-sm text-gray-500">
        {exercises?.map(({ exercise_name, reps }, index) => (
          <div key={index}>
            {reps} x {exercise_name}
          </div>
        ))}
      </span>
      <Modal
        id={`remake-${template_id}`}
        title="Rename Template"
        onClick={() => setTemplateName(template_id, name)}
      >
        <label className="label">
          <span className="text-xs text-gray-500 label-text">
            Template Name
          </span>
        </label>
        <input
          type="text"
          placeholder={workout_name}
          className="w-full max-w-xs input-bordered input-primary input input-sm"
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
      <Modal
        id={`delete-${template_id}`}
        title="Delete Template?"
        btnActionLabel="Delete"
        onClick={() => deleteTemplate(template_id)}
      >
        <p>
          Are you sure you want to delete this template? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default WorkoutTemplate;
