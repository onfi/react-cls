import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routeIds = ["1", "2", "3", "4", "5", "5-2", "6", "6-2", "7", "8", "9","10"];

export default [
    index("routes/home.tsx"),
    ...routeIds.map(id => route(id, `./routes/${id}.tsx`)),
] satisfies RouteConfig;
