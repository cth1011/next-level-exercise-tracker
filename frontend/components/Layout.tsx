import { useSession } from "next-auth/react";
import Image from "next/image";

import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import HamburgerMenu from "@/components/HamburgerMenu";
import Sidebar from "@/components/Sidebar";
import UserMenu from "@/components/UserMenu";
import Avatar from "./Avatar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [userMenu, setUserMenu] = useState<Boolean>(false);
  const [drawer, setDrawer] = useState<Boolean>(false);

  const authenticated = status === "authenticated";
  useOnClickOutside(drawerRef, () => {
    setDrawer(false);
  });

  useOnClickOutside(ref, () => {
    setUserMenu(false);
  });

  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        <div className="px-3 py-3 bg-white border-b lg:px-5 lg:pl-3 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div ref={drawerRef}>
                <button
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
                  onClick={() => setDrawer(!drawer)}
                >
                  <span className="sr-only">Open sidebar</span>

                  <HamburgerMenu />
                </button>
                <Sidebar open={drawer} setOpen={setDrawer} />
              </div>
              <span className="self-center ml-4 text-xl font-extrabold whitespace-nowrap text-rose-700">
                NextLevel
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div ref={ref}>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    onClick={() => setUserMenu(!userMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {authenticated ? (
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={session?.user?.image!}
                        alt="user photo"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-700">
                        <Avatar />
                      </div>
                    )}
                  </button>
                  <UserMenu open={userMenu} setOpen={setUserMenu} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-12 sm:ml-64">
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
