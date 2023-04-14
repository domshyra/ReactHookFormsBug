import { Grid, TextField } from "@mui/material";

import { Controller } from "react-hook-form";
import { PropTypes } from "prop-types";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { useFormContext } from "react-hook-form";

//TODO! This needs to be deprecated and TextItem can be used in its place

/**
 * This component is not meant for autosaves it is meant to be used in forms
 * @param {*} param0
 * @returns
 */
export const FormTextItem = ({ name, label, gridColumns, loaded, disabled, rules, onTextFieldBlur = () => {}, onTextFieldChange = () => {}, required = false, defaultValue = "", textAlign="left", multiline = false, className = "" }) => {
	const { control } = useFormContext();

	const textFieldRules = (required) => {
		return {
				validate: (value) => { 
					if (!value) {
						return !required;
					}
					const strValue = value.toString();
					return !!strValue.trim();
				},
				required: required
		}
	};


	const localRules = rules ?? textFieldRules(required);

	const isRequired = () => {
		if (rules) {
			//React hook forms sometimes has a string in the required object to denote the error message and if something is required.
			//rules.required will not always be a boolean type here. Converting manually.
			return !!rules.required;
		} else {
			return required;
		}
	};

	if (!loaded) {
		return (
			<Grid item xs={gridColumns}>
				<Skeleton mt={2} height={50} />
			</Grid>
		);
	} else {
		return (
			<Grid item xs={gridColumns}>
				<Controller
					control={control}
					name={name}
					defaultValue={defaultValue}
					render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
						<TextField
							fullWidth
							className={className}
							multiline={multiline}
							disabled={disabled}
							label={label}
							helperText={error?.message}
							variant="standard"
							color="primary"
							type="text"
							required={isRequired()}
							error={error !== undefined}
							value={value}
							onChange={(e) => {
								onChange(e);
								onTextFieldChange(e);
							}}
							InputProps={{
								inputProps: {
									style: { textAlign: textAlign },
								},
							}}
							inputRef={ref}
							onBlur={(e) => {
								onBlur(e);
								//TODO: needs an id to be able to update correct state variable
								onTextFieldBlur(e);
							}}
							// TODO: Add error message here.
						/>
					)}
					rules={localRules}
				/>
			</Grid>
		);
	}
};

FormTextItem.propType = {
	rules: PropTypes.object,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	gridColumns: PropTypes.number,
	disabled: PropTypes.boolean,
	loaded: PropTypes.boolean,
	required: PropTypes.boolean,
	onTextFieldBlur: PropTypes.func,
	onTextFieldChange: PropTypes.func,
	multiline: PropTypes.boolean,
};

export default FormTextItem;
