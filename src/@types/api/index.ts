export * from "./response/user";
export * from "./response/query";
export * from "./response/organization";

export * from "./request/user";
export * from "./request/query";
export * from "./request/organization";

export namespace API {
  export type Error = {
    type: string;
    code: string;
    detail: string;
  };

  export type Response<T> = T | Error;
}
