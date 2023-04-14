import { Button, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

/**
 * This is meant to be a generic modal that can be used for any purpose. It will have a close button and an optional confirm button
 * @param {*} param0
 * @returns
 */
const DialogModal = ({ showModal, handleClose, children, maxWidth = "md", confirmButton = null }) => {
	return (
		<Dialog open={showModal} onClose={handleClose} fullWidth={true} maxWidth={maxWidth}>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Grid container justifyContent={"flex-start"}>
					{confirmButton}
				</Grid>
				<Grid container justifyContent={"flex-end"}>
					<Button onClick={handleClose} color={"neutral"}>
						Close
					</Button>
				</Grid>
			</DialogActions>
		</Dialog>
	);
};

export default DialogModal;

DialogModal.propTypes = {
	showModal: PropTypes.bool,
	handleClose: PropTypes.func,
	children: PropTypes.node,
};
