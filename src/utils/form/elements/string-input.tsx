// module
import { HTMLInputTypeAttribute } from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";

interface StringInputProps<EntityModel extends Record<string, any>> {
    name: keyof EntityModel;
    label: string | JSX.Element;
    data: { reactHookFormObject: UseFormReturn<EntityModel>, defaultValue: EntityModel };
    registerOptions?: RegisterOptions<EntityModel, any>;
    type?: HTMLInputTypeAttribute | undefined;
    width?: React.CSSProperties['width'];
}

const StringInput = <EntityModel extends Record<string, any>>(props: StringInputProps<EntityModel>): JSX.Element => {
    return <Wrapper width={props.width}>
        <Label>{props.label}</Label>
        <StringInputWrapper
            type={props.type}
            key={props.name.toString()}
            defaultValue={props.data.defaultValue[props.name]}
            error={typeof props.data.reactHookFormObject.formState.errors[props.name] !== 'undefined'}
            {...props.data.reactHookFormObject.register(props.name as any, props.registerOptions ? { ...props.registerOptions } : undefined)}
        />
        <Error>{`${typeof props.data.reactHookFormObject.formState.errors[props.name]?.message !== 'undefined' ? props.data.reactHookFormObject.formState.errors[props.name]?.message : ''}`}</Error>
    </Wrapper>;
};

export default StringInput;

interface WrapperProps {
    width?: React.CSSProperties['width']
}

const Wrapper = styled.div((props: WrapperProps) => ({
    width: props.width ? props.width : '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
    marginTop: '10px',
    marginBottom: '10px',
}));

interface StringInputWrapperProps {
    error: boolean
}

const StringInputWrapper = styled.input((props: StringInputWrapperProps) => ({
    width: '100%',
    height: '50px',
    border: `1px solid ${props.error ? 'red' : 'black'}`,
    borderRadius: '5px',
    fontSize: '20px',
    padding: '5px',
    marginBottom: '7px',
    marginTop: '10px',
    backgroundColor: 'white',
    color: 'black',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    fontWeight: 600
}));

const Label = styled.div(() => ({
    width: '100%',
    height: '15px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '20px',
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

const Error = styled.div(() => ({
    width: '100%',
    height: '15px',
    textAlign: 'left',
    fontWeight: 200,
    fontSize: '12px',
    color: 'red',
    fontFamily: 'sans-serif',
}));