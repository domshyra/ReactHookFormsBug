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
		<>
			<div className="App">
				<header className="App-header"></header>
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
				</Grid>
			</div>

			<ModalForForms key={"someKey"} formId={"form"} showModal={showModal} handleClose={handleClose}>
				{React.cloneElement(<ModalForm onSave={onSave} />, { setShowModal })}
			</ModalForForms>
		</>
	);
}

export default App;
