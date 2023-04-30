// module
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// custom
import appRoutes from "../routes";
import useIslogin from "./login-hook";

const useAuth = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isLogin = useIslogin();
    const authLessPath: Array<string> = appRoutes
        .filter((route: { path: string; auth: boolean; cmp: () => React.ReactNode; }) => { return !route.auth })
        .map((route: { path: string; auth: boolean; cmp: () => React.ReactNode; }) => route.path)

    useEffect(() => {
        // console.log(authLessPath, pathname, isLogin)
        if (isLogin && authLessPath.includes(pathname)) {
            navigate('/');
            return
        }
        if (!isLogin && !authLessPath.includes(pathname)) {
            navigate('/login');
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, isLogin, authLessPath]);

    return;
}

export default useAuth;