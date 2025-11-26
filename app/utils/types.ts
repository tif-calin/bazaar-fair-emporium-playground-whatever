/** Returns a union of all method keys of a type/interface */
export type MethodKeys<ObjType extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof ObjType]: ObjType[K] extends Function ? K : never;
}[keyof ObjType];
