import "./App.css";

import { Button, Grid } from "@mui/material";
import React, { useState } from "react";

import ModalForForms from "./components/Modals/ModalForForms";
import ModalForm from "./components/ModalForm";

function App() {
	const [showModal, setShowModal] = useState(false);
	const onSave = (updatedData) => {
		console.log(updatedData);
	};

	function handleClickOpen() {
		setShowModal(true);
	}

	function handleClose() {
		setShowModal(false);
	}

	return (
		<Grid container style={{ display: "flex", height: "100%" }}>
			<Button
				onClick={handleClickOpen}
				color="primary"
				variant="contained"
				title={`show modal`}
				aria-label={`show modal`}
			>
				{`show modal`}
			</Button>
			<ModalForForms formId={"form"} showModal={showModal} handleClose={handleClose}>
				{React.cloneElement(<ModalForm onSave={onSave} setShowModal={setShowModal} />, { setShowModal })}
			</ModalForForms>
		</Grid>
	);
}

export default App;
