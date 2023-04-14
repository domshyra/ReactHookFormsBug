import { Checkbox, FormControlLabel, Radio } from "@mui/material";
import React, { useState } from "react";

import { Controller } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import { useFormContext } from "react-hook-form";

export const FormCheckBoxItem = ({ name, label, loaded, disabled, selected, onChange: parentOnChange = () => {} }) => {
	return (
		<FormControlLabelItem
			name={name}
			label={label}
			loaded={loaded}
			disabled={disabled}
			render={({ field, fieldState: { error } }) => (
				<FormControlLabel
					control={
						<Checkbox
							{...field}
							key={selected} //Required here to get the component to rerender at the correct time on the apparatus form comp.
							defaultChecked={selected}
							disabled={disabled}
							onChange={(e) => {
								field.onChange(e);
								parentOnChange(e);
							}}
						/>
					}
					label={label}
				/>
			)}
		/>
	);
};

export const FormRadioButtonItem = ({ name, label, loaded, disabled, onChange: parentOnChange }) => {
	return (
		<FormControlLabelItem
			name={name}
			label={label}
			loaded={loaded}
			disabled={disabled}
			render={({ field, fieldState: { error } }) => (
				<FormControlLabel
					control={
						<Radio
							{...field}
							disabled={disabled}
							onChange={(e) => {
								field.onChange(e);
								parentOnChange(e);
							}}
						/>
					}
					label={label}
				/>
			)}
		/>
	);
};

export const FormControlLabelItem = ({ name, label, loaded, disabled, render }) => {
	const { control } = useFormContext();

	if (!loaded) {
		return <Skeleton mt={2} height={50} />;
	} else {
		return <Controller name={name} control={control} label={label} disabled={disabled} render={render} />;
	}
};
