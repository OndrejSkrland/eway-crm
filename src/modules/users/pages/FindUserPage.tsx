import { Text } from "@fluentui/react";
import type { FindUserFormValues } from "../components/FindUserForm";
import { FindUserForm } from "../components/FindUserForm";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "..";
import { AsyncStatus } from "../../../components/AsyncStatus";

export function FindUserPage() {
  const { mutate, status } = useMutation({
    mutationFn: usersApi.getUser,
  });
  const handleOnSubmit = (value: FindUserFormValues) => mutate(value);
  return (
    <div>
      <Text variant="large">Hledat osobu</Text>

      <FindUserForm className="mt-8" onSubmit={handleOnSubmit}>
        <AsyncStatus status={status} />
      </FindUserForm>
    </div>
  );
}
