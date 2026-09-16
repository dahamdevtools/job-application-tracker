import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return Response.json({ message: "Log out successful" });
}
