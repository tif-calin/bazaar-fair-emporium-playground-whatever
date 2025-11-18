/**
 * Takes a list of objects and groups them by a given key.
 */
export const groupByKey = <Obj extends { [key in Key]: PropertyKey }, Key extends string>(
  items: Obj[],
  key: Key
) =>
  items.reduce((acc, item) => {
    const typename = item[key];
    acc[typename] ||= [];
    acc[typename].push(item);
    return acc;
  }, {} as Record<Obj[Key], Obj[]>);
