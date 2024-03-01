"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  children: React.ReactNode;
}

function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      color="secondary"
      className="border border-black"
      isLoading={pending}
    >
      {children}
    </Button>
  );
}

export default FormButton;
