"use client";

import { search } from "@/actions";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { act } from "react-dom/test-utils";

// IMPORTANT NOTE: When utilizing useSearchParams in CLIENT COMPONENT
// Component that uses the hook must be wrapped in <Suspense>. Otherwise bug while building for prod.

// IMPORTANT NOTE: Accessing searchParams via props in SERVER COMPONENT will
// force your route to be dynamic (For build-time caching reasons).

function SearchInput() {
  const params = useSearchParams();
  const searchTerm = params.get("search");

  return (
    <form action={search}>
      <Input name="search" defaultValue={searchTerm || ""} />
    </form>
  );
}

export default SearchInput;
