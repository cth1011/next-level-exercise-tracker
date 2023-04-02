import React from "react";

interface IModal {
  id: string;
  title: string;
  btnActionLabel?: string;
  children: React.ReactNode;
}

const Modal = ({ id, btnActionLabel, title, children }: IModal) => (
  <>
    <input type="checkbox" id={id} className="modal-toggle" />
    <label htmlFor={id} className="cursor-pointer modal">
      <label className="relative max-w-xs modal-box" htmlFor="">
        <h3 className="text-lg font-bold">{title}</h3>
        <div>{children}</div>
        <div className="flex justify-end space-x-2 modal-action">
          <label htmlFor={id} className="btn-ghost btn-sm btn">
            Cancel
          </label>
          <label htmlFor={id} className="btn-ghost btn-sm btn text-rose-700">
            {btnActionLabel || "OK"}
          </label>
        </div>
      </label>
    </label>
  </>
);

export default Modal;
