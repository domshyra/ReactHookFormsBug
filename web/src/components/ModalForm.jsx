import { Alert, Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { FormProvider, useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { ControlledRadioButtonGroupItem } from "./RadioButtonGroupItem";
import { DevTool } from "@hookform/devtools";
import { FormCheckBoxItem } from "./FormCheckBoxItem";
import FormTextItem from "./FormTextItem";
import { calculateCredit } from "./calculations";

const ModalForm = ({ onSave, data, setShowModal }) => {
	const isNewForm = Object.keys(data).length === 0;
	const [formValues, setFormValues] = useState(isNewForm ? {} : data);
	const [credit, setCredit] = useState(0);
	const [showAlert, setShowAlert] = useState(false);
	const [serverErrors, setServerErrors] = useState("");
	const [showValidationError, setShowValidationError] = useState(false);

	const methods = useFormContext({ mode: "onChange" });

	const loaded = true;

	const onFormSubmit = (data) => {
		if (!data.id) {
			data.id = "Some guid";
		}
		data = { ...data, credit };
		onSave(data)
			.then(() => {
				setShowModal(false);
				methods.reset();
			})
			.catch((error) => {
				if (error?.status === 401 || error?.status === 403) {
					//user is doing something they don't have access to
					setServerErrors("Not allowed to save");
				}
				setShowAlert(true);
				setServerErrors("Error saving Modal Form");
				return;
			});
	};

	const radioButtons = [
		{ value: "addition", label: "Addition" },
		{ value: "replacement", label: "Replacement" },
	];

	//Set error on formState if we have showValidationError, otherwise clear error and trigger validation so we can save
	useEffect(() => {
		if (showValidationError) {
			methods.setError("creditField");
		} else {
			methods.clearErrors("creditField");
			methods.trigger("creditField");
		}
	}, [showValidationError]);

	useEffect(() => {
		methods.reset(formValues, { keepDefaultValues: false, keepIsValid: false });
		methods.clearErrors();
		recalculateCredit();
		return () => {
			methods.reset();
		};
	}, [data]);

	const handleRadioButtons = (e) => {
		setFormValues({ ...formValues, radioButtonIds: e.target.value });
		methods.setValue("radioButtonIds", e.target.value, { shouldDirty: true });
	};

	const recalculateCredit = () => {
		setShowValidationError(false);
		const credit = calculateCredit(methods.getValues());
		if (credit > 100) {
			setShowValidationError(true);
		}
		setCredit(credit);
	};

	return (
		<FormProvider {...methods}>
			<Box
				component="form"
				id="modalForm"
				noValidate
				autoComplete="off"
				onSubmit={(e) => {
					e.stopPropagation();
					methods.handleSubmit(onFormSubmit)(e);
				}}
			>
				<Grid item xs={12} pb={0}>
					<Typography variant="h5">{isNewForm ? "Add" : "Edit"} Modal Form</Typography>
					<Typography variant="button" color="error.main">
						* = required field
					</Typography>
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs={12} pb={2}>
						<FormTextItem
							name="textField"
							label="text Field"
							gridColumns={5}
							loaded={loaded}
							required={true}
						/>
					</Grid>
					<Grid item xs={6} pb={2}>
						<Grid item xs={12}>
							<Typography variant="button">Checkboxes Numbered</Typography>
						</Grid>
						<FormCheckBoxItem
							name="checkboxesNumbered.quarterly"
							label="Checkbox 1 - 45%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesNumbered.quarterly", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesNumbered.quarterly ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesNumbered.semiAnnual"
							label="Checkbox 2 - 25%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesNumbered.semiAnnual", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesNumbered.semiAnnual ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesNumbered.annual"
							label="Checkbox 3 - 10%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesNumbered.annual", e.target.checked, { shouldDirty: true });
							}}
							selected={formValues.checkboxesNumbered.annual ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesNumbered.none"
							label="Checkbox 4 - 0%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesNumbered.none", e.target.checked, { shouldDirty: true });
							}}
							selected={formValues.checkboxesNumbered.none ?? false}
						/>
					</Grid>
					<Grid item xs={6} pb={2}>
						<Grid item xs={12}>
							<Typography variant="button">Checkbox Letters</Typography>
						</Grid>
						<FormCheckBoxItem
							name="checkboxesLettered.twentyPercent"
							label="A - 20%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesLettered.twentyPercent", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesLettered.twentyPercent ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesLettered.fifteenPercent"
							label="B - 15%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesLettered.fifteenPercent", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesLettered.fifteenPercent ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesLettered.tenPercent"
							label="C - 10%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesLettered.tenPercent", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesLettered.tenPercent ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesLettered.fivePercent"
							label="D - 5%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesLettered.fivePercent", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesLettered.fivePercent ?? false}
						/>
						<FormCheckBoxItem
							name="checkboxesLettered.zeroPercent"
							label="E - 0%"
							loaded={loaded}
							onChange={(e) => {
								recalculateCredit();
								methods.setValue("checkboxesLettered.zeroPercent", e.target.checked, {
									shouldDirty: true,
								});
							}}
							selected={formValues.checkboxesLettered.zeroPercent ?? false}
						/>
					</Grid>
					<Grid item xs={6} pb={2}>
						<Grid item xs={12}>
							<Typography variant="button" gutterBottom>
								Modal Form Is
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Grid container direction="row">
								<ControlledRadioButtonGroupItem
									horizontal
									name="radioButtonIds"
									value={formValues.radioButtonIds}
									buttons={radioButtons}
									onRadioButtonChange={handleRadioButtons}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6} pb={2}>
						<Typography variant="h6" sx={{ paddingTop: 2 }}>
							Total Modal Form Credit: {credit}
						</Typography>
						{showValidationError ? (
							<Typography variant="caption" textAlign="right">
								Total Modal Form Credit cannot exceed 100%
							</Typography>
						) : null}
					</Grid>
				</Grid>

				<Grid container spacing={1} pt={2} mt={2}>
					<Collapse in={showAlert} pb={2} mb={2}>
						<Alert
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setShowAlert(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							variant="outlined"
							severity="error"
						>
							{serverErrors}
						</Alert>
					</Collapse>
				</Grid>
				<DevTool control={methods.control} />
			</Box>
		</FormProvider>
	);
};

export default ModalForm;
