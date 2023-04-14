import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { PropTypes } from "prop-types";
import React from 'react';

// Button object is
// { value: 'buttonValue', label: 'buttonLabel' }


//USed for modal forms in a row 

export const RadioButtonGroupItem = ({ name, initialValue, buttons, onRadioButtonChange, horizontal, disabled = false}) => {

    return (
        <RadioGroup row={horizontal} name={name} value={initialValue} onChange={onRadioButtonChange} >
            {
                buttons.map((button) => (
                    <FormControlLabel key={button.value} value={button.value} control={<Radio key={name} />} label={button.label} disabled={disabled} />
                ))
            }
        </RadioGroup>
    )
}


export const ControlledRadioButtonGroupItem = ({ name, value, buttons, onRadioButtonChange, horizontal, disabled = false}) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: {name, onChange} }) => (   
                <RadioGroup 
                    row={horizontal} 
                    name={name} 
                    value={value} 
                    onChange={(e) => {
                        onChange(e);
                        onRadioButtonChange(e)
                    }}
                >
                    {
                        buttons.map((button) => (
                            <FormControlLabel key={button.value} value={button.value} control={<Radio key={name} />} label={button.label} disabled={disabled} />
                        ))
                    }
                </RadioGroup>
            )}   
        />
    )
}

RadioButtonGroupItem.propType = {
    name: PropTypes.string,
    initialValue: PropTypes.string,
    buttons: PropTypes.array,
    onChange: PropTypes.func,
    horizontal: PropTypes.bool
};