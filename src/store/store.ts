// module
import { create } from "zustand";
import { persist } from "zustand/middleware";
// custom
import { UserEntityGetModel } from "../models/user.model";

export interface DataOfStore {
    user: UserEntityGetModel | null;
    token: string | null;
    darkMode: boolean;
}

export interface ActionOfStore {
    setUser: (user: UserEntityGetModel) => void;
    resetUser: () => void;
    setToken: (token: string) => void;
    resetToken: () => void;
    login: (user: UserEntityGetModel, token: string) => void;
    logout: () => void;
    setDarkMode: (darkMode: boolean) => void;
}

export type Store = DataOfStore & ActionOfStore

const persistedStateName = 'app-golbal-store'

export const extractPersistedAppGolbalStore = <FieldType>(fieldName: keyof DataOfStore): FieldType | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const persistedData: any = localStorage.getItem(persistedStateName);
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedData: any = JSON.parse(persistedData);
        if ('state' in parsedData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const persistedAppGolbalStore: any = parsedData['state'];
            if (fieldName in persistedAppGolbalStore) {
                return persistedAppGolbalStore[fieldName];
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStore = create<Store, any>(
    persist((set, get) => (
        {
            user: extractPersistedAppGolbalStore<Store['user']>('user'),
            token: extractPersistedAppGolbalStore<Store['token']>('token'),
            darkMode: true,
            setUser: (user: UserEntityGetModel) => {
                const store: Store = get();
                set({ ...store, user });
            },
            resetUser: () => {
                const store: Store = get();
                set({ ...store, user: null });
            },
            setToken: (token: string) => {
                const store: Store = get();
                set({ ...store, token });
            },
            resetToken: () => {
                const store: Store = get();
                set({ ...store, token: null });
            },
            login: (user: UserEntityGetModel, token: string) => {
                const store: Store = get();
                set({ ...store, user, token });
            },
            logout: () => {
                const store: Store = get();
                set({ ...store, user: null, token: null });
            },
            setDarkMode: (darkMode: boolean) => {
                const store: Store = get();
                set({ ...store, darkMode });
            }
        }
    ),
        {
            name: persistedStateName,
            getStorage: () => localStorage,
        }
    )
)

export default useStore;