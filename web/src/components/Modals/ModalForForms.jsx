import { FormProvider, useForm } from "react-hook-form";

import DialogModal from "./DialogModal";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import React from "react";

/**
 * This modal is supposed to be used with a form.
 * The form provided will need to implement formContext for validation and need to call e.stopPropagation(); and methods.handleSubmit(SubmitFormFunctionOfYourChoosing)(e);
 * @param {*} param0
 * @returns
 */
//For code examples look how ApparatusForm and FireStation form are used. This will probably called by DataGridWithModal
const ModalForForms = ({ formId, disabled, showModal, handleClose, children, maxWidth = "md" }) => {
	const methods = useForm({
		mode: "onChange",
	});

	const isCreateForm = Object.keys(children.props.data ?? {}).length === 0;

	const confirmButton = () => {
		return (
			<LoadingButton
				form={formId}
				content="Submit"
				type="submit"
				color="primary"
				align="right"
				variant="contained"
				disabled={disabled || !methods.formState.isDirty || !methods.formState.isValid}
			>
				{isCreateForm ? "Create" : "Save"}
			</LoadingButton>
		);
	};

	return (
		<FormProvider {...methods}>
			<DialogModal
				showModal={showModal}
				handleClose={handleClose}
				maxWidth={maxWidth}
				confirmButton={confirmButton()}
				children={children}
			/>
		</FormProvider>
	);
};

export default ModalForForms;

ModalForForms.propTypes = {
	formId: PropTypes.string,
	disabled: PropTypes.bool,
	handleClose: PropTypes.func,
	showModal: PropTypes.bool,
	children: PropTypes.node,
	maxWidth: PropTypes.string,
};
