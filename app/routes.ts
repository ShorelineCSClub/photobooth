import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("camera", "routes/camera.tsx"),
	route("drag", "routes/drag.tsx"),
	route("stickers", "routes/stickers.tsx"),
] satisfies RouteConfig;
