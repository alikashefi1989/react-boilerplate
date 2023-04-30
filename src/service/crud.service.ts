// module
import { AxiosInstance } from "axios"
// custom
import useBaseService from "./base.service"

const useCrudService = <EntityCreateModel, EntityUpdateModel>(crudUri: CRUD_URI) => {
    const baseService: AxiosInstance = useBaseService();

    const create = (data: EntityCreateModel) => {
        return baseService.post(`${crudUri}`, data);
    };

    const get = (id: string) => {
        return baseService.get(`${crudUri}/${id}`);
    };

    const update = (id: string, data: EntityUpdateModel) => {
        return baseService.put(`${crudUri}/${id}`, data);
    };

    const getAll = (payload?: { [key: string]: string | number | boolean }) => {
        return baseService.post(`${crudUri}/list`, payload);
    };

    const remove = (id: string) => {
        return baseService.delete(`${crudUri}/${id}`);
    };

    return { create, update, get, getAll, remove, baseService };
}

export default useCrudService;

export enum CRUD_URI {
    USERS = 'users',
    TODOS = 'todos',
    POSTS = 'posts'
}