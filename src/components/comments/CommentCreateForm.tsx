"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "../FormButton";
import { createComment } from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);

  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  return (
    <div>
      <Button
        size="sm"
        variant="shadow"
        onClick={() => setOpen(!open)}
        className="mb-2"
      >
        {open ? "Hide" : "Reply"}
      </Button>

      {open && (
        <form action={action} ref={ref}>
          <div className="space-y-3 px-1">
            <Textarea
              className="border border-black"
              name="content"
              placeholder="Enter your comment"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(". ")}
            />

            {formState.errors._form && (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {formState.errors._form?.join(". ")}
              </div>
            )}

            <FormButton>Create Comment</FormButton>
          </div>
        </form>
      )}
    </div>
  );
}

export default CommentCreateForm;
