# cladetable
This project is an idea I've wanted to explore for a while. Inspired by a phylogenetic cladogram I saw one time in a paper that I can't find anymore.

I spend a lot of time researching species of plants that little is written about. One technique that often comes in handy is looking at phylogenetic trees (particularly through the help of the OpenTreeOfLife project). However, it's quite cumbersome to look at a cladogram, find a related species, then look up that species to compare a particular trait I'm interested in (e.g. seed dormancy).

The most elegant solution I've found to this is to blend a cladogram with tables so you can visualize both relatedness *AND* morphology in one view.

My goal here is to create a reusable component that renders such visualizations.

## LOG

### 2025-11-21
So I've added both major features of columns with custom rendering logic *and* the cladogram supporting dynamic row heights. Both ended up significantly easier than I anticipated. All that's really left is clean up and polish.

The main thing that I'm realizing is that the component is boring without... data. A table with just an OTT ID and a Latin Name column is pretty useless to look at.

I found out an easy way to scrape the `ser-sid.org` database (their apiKey is public). Not sure if I should build my own backend/database or try to make the front-end query it itself. I would also like to hit the `OneZoom` API to get popularity rankings for given taxons (based on the popularity of their corresponding Wikipedia article). I have a private key the OneZoom team graciously provided me with that I don't wanna expose. If I don't build a backend and go for a local-first approach, I'll have to build UI for users to supply their own API keys for such services.

Public APIs:
- WikiData
- Seed Information Database
- Open Tree of Life

Private APIs:
- OneZoom

There's also a couple of databases that don't have APIs that I'd like to scrape purely for archival/preservation purposes: [X] SID; [ ] PFAF; [x] Ecocrop; [X] Useful Tropical Plants; [ ] Paldat; [ ] NAEB; [ ] florapal.org

In addition, I'd like to add certain data points to WikiData from identifiers I've acquired from the above databases.

### 2025-11-19
I'm dreading implementing size tracking for the table rows so I'm working on tangental stuff.

I think I've gained a lot of clarity on what the final solution will look like. I've differentiated between the more "pure" CladeTable component and stuff specifically related to the phylogenetic use-case. I also think I can accomplish all I want with just the CladeTable component and a simple `<textarea>` for the newick tree.

The `CladeTable` component will allow for any cell in the table-part of it to be a `ReactNode`. I'm planning for the `PhylogeneticCladeTable` to render individual cells as editable `<input>`s.

Some TODOs I've amassed today:
- [ ] save textarea input to localStorage and make sure there's a "reset" button
- [ ] add link to repo in footer
- [ ] turn a lot of magic numbers into CladeTable#options like the horizontal spacing per "level" and the curvature of the edges
- [ ] for the `columns` API, add an optional function to decide how to render the cell content. Will have to do some digging into react table libraries to find an idiomatic convention
- [ ] support parsing of NHX features
- [ ] read from a latin name, fetch WikiData, use that to get OneZoom and various other APIs.

Thanks to [Timur Kelman](https://stackoverflow.com/questions/40843210).

### 2025-11-18 TODO: Figure out how to handle dynamically sized cell contents
Currently, the table only works if the height of the rows are static. A more complex cell (e.g. multiline) will fall out of sync with the placement of the leaves of the cladogram.

I'm chewing on two possible approaches for this:

1. Move the rows (or entire tables?) into the svg as a `<foreginObject>`.
2. Everything except the cladogram is in the table and we use `ResizeObserver`s and `useLayoutEffect` to track the positions/heights of each row.

I don't have much experience with `foreignObject`. I *do* have a lot of experience with the `ResizeObserver` API but it is tedious and I'm itching to explore an alternative. My primary constirnation is solving the problem of translating between pixels and SVG coordinates.

Update: Thanks to [Andy Clarke](https://stuffandnonsense.co.uk/blog/a-quick-note-about-svg-foreignobject) and [Sabatino Masala](https://www.sabatino.dev/how-this-small-change-saved-us-over-eu2-400-yearly/) for their writings on `foreignObject`. However, I don't think that approach solves the coordinate problem and I've accepted that something like a ResizeObserver will be necessary either way.
