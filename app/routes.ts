import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("1", "./routes/1.tsx"),
    route("2", "./routes/2.tsx"),
    route("3", "./routes/3.tsx"),
    route("4", "./routes/4.tsx"),
    route("5", "./routes/5.tsx"),
    route("6", "./routes/6.tsx"),
    route("7", "./routes/7.tsx"),
    route("8", "./routes/8.tsx"),
    route("9", "./routes/9.tsx"),
] satisfies RouteConfig;
