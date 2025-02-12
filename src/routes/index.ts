import express from "express";
import authRoute from "./Auth.routes";
import userRoute from './User.Routes';

const router = express.Router();

const defaultRoutes = [
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/user",
        route: userRoute
    },
];

defaultRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
});

export default router; // Use `export default`
