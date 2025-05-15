import type { IContextualMenuProps } from "@fluentui/react";
import { DefaultButton, PrimaryButton, SearchBox, Text } from "@fluentui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useState,
  type DetailedHTMLProps,
  type HTMLProps,
  type PropsWithChildren,
} from "react";

export interface FindUserFormProps {
  onSubmit: (data: FindUserFormValues) => void;
}

export type FindUserFormValues = {
  email: string;
};

const historyLocalStorageKey = "email-history";

const findUserSchema = yup
  .object({
    email: yup
      .string()
      .email("Tento formát e-mailu není validní")
      .required("E-mail je povinný"),
  })
  .required();

export function FindUserForm({
  onSubmit,
  children,
  ...props
}: FindUserFormProps &
  Omit<
    DetailedHTMLProps<HTMLProps<HTMLFormElement>, HTMLFormElement>,
    "onSubmit" | "children"
  > &
  PropsWithChildren) {
  const [history, setHistory] = useState<string[]>(getHistory());

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<FindUserFormValues>({
    resolver: yupResolver(findUserSchema),
  });
  const menuProps = createMenuFromHistory(history, (email) =>
    setValue("email", email)
  );

  function handleOnSubmit(data: FindUserFormValues) {
    pushToHistory(data.email);
    setHistory(getHistory());
    onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(handleOnSubmit)(e).catch((err) => {
          console.error(err);
        });
      }}
      {...props}
    >
      <div className="flex flex-col gap-3 shadow-xl rounded-xl p-5">
        <div className="grid grid-cols-[1fr_min-content] gap-y-1">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <SearchBox
                className="rounded-r-none min-w-4"
                placeholder="Zadejte e-mail"
                value={field.value ?? ""}
                onChange={(_, value) => field.onChange(value ?? "")}
              />
            )}
          />
          {history.length > 0 && (
            <DefaultButton
              text="Historie"
              className="border-l-0 rounded-l-none"
              menuProps={menuProps}
            />
          )}
          {!isValid && (
            <Text variant="small" className="text-red-500 col-span-full">
              {errors.email?.message}
            </Text>
          )}
        </div>
        <PrimaryButton type="submit">Hledat</PrimaryButton>
        {children}
      </div>
    </form>
  );
}

function pushToHistory(email: string) {
  const history = localStorage.getItem(historyLocalStorageKey);
  if (!history) {
    localStorage.setItem(historyLocalStorageKey, JSON.stringify([email]));
  } else {
    const historyArray = JSON.parse(history) as string[];
    if (!historyArray.includes(email)) {
      historyArray.push(email);
      localStorage.setItem(
        historyLocalStorageKey,
        JSON.stringify(historyArray)
      );
    }
  }
}

function getHistory() {
  const history = localStorage.getItem(historyLocalStorageKey);
  if (!history) return [];
  else return JSON.parse(history) as string[];
}

function createMenuFromHistory(
  history: string[],
  setValue: (email: string) => void
): IContextualMenuProps {
  return {
    items: history.map((email) => ({
      key: email,
      text: email,
      onClick: () => setValue(email),
    })),
  };
}
