// module
import Axios, { AxiosInstance } from 'axios';
// custom
import useStore, { Store } from '../store/store';

const useBaseService = (): AxiosInstance => {
    const token: Store['token'] = useStore((store: Store) => store.token);

    const axiosInstance: AxiosInstance = Axios.create();
    axiosInstance.defaults.baseURL = import.meta.env.VITE_APP_ENDPOINT;
    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
    if (token !== null) {
        axiosInstance.defaults.headers['authorization'] = `Bearer ${token}`;
    }

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    )

    return axiosInstance;
}

export default useBaseService;