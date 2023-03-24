import React, { FC, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import X from "@/components/X";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [isOpen, setOpen] = useState<Boolean>(false);
  return (
    <>
      <nav className="px-6 py-6 sm:px-4">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-extrabold whitespace-nowrap text-rose-700">
            NextLevel
          </span>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HamburgerMenu />
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 ">
              <li>
                <Link
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/api/auth/signin"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="">
                <span className="sr-only">NextLevel</span>
                <span className="self-center text-xl font-extrabold whitespace-nowrap text-rose-700">
                  NextLevel
                </span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X onClick={() => setOpen(false)} />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link
                    href="/api/auth/signin"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
