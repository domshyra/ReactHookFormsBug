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

  const data = {
		textField: "test name",
		checkboxesNumbered: {
			quarterly: false,
			semiAnnual: false,
			annual: true,
			none: false,
		},
		checkboxesLettered: {
			twentyPercent: false,
			fifteenPercent: false,
			tenPercent: true,
			fivePercent: false,
			zeroPercent: false,
		},
		percentCoverageProvided: "",
		radioButtonIds: "addition",
		customCredit: 0,
		id: "00f8602b-0d81-4974-ae44-512a23e2db88",
  };

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
				<ModalForm onSave={onSave} setShowModal={setShowModal} data={data} />
			</ModalForForms>
		</Grid>
  );
}

export default App;
