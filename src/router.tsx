import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  return createRouter({
    routeTree,
    context: { queryClient },
    // Makes routing work when the site lives at username.github.io/<repo>/
    basepath: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
