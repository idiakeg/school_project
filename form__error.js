const studentForm = document.getElementById("student_form");
const firstName = document.getElementById("fname");

const validateField = (field) => {
	const errorEl = field.parentElement.querySelector(".error_message");

	if (!field.validity.valid) {
		if (errorEl) {
			errorEl.textContent = errorEl.dataset.error || "This field is required.";
		}
		return false;
	}
	if (errorEl) {
		errorEl.textContent = "";
	}
	return true;
};

studentForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let isValid = true;

	const fields = document.querySelectorAll("input, textarea");

	fields.forEach((field) => {
		const fieldValidity = validateField(field);
		if (!fieldValidity) {
			isValid = false;
		}
	});

	if (isValid) {
		console.log("submitting");
	} else {
		// focus on the first input that is invalid, prompting the user to fill it up
		studentForm.querySelector(":invalid").focus();
	}
});
