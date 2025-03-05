export type TupleFromUnion<T, U = T> = [T] extends [never]
  ? []
  : U extends U
    ? [U, ...TupleFromUnion<Exclude<T, U>>]
    : never;
