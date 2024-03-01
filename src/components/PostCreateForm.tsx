"use client";

import { createPost } from "@/actions";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "./FormButton";

interface PostCreateFormProps {
  slug: string;
}

function PostCreateForm({ slug }: PostCreateFormProps) {
  const [{ errors }, action] = useFormState(createPost.bind(null, slug), {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="warning" className="text-white border-black border">
          Create Post
        </Button>
      </PopoverTrigger>

      <PopoverContent className="border border-black">
        <form action={action} className="flex flex-col gap-4 p-4 w-80">
          <h3 className="text-lg">Create Post</h3>
          <Input
            label="Title"
            name="title"
            labelPlacement="outside"
            placeholder="Title Name"
            isInvalid={!!errors.title}
            errorMessage={errors.title?.join(". ")}
          />
          <Textarea
            label="Content"
            name="content"
            labelPlacement="outside"
            placeholder="Content"
            isInvalid={!!errors.content}
            errorMessage={errors.content?.join(". ")}
          />

          {errors._form && (
            <div className="p-2 bg-red-200 border border-red-400">
              {errors._form?.join(". ")}
            </div>
          )}

          <FormButton>Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default PostCreateForm;
