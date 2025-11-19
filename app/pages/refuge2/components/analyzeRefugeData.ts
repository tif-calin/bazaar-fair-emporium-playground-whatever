import { pythagorean } from "../utils/geodistance";
import type { RefugeEntry } from "./DataOverview";

const analyzeRefugeData = (entries: RefugeEntry[]) => {
  const pairwiseDistanceMatrix: Record<string, Record<string, number>> = {};
  const reallyCloseTogether: [number, RefugeEntry, RefugeEntry][] = [];
  const dontHaveCoordinates = [];

  // No bathrooms there on null island.
  const filteredEntries = entries.filter((entry) => {
    if (!entry.latitude || !entry.longitude) {
      dontHaveCoordinates.push(entry);
      return false;
    }

    return true;
  });

  filteredEntries.forEach((currEntry, index) => {
    const { id: currId } = currEntry;
    pairwiseDistanceMatrix[currId] ||= {};

    for (let j = index + 1; j < filteredEntries.length; j++) {
      const nextEntry = filteredEntries[j];

      if (nextEntry.id === currEntry.id) {
        console.log("what the fuck", currEntry.id, index, j);
      }

      const { id: nextId } = nextEntry;
      const distance = pythagorean(
        currEntry.latitude,
        currEntry.longitude,
        nextEntry.latitude,
        nextEntry.longitude
      );
      pairwiseDistanceMatrix[currId][nextId] = distance;

      if (distance < 50) reallyCloseTogether.push([distance, currEntry, nextEntry]);
    }
  });

  reallyCloseTogether.sort((a, b) => a[0] - b[0]);

  console.log("There are", reallyCloseTogether.length, "entries close together.");
  console.log(reallyCloseTogether);
};

export default analyzeRefugeData;
