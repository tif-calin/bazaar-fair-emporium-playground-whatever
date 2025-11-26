import type { MethodKeys } from "./types";

type Method =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";

type Props = {
  url: string;
  init?: RequestInit & { method: Method };
  opts?: Partial<{
    crawlDelay: number;
    readAs: Extract<MethodKeys<Body>, "arrayBuffer" | "blob" | "bytes" | "json" | "text">;
  }>;
};

let lastQuery = Date.now();
export const httpRequest = async <T = unknown>({ url, init, opts }: Props) => {
  if (opts?.crawlDelay) {
    const timeToWait = opts.crawlDelay - (Date.now() - lastQuery);
    if (timeToWait > 0) await new Promise((resolve) => setTimeout(resolve, timeToWait));
    lastQuery = Date.now();
  }

  const response = await fetch(url, init);

  if (response.status <= 299) {
    return (await response[opts?.readAs || "json"]()) as T;
  } else if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  return null;
};
