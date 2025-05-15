import { Text } from "@fluentui/react/lib/Text";
import { useTaskNavigate } from "..";
import { PrimaryButton } from "@fluentui/react";

export function ListPage() {
  const { toCreate } = useTaskNavigate();
  return (
    <div className="mt-20">
      <div className="flex justify-between gap-3">
        <Text variant="large">Seznam úkolů</Text>
        <PrimaryButton onClick={toCreate}>Nový</PrimaryButton>
      </div>
    </div>
  );
}
