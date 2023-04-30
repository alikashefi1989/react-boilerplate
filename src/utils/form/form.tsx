// module
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled'

export type FormType = 'create' | 'update';

export interface TaskFormProps<EntityModel extends Record<string, any>> {
    formType: FormType;
    defaultValue: EntityModel;
    validation: any;
    useFormProps?: UseFormProps<EntityModel, any>;
    flexDirection?: React.CSSProperties['flexDirection'];
    fieldsRenderer: (data: { reactHookFormObject: UseFormReturn<EntityModel>, defaultValue: EntityModel }) => JSX.Element | Array<JSX.Element>;
}

const Form = <EntityModel extends Record<string, any>>(props: TaskFormProps<EntityModel>) => {
    const reactHookFormObject = useForm<EntityModel>({ resolver: yupResolver(props.validation), mode: 'all', ...props.useFormProps });
    return <FormWrapper flexDirection={props.flexDirection}>
        {props.fieldsRenderer({ reactHookFormObject, defaultValue: props.defaultValue })}
    </FormWrapper>;
}

export default Form;


interface FormWrapperProps {
    flexDirection?: React.CSSProperties['flexDirection']
}

const FormWrapper = styled.form((props: FormWrapperProps) => ({
    width: '100%',
    maxWidth: '100%',
    height: 'max-content',
    maxHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0,
    fontFamily: 'sans-serif',
    flexDirection: props.flexDirection,
}));