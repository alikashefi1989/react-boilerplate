// custom
import useCrudService, { CRUD_URI } from "./crud.service";

const useUserService = (crudUri: CRUD_URI) => {

    const { baseService, ...rest } = useCrudService(crudUri);

    const notCommonService = () => {
        return baseService.get('todos')
    };

    return { ...rest, notCommonService };
}

export default useUserService;