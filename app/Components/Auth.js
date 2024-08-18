"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

function AuthUser() {
  const { user } = useUser();

  useEffect(() => {
    console.log(user, "current user");
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>Welcome, {user.firstName}!</div>;
}

export default AuthUser;
