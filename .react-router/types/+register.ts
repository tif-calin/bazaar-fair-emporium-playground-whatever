import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/refuge2": {};
  "/cladetable": {};
  "/cat-coats": {};
  "/make-cute-icon": {};
};