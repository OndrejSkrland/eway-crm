import {
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import type { ReactNode } from "react";

export type AsyncStatusType = "pending" | "error" | "idle" | "success";

export interface AsyncStatusProps {
  status: AsyncStatusType;
  successMessage?: ReactNode;
}

export function getMessageBarType(
  status: AsyncStatusType
): MessageBarType | undefined {
  if (status === "pending") return MessageBarType.info;
  if (status === "error") return MessageBarType.error;
  if (status === "success") return MessageBarType.success;
  return undefined;
}

export function AsyncStatus({ status, successMessage }: AsyncStatusProps) {
  if (status === "idle") return null;
  if (status === "success" && !successMessage) return null;

  const messageBarType = getMessageBarType(status);
  return (
    <MessageBar messageBarType={messageBarType}>
      {status === "pending" && (
        <div className="flex gap-3 items-center">
          <span>Načítám...</span>
          <Spinner size={SpinnerSize.xSmall} />
        </div>
      )}
      {status === "error" && "Erorr message"}
      {status === "success" && successMessage}
    </MessageBar>
  );
}
