import React from "react";
import { UseMutateFunction } from "react-query";

interface IModal {
  id: string;
  title: string;
  btnActionLabel?: string;
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
}


const Modal = ({ id, btnActionLabel, title, onClick, children }: IModal) => (
  <div onClick={(e) => e.stopPropagation()}>
    <input type="checkbox" id={id} className="modal-toggle" />
    <label htmlFor={id} className="cursor-pointer modal">
      <label className="relative max-w-xs modal-box" htmlFor="">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div>{children}</div>
        <div className="flex justify-end space-x-2 modal-action">
          <label htmlFor={id} className="btn-ghost btn-sm btn">
            Cancel
          </label>

          <label
            htmlFor={id}
            onClick={onClick}
            data-testid="modal-action-button"
            className="btn-ghost btn-sm btn text-rose-700"
          >
            {btnActionLabel || "OK"}
          </label>
        </div>
      </label>
    </label>
  </div>
);

export default Modal;
