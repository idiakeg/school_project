const studentForm = document.getElementById("student_form");
const studentCardsContainer = document.getElementById(
	"student_cards_container"
);
const firstName = document.getElementById("fname");

let studentList = [];

function showOrHideStudents() {
	if (studentList.length < 1) {
		studentCardsContainer.classList.add("hidden");
	} else {
		studentCardsContainer.classList.remove("hidden");
	}
}

showOrHideStudents();

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
		const formData = new FormData(studentForm);

		const rawData = Object.fromEntries(formData.entries());
		const studentData = {
			id: new Date().getUTCMilliseconds(),
			Name: `${rawData.first_name} ${rawData.last_name}`,
			Phone: rawData.contact,
			DOB: rawData.date_of_birth,
			Career: rawData.career,
			Reason: rawData.reason_for_career,
		};

		studentList.push(studentData);
		showOrHideStudents();
		generateCard(studentData);
		console.log("submitting");
		console.log("", studentList);
		studentForm.reset();
	} else {
		// focus on the first input that is invalid, prompting the user to fill it up
		studentForm.querySelector(":invalid").focus();
	}
});

const generateCard = (studentInfo) => {
	studentCardsContainer.innerHTML = "";

	studentList.forEach(({ Name, Phone, DOB, Career, Reason, id }) => {
		const divEl = document.createElement("div");
		divEl.classList.add("student_card");
		divEl.innerHTML = `
					<span>Name:</span> <span>${Name}</span> <span>Phone No:</span
						><span>${Phone}</span> <span>DOB:</span> <span>${DOB}</span>
						<span>Career</span><span>${Career}</span> 
						<hr class="span_all" />
						<div class="card_action_btns span_all">
							<button id="edit_btn" data-btn-function="edit">edit</button>
							<button id="delete_btn" data-btn-function="delete">delete</button>
						</div>
				`;

		studentCardsContainer.appendChild(divEl);
	});
};
