"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function UserAvatar() {
	return <Button onClick={() => signOut()}>Sign Out</Button>;
}
