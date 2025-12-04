# cladetable
This project is an idea I've wanted to explore for a while. Inspired by a phylogenetic cladogram I saw one time in a paper that I can't find anymore.

I spend a lot of time researching species of plants that little is written about. One technique that often comes in handy is looking at phylogenetic trees (particularly through the help of the OpenTreeOfLife project). However, it's quite cumbersome to look at a cladogram, find a related species, then look up that species to compare a particular trait I'm interested in (e.g. seed dormancy).

The most elegant solution I've found to this is to blend a cladogram with tables so you can visualize both relatedness *AND* morphology in one view.

My goal here is to create a reusable component that renders such visualizations.

## LOG

### 2025-12-02
I've added logic for trimming nodes that are single parents. Recursive solutions always end up being more elegant than I fear. I've also did a fair bit of refactoring of the type system to improve type safety. Still some work to do on that end. Oh and I've added a download button that uses `html-to-image` to generate a PNG. Hopefully that should make it easier to share visualizations.

Okay I've got to start eyeballing an MVP so I can move on from this project.

#### MVP Goals
- [ ] editable table
- [ ] fix the type system of nodes
- [ ] adding cacheing solution to minimize potential for spamming APIs

#### MVP Non-Goals
- [ ] drop-down to download visual in different formats (svg, jpeg, etc)
- [ ] color edges based on the order of the species

### 2025-11-30

#### useSyncExternalStore
I redid the useLocalStorage hook to utilize useSyncExternalStore and tbh I kinda hate it though I see the benefits.

#### newicks and csvs
The idea of a component that takes in a newick string and a csv string still greatly appeals to me but I've been thinking about alternative newick formats like NHX which is an extension of the newick format that allows for the annotation of nodes with additional properties. It looks something like this:

```newick
(A[&&NHX:S=human,E=1.1.1]:0.1,B[&&NHX])C[&&NHX:S=primates];
```

