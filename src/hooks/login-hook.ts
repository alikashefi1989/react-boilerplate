// module
import { useLayoutEffect, useState } from "react";
// custom
import useStore, { Store, extractPersistedAppGolbalStore } from "../store/store";

const isLoginInitialState = (): boolean => {
    const user = extractPersistedAppGolbalStore<Store['user']>('user');
    const token = extractPersistedAppGolbalStore<Store['token']>('token');
    if (user !== null && token !== null) return true;
    return false;
}

const useIslogin = (): boolean => {
    const user: Store['user'] = useStore((store: Store) => store.user);
    const token: Store['token'] = useStore((store: Store) => store.token);

    const [isLogin, setIsLogin] = useState<boolean>(isLoginInitialState());

    useLayoutEffect(() => {
        if (user !== null && token !== null) {
            if (!isLogin) {
                setIsLogin(true);
            }
        } else {
            if (isLogin) {
                setIsLogin(false);
            }
        }
    }, [user, token, isLogin]);

    return isLogin;
}

export default useIslogin;