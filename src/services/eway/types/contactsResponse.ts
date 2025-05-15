import { IApiResult } from "@eway-crm/connector";

export type TContactsResopnse = IApiResult & {
  Data: TContact[];
};

export type TContact = {
  FileAs: string | null;
  ItemGUID: string;
};

export type TPreviewResopnse = IApiResult & {
  Data: string;
};
