import { Dispatch, SetStateAction, useRef } from "react";
import Avatar from "@/icons/Avatar";
import Link from "next/link";

interface ISidebar {
  open: Boolean;
  setOpen: Dispatch<SetStateAction<Boolean>>;
}

const Sidebar = ({ open, setOpen }: ISidebar) => {
  return (
    <aside
      className={`fixed top-0 left-0 -z-50 h-screen w-64 pt-20 transition-transform  ${
        open ? "translate-x-0" : "-translate-x-full"
      } border-r border-gray-200 bg-white sm:translate-x-0`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2">
          <li>
            <Link
              href="/app/dashboard"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/exercises"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Exercises</span>
              <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full ">
                Pro
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/workout"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Workout</span>
              <span className="inline-flex items-center justify-center h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                In Progress
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/profile"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <Avatar />
              <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
