"use client";

import { useSession } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user && <h1>You are logged in.</h1>}
      {!session?.user && <h1>You are not logged in.</h1>}
    </div>
  );
}

export default Profile;
