import { marked } from 'marked';

// const markdownRenderer = new marked.Renderer();

// (() => {
//   const headings: { slug: string; text: string }[] = [];

//   markdownRenderer.heading = ({ depth, text }) => {
//     const slug = text.toLowerCase().replace(/[^\w]+/g, '-');

//     headings.push({ slug, text });

//     return `<h${depth} id="h${depth}-${slug}">${text}</h${depth}>`;
//   };
// })();

// export default markdownRenderer;

export const mdToHtml = async (md: string) => {
  const opts = {
    withToc: true,
  };

  const renderer = new marked.Renderer();
  const headings: { slug: string; text: string; depth: number }[] = [];

  renderer.heading = ({ depth, text }) => {
    let slug = text.toLowerCase().replace(/[^\w]+/g, '-');
    slug = `h${depth}-${slug}`;

    headings.push({ slug, text, depth });

    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  };

  let html = await marked.parse(md, { renderer });

  if (opts.withToc) {
    const baseDepth = Math.min(...headings.map(({ depth }) => depth));
    const toc = `<nav class="toc"><ul>${headings
      .map(({ slug, text, depth }, i, arr) => {
        const prevDepth = arr[i - 1]?.depth;
        const nextDepth = arr[i + 1]?.depth;

        let content = `<li><a href="#${slug}">${text}</a></li>`;
        if (prevDepth && prevDepth < depth) content = `<ul>${content}`;
        if ((!nextDepth && depth > baseDepth) || (nextDepth && nextDepth < depth))
          content = `${content}</ul>`;
        return content;
      })
      .join('')}</ul></nav>`;
    html = html.replaceAll(`<p>{{TOC}}</p>`, toc);
  }

  return html;
};
