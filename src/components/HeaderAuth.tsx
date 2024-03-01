"use client";

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { login, logout } from "@/actions";
import { useSession } from "next-auth/react";

function HeaderAuth() {
  const session = useSession();

  if (session.status === "loading") return <div>Loading</div>;

  return (
    <>
      {session?.data?.user && (
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar
              src={session.data.user.image || ""}
              className="cursor-pointer"
            />
          </PopoverTrigger>

          <PopoverContent>
            <div className="p-4">
              <form action={logout}>
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {!session?.data?.user && (
        <>
          <NavbarItem>
            <form action={login}>
              <Button type="submit" color="secondary" variant="bordered">
                Sign In
              </Button>
            </form>
          </NavbarItem>

          <NavbarItem>
            <form action={login}>
              <Button type="submit" color="primary" variant="flat">
                Sign Up
              </Button>
            </form>
          </NavbarItem>
        </>
      )}
    </>
  );
}

export default HeaderAuth;
