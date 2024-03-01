import Link from "next/link";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import HeaderAuth from "./HeaderAuth";
import SearchInput from "./SearchInput";
import { Suspense } from "react";

// const session = await auth();  auth() directly accesses cookies, which forces route to be dynamic. See if you can utilize useSession(), which makes a request to backend
// to access cookies, rather than directly itself. This does not force route to be dynamic.

function Header() {
  return (
    <Navbar className="mb-6 border border-black shadow-xl">
      <NavbarBrand className="">
        <Link href={"/"} className="font-bold">
          Early Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            {/* Fixes "Deopt into client-side rendering warning" on build */}
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {/*useSession() is used here in this client component to check login*/}
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
