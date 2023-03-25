import { ForwardedRef, Dispatch, SetStateAction } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useOnClickOutside } from "usehooks-ts";
interface IUserMenu {
  open: Boolean;
  setOpen: Dispatch<SetStateAction<Boolean>>;
}

const UserMenu = ({ open, setOpen }: IUserMenu) => {
  const { data: session } = useSession();

  return (
    <div
      className={`absolute right-0 top-12 z-50 my-4 ${
        open ? "" : "hidden"
      } list-none divide-y divide-gray-100 rounded bg-white text-base shadow `}
    >
      <div className="px-4 py-3" role="none">
        <p className="text-sm text-gray-900" role="none">
          {session?.user?.name || "User Name"}
        </p>
        <p className="text-sm font-medium text-gray-900 truncate " role="none">
          {session?.user?.email || "user@email.com"}
        </p>
      </div>
      <ul className="py-1" role="none">
        <li>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            role="menuitem"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default UserMenu;
