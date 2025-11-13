import React from "react";

type RefugeEntry = Pick<
  typeof import("../data/sample.json")[number],
  | "edit_id"
  | "id"
  | "accessible"
  | "approved"
  | "changing_table"
  | "city"
  | "comment"
  | "country"
  | "directions"
  | "downvote"
  | "latitude"
  | "longitude"
  | "name"
  | "state"
  | "street"
  | "unisex"
  | "upvote"
  | "created_at"
  | "updated_at"
>;

const DataOverview = () => {
  const [refugeEntries, setRefugeEntries] = React.useState<RefugeEntry[]>([]);

  const handleLoadData = React.useCallback(async () => {
    const data = await import("../data/sample.json");

    setRefugeEntries(data.default);
  }, []);

  return refugeEntries.length ? (
    <div>
      <p>There are {refugeEntries.length} entries loaded.</p>
    </div>
  ) : (
    <button onClick={handleLoadData}>Load data...</button>
  );
};

export default React.memo(DataOverview);
