import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, ReactNode, useState} from "react";
import s from "./SuperInputText.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: boolean
    spanClassName?: string
    errorMes?: string
    setError?:(value:boolean) => void
    className?:string
    children?: ReactNode
};

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        errorMes,
        onBlur,
        setError,
        value,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }
    const [ErrorBlur, setErrorBlur] = useState<boolean>(false)
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `${s.superInput} ${ErrorBlur && error ? s.errorInput : className ? s[className] : ''}`; // need to fix with (?:) and s.superInput

    const onBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        if (error) {
            onBlur && onBlur(e)
            setErrorBlur(true)
        } else if (!value){
            onBlur && onBlur(e)
            setErrorBlur(true)
            setError && setError(true)
        } else {
            setErrorBlur(false)
        }
    }
    return (
        <>
            <input
                type={type ? type : 'text'}
                onChange={onChangeCallback}
                value={value}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                onBlur={ onBlurHandler}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            {ErrorBlur && error ? <span className={finalSpanClassName}>{errorMes}</span> :
                <span className={finalSpanClassName}> </span>}
        </>
    );
}

export default SuperInputText;
