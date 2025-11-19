import React from "react";
import analyzeRefugeData from "./analyzeRefugeData";

export type RefugeEntry = Pick<
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

/**
 * Clean up goals:
 * - consolidate the same places
 * - remove whitespace
 * - standardize address format
 */
const DataOverview = () => {
  const [refugeEntries, setRefugeEntries] = React.useState<RefugeEntry[]>([]);

  const handleLoadData = React.useCallback(async () => {
    const json = await import("../data/sample.json");
    const data = json.default;

    analyzeRefugeData(data);

    // const byId = groupByKey(data, "id");

    // const matrix = pairwise(
    //   data.map((entry) => entry.id),
    //   (idA, idB) =>
    //     haversine(
    //       byId[idA][0].latitude,
    //       byId[idA][0].longitude,
    //       byId[idB][0].latitude,
    //       byId[idB][0].longitude
    //     )
    // );

    // console.table(matrix);

    setRefugeEntries(data);
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