The `&&NHX` declaration is my least favorite part of this. It reminds me of [urn's in XML] which are arbitrary namespace declarations. I consider NHX more of a namespace than a data format because those attributes (e.g. `S`, `E`, etc) are precisely defined in the spec. In most data formats, a namespace declaration is done once. In NHX it's littered throughout the string whenever we wanna annotate a node. I also dislike the special `&&` syntax instead of just using something like `nodeA[format=NHX,S=human]`.

Anyways, all that is to say that I think there's an obvious generalization here of the format for any arbitrary data annotation. If I went in that direction, I could simplify the input to a single `newick` string instead of having to manage a csv file that needs to have corresponding ids. I like the idea but the main thing stopping me is the (surprising) lack of a standardized format NHX-like newick formats.

#### unparseNewick
I've also added an inverse function to `parseNewick` which actually turned out to be quite elegant and straightforward. This will make it easy to modify a newick tree by first transforming it into JSON and editing it programmatically then converting it back to a newick string.

### 2025-11-26
I've pretty much refucktored it to account for relatedness in a more sophisticated and dynamic way. One major limitation that still exists is when the entire lineage of a leaf node is non-monophyletic (e.g. *Sansevieria trifasciata*). In that case, we go all the way up to Mesangiospermae (core angiosperms) which contains 378,059 tips currently. Understandibly, the OpenTreeOfLife API says "yeah I'm not sending you all that" and errors out. Since I'm trying to avoid a backend for as long as possible, I don't really have a good solution for this beyond cacheing the entire tree. Hmmm, I suppose I could lazy load a giant newick file as an ultimate fallback since the case is pretty uncommon. I just checked and it's only 1.7MB for the `grafted_solution.tre` output (which doesn't include latin names) or 4.4MB for the `grafted_solution_ottnames.tre` output (which does include latin names).

Priorities:
- [ ] Extensive caching so I don't spam these APIs if I do publicly release this tool.
- [ ] Ability for component to take in a csv file for the attributes of the "table" part of this diagram.

### 2025-11-25
A lot has happened since the last log. I've added UI elements like buttons and inputs and redid a lot of the CSS to make a more consistent feel. I'm making my UI elements from scratch (well partially copied from other projects I've had) and it's been interesting to rebuild things from the ground up. I only found out about `FormData` and the `action` attribute on a `<form>` about a month ago and I've been using those to make a more "use the platform" set of UI elements.

Anyways I used those elements along with the nifty new-ish `<dialog>` element to create a "settings" dialog that will be used for users to provide their own API keys for particular APIs. Right now, it's really just for me to utilize my OneZoom API key without saving it anywhere. Oh and while building my `useLocalStorage` hook, I found out about `[useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)` which seems like a pretty neat tool as React works towards more integration with server components. But I also want to use it to improve my `useLocalStorage` hook and prevent hydration issues. That should also make it safer for me to access localStorage from different parts of my app.

That was all a few days ago. Today I implemented a monstrous function that I think will be the best representation of the usefulness of this project. The user story is:

1. enter in a species name
2. get a cladogram-table of well-known related species

As I've stated elsewhere, I'm often researching species that are not well known and being able to to visually compare what other species a given plant is related to has been a big aspiration for me. [OpenTree](https://tree.opentreeoflife.org/opentree/opentree15.1@mrcaott9477ott1006136/Actinidia-polygama--Actinidia-macrosperma) is awesome for that but it has the major limitation of showing you way too much. What I want is some sort of way to only show the "highlights" like "did you know this is a close relative of avocado?". To do that, I want to utilize OneZoom's [popularity API](https://www.onezoom.org/popularity/list?key=0&otts=913244&expand_taxa=True&max=100&names=True&include_raw=True&sort=raw) which gives a popularity index based on the number of hits to that species' corresponding Wikipedia article.

I've actually made incredible progress on this all in one day. Right now the `orchestrateInducedTree` is a monstrocity that calls 3 APIs:

1. It takes the given latin name to call WikiData for name resultion. From that, we get the Wikidata ID.
2. Then it hits Wikidata a second time to get a list of identifiers that will be relevant to a whole host of other APIs. This gives us the OpenTree (phylogeny), Catalogue of Life (taxonomy), GBIF (distribution), iNaturalist (observation), and a whole host of other IDs.
3. Using the OTT ID, we call OpenTree to get the lineage of that species and we find a parent node that has a sizeable number of tips.
4. Then we feed all those tips to OneZoom's popularity API and select a handful of the most popular species.
5. Finally, we take those popular kids and create an induced tree using OpenTree's induced tree API. This gives us a Newick string we can feed into the CladeTable component.

The current approach has a large number of pitfalls I plan to remedy soon.

1. Wikidata is incomplete. Sometimes names don't resolve or identifiers are missing. As a backup, I will use OpenTree's API for name resolution but I also hope to manually contribute some missing identifiers to Wikidata. I should keep a list of these problems for future reference. This is my favorite part of crowdsourced projects. My own project can benefit future people's projects.
2. OneZoom's API only works with non-synthetic OTT nodes. That means they have to be at species, genus, family, order, etc -level. The biggest problem with this is that a significant number of taxa are not monophyletic. Meaning they lack an OTT ID. I often find that the current algorithm ends up going all the way to Magnoliopsida (all flowering plants) just to find a node that works with OneZoom. This means you end up with a tree that contains coconut, avocado, kratom, potato, corn, taro, etc. It's kind of interesting in its own right but the lack of closely related nodes makes it not very useful.

I don't think either of the above are intractable problems and I feel happy enough for this [v0.1](https://0ver.org/) release. But I do have plans and `TODO`s for how to solve these issues.

An incredible discovery I've made while working on this is that OpenTreeOfLife has an API endpoint for "induced trees". Meaning I can give it a list of species and it will construct the minimal tree that shows just those leaves. That's actually a project I've wanted to create myself for a long time so it's incredible to see it's already done and usable. If you wanted to visualize how beans, lentils, chickpeas, peas, soybeans, fava beans, mung beans, and peanuts are related to each other, you could utilize this API to construct a tree.

Thanks [Jules Blom](https://julesblom.com/writing/usesyncexternalstore).

### 2025-11-21
I've added both major features of columns with custom rendering logic *and* the cladogram supporting dynamic row heights. Both ended up significantly easier than I anticipated. All that's really left is clean up and polish.

The main thing that I'm realizing is that the component is boring without... data. A table with just an OTT ID and a Latin Name column is pretty useless to look at.

I found out an easy way to scrape the `ser-sid.org` database (their apiKey is public). Not sure if I should build my own backend/database or try to make the front-end query it itself. I would also like to hit the `OneZoom` API to get popularity rankings for given taxons (based on the popularity of their corresponding Wikipedia article). I have a private key the OneZoom team graciously provided me with that I don't wanna expose. If I don't build a backend and go for a local-first approach, I'll have to build UI for users to supply their own API keys for such services.

Public APIs:
- WikiData
- Seed Information Database
- Open Tree of Life

Private APIs:
- OneZoom

There's also a couple of databases that don't have APIs that I'd like to scrape purely for archival/preservation purposes: [X] SID; [ ] PFAF; [x] Ecocrop; [X] Useful Tropical Plants; [ ] Paldat; [ ] NAEB; [ ] florapal.org; [ ] Feedipedia

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
