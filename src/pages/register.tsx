// module
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import * as yup from "yup";
import styled from "@emotion/styled";
// custom
import Form from "../utils/form/form"
import { UserEntity } from "../models/user.model";
import StringInput from "../utils/form/elements/string-input";

type Login = Omit<UserEntity, '_id'> & { confirmPassword: string };

const Login = (): ReactNode => {
    const form: Login = { name: '', password: '', confirmPassword: '' }

    return (
        <BoxWrapper>
            <Form<Login>
                formType='create'
                defaultValue={form}
                validation={LoginFormValidation}
                fieldsRenderer={(data: { reactHookFormObject: UseFormReturn<Login>; defaultValue: Login; }) => {
                    return <FieldsWrapper>
                        <Title>register</Title>
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
                            type='password'
                            data={data}
                        />
                        <StringInput<Login>
                            label={<>
                                <span style={{ paddingRight: '3px' }}>confirm password</span>
                                <span style={{ color: 'red' }}>*</span>
                            </>}
                            name='confirmPassword'
                            type='password'
                            data={data}
                        />
                        <Button
                            // onClick={() => {
                            //     data.reactHookFormObject.handleSubmit(
                            //         (data: Login) => console.log(data)
                            //     )()
                            // }}
                        >
                            register
                        </Button>
                    </FieldsWrapper>
                }}
            />
        </BoxWrapper>
    )
};

export default Login;

const LoginFormValidation = yup.object({
    name: yup
        .string()
        .required('field required'),
    password: yup
        .string()
        .required('field required'),
    confirmPassword: yup
        .string()
        .required('field required')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
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