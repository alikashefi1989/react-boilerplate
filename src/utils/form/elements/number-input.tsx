// module
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";

interface NumberInputProps<EntityModel extends Record<string, any>> {
    label: string | JSX.Element;
    name: keyof EntityModel;
    data: { reactHookFormObject: UseFormReturn<EntityModel>, defaultValue: EntityModel };
    registerOptions?: RegisterOptions<EntityModel, any>
    width?: React.CSSProperties['width'];
}

const NumberInput = <EntityModel extends Record<string, any>>(props: NumberInputProps<EntityModel>): JSX.Element => {
    return <Wrapper width={props.width}>
        <Label>{props.label}</Label>
        <NumberInputWrapper
            type='number'
            key={props.name.toString()}
            defaultValue={props.data.defaultValue[props.name]}
            error={typeof props.data.reactHookFormObject.formState.errors[props.name] !== 'undefined'}
            {...props.data.reactHookFormObject.register(props.name as any, props.registerOptions ? { ...props.registerOptions } : undefined)}
        />
        <Error>{`${props.data.reactHookFormObject.formState.errors[props.name]?.message}`}</Error>
    </Wrapper>;
};

export default NumberInput;

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

interface NumberInputWrapperProps {
    error: boolean
}

const NumberInputWrapper = styled.input((props: NumberInputWrapperProps) => ({
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