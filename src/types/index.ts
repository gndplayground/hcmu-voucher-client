export * from "./user";
export * from "./campaign";
export * from "./voucher";
export interface Meta {
  hasNextPage?: boolean;
}

export interface APIResponse<T> {
  data: T;
  meta?: Meta;
}
