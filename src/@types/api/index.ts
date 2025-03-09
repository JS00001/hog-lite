export * from './response/user';
export * from './response/query';
export * from './response/organization';
export * from './response/dashboard';
export * from './response/event_definitions';

export * from './request/user';
export * from './request/query';
export * from './request/event_definitions';
export * from './request/organization';
export * from './request/dashboard';

export namespace API {
  export type Error = {
    type: string;
    code: string;
    detail: string;
  };

  export type Response<T> = T | Error;
}
