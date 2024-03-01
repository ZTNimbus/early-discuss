"use client";

import { createTopic } from "@/actions";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../FormButton";

function TopicCreateForm() {
  const [{ errors }, action] = useFormState(createTopic, { errors: {} });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="warning" className="text-white border-black border">
          Create Topic
        </Button>
      </PopoverTrigger>

      <PopoverContent className="border border-black">
        <form action={action} className="flex flex-col gap-4 p-4 w-80">
          <h3 className="text-lg">Create Topic</h3>
          <Input
            label="Name"
            name="name"
            labelPlacement="outside"
            placeholder="Topic Name"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.join(". ")}
          />
          <Textarea
            label="Description"
            name="description"
            labelPlacement="outside"
            placeholder="Topic Description"
            isInvalid={!!errors.description}
            errorMessage={errors.description?.join(". ")}
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

export default TopicCreateForm;
