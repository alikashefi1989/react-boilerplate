// module
import { ReactNode } from "react";
// custom
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const appRoutes: Array<{
    path: string;
    auth: boolean;
    cmp: () => ReactNode;
}> = [
        {
            path: '/',
            auth: true,
            cmp: Home,
        },
        {
            path: '/register',
            auth: false,
            cmp: Register,
        },
        {
            path: '/login',
            auth: false,
            cmp: Login,
        },
        {
            path: '/hhh',
            auth: true,
            cmp: Home
        }
    ];

export default appRoutes;