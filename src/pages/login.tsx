// module
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import styled from "@emotion/styled";
// custom
import Form from "../utils/form/form"
import { UserEntity } from "../models/user.model";
import StringInput from "../utils/form/elements/string-input";
import useStore, { Store } from "../store/store";

type Login = Omit<UserEntity, '_id'>;

const Login = (): ReactNode => {
    const navigate = useNavigate();
    const setToken = useStore((store: Store) => store.setToken);
    const setUser = useStore((store: Store) => store.setUser);
    const form: Login = { name: '', password: '' };

    return (
        <BoxWrapper>
            <Form<Login>
                formType='create'
                defaultValue={form}
                validation={LoginFormValidation}
                fieldsRenderer={(data: { reactHookFormObject: UseFormReturn<Login>; defaultValue: Login; }) => {
                    return <FieldsWrapper>
                        <Title>login</Title>
                        <StringInput<Login>
                            label={<>
                                <span style={{ paddingRight: '3px' }}>name</span>
                                <span style={{ color: 'red' }}>*</span>
                            </>}
                            name='name'
                            data={data}
                        />
                        <StringInput<Login>
                            label={<>
                                <span style={{ paddingRight: '3px' }}>password</span>
                                <span style={{ color: 'red' }}>*</span>
                            </>}
                            name='password'
                            data={data}
                        />
                        <Button
                            onClick={() => {
                                data.reactHookFormObject.handleSubmit(
                                    (data: Login) => {
                                        setToken('-----------------');
                                        setUser({ _id: '111', name: data.name });
                                    }
                                )()
                            }}
                        >
                            login
                        </Button>
                        <GoToRegister>
                            <RegisterButton
                                onClick={() => { navigate('/register') }}
                            >
                                register
                            </RegisterButton>
                        </GoToRegister>
                    </FieldsWrapper>
                }}
            />
        </BoxWrapper>
    )
};

export default Login;

const LoginFormValidation = yup.object({
    name: yup.string().required('field required'),
    password: yup.string().required('field required'),
}).required();

const BoxWrapper = styled.div(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,
    borderRadius: '10px',
}));

const Title = styled.h1(() => ({
    color: 'white',
    textTransform: 'capitalize',
}))

const FieldsWrapper = styled.div(() => ({
    width: '30%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px',
}));

const Button = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '55px',
    borderRadius: '8px',
    backgroundColor: '#1b1b1b',
    color: 'white',
    fontSize: '20px',
    margin: '10px',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid yellow',
    transition: 'color 1s',
    textTransform: 'capitalize',
    ':hover': {
        boxShadow: '0 0 0 2px #6c7501',
        color: '#d6e805'
    }
}));

const GoToRegister = styled.div(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '80px',
}));

const RegisterButton = styled.span(() => ({
    fontSize: '20px',
    cursor: 'pointer',
    color: 'white',
    textTransform: 'capitalize',
    ':hover': {
        color: 'burlywood'
    }
}))