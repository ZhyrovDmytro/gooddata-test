import React from "react";
import Label from "./Label";

import styles from "./Select.module.scss";

interface ISelectOption {
    value: string;
    text: string;
}
export interface ISelectProps extends React.HTMLProps<HTMLSelectElement> {
    options: ISelectOption[];
    disabled: boolean;
    id: string;
    labelText: string;
    defaultSelected?: string;
}

const Select: React.FC<ISelectProps> = ({
    options,
    disabled,
    id,
    defaultSelected,
    labelText,
    ...restProps
}) => {
    return (
        <>
            <Label htmlFor={id}>{labelText}</Label>
            <select {...restProps} disabled={disabled} value={defaultSelected} className={styles.Select}>
                {options.map((option: ISelectOption, idx: number) => {
                    return (
                        <option id={id} key={`${option.value}_${idx}`} value={option.value}>
                            {option.text}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default Select;
