"use server"
import { deleteToken } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function logout() {
    await deleteToken()
    redirect("/login")
}