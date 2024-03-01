"use server";

import paths from "@/paths";
import { redirect } from "next/navigation";

async function search(formData: FormData) {
  const searchTerm = formData.get("search");

  if (typeof searchTerm !== "string" || !searchTerm) redirect(paths.home());

  redirect(paths.search(searchTerm));
}

export { search };
