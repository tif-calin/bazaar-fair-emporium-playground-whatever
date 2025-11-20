# cladetable
This project is an idea I've wanted to explore for a while. Inspired by a phylogenetic cladogram I saw one time in a paper that I can't find anymore.

I spend a lot of time researching species of plants that little is written about. One technique that often comes in handy is looking at phylogenetic trees (particularly through the help of the OpenTreeOfLife project). However, it's quite cumbersome to look at a cladogram, find a related species, then look up that species to compare a particular trait I'm interested in (e.g. seed dormancy).

The most elegant solution I've found to this is to blend a cladogram with tables so you can visualize both relatedness *AND* morphology in one view.

My goal here is to create a reusable component that renders such visualizations.

## LOG

### 2025-11-18 TODO: Figure out how to handle dynamically sized cell contents
Currently, the table only works if the height of the rows are static. A more complex cell (e.g. multiline) will fall out of sync with the placement of the leaves of the cladogram.

I'm chewing on two possible approaches for this:

1. Move the rows (or entire tables?) into the svg as a `<foreginObject>`.
2. Everything except the cladogram is in the table and we use `ResizeObserver`s and `useLayoutEffect` to track the positions/heights of each row.

I don't have much experience with `foreignObject`. I *do* have a lot of experience with the `ResizeObbserver` API but it is tedious and I'm itching to explore an alternative. My primary constirnation is solving the problem of translating between pixels and SVG coordinates.
