const studentForm = document.getElementById("student_form");
const studentCardsContainer = document.getElementById(
	"student_cards_container"
);
const firstName = document.getElementById("fname");
const editStudentModal = document.getElementById("EditStudentModal");
const editStudentForm = document.getElementById("edit_student_form");

let studentList = [];

// ----- Validate input fields
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
	validateForm(studentForm);
});

// ------ Validate form
const validateForm = (formToValidate) => {
	let isValid = true;

	const fields = formToValidate.querySelectorAll("input, textarea");

	fields.forEach((field) => {
		const fieldValidity = validateField(field);
		if (!fieldValidity) {
			isValid = false;
		}
	});

	if (isValid) {
		const formData = new FormData(formToValidate);

		const rawData = Object.fromEntries(formData.entries());
		const data = {
			id: new Date().getUTCMilliseconds(),
			first_name: rawData.first_name,
			last_name: rawData.last_name,
			contact: rawData.contact,
			date_of_birth: rawData.date_of_birth,
			career: rawData.career,
			reason_for_career: rawData.reason_for_career,
			Name: `${rawData.first_name} ${rawData.last_name}`,
		};

		studentList.push(data);
		generateCard(
			studentList,
			"student added 👏",
			"success",
			"Student List",
			studentCardsContainer
		);
		formToValidate.reset();
	} else {
		// focus on the first input that is invalid, prompting the user to fill it up
		formToValidate.querySelector(":invalid").focus();
		// console.log("form is not valid");
	}
};

// ------ Generate a card
const generateCard = (
	arr,
	toastMessage,
	toastMsgBg,
	studentOrTeacherList,
	Container
) => {
	Container.innerHTML = "";

	if (arr.length < 1) {
		Toast("student deleted.");
		// console.log("No student yet.");
		return;
	}

	const h2El = document.createElement("h2");
	h2El.classList.add("span_all");
	h2El.textContent = studentOrTeacherList;

	Container.appendChild(h2El);

	arr.forEach(
		({ Name, contact, date_of_birth, career, reason_for_career, id }) => {
			// Remember to include the id to help with deleting and editing the card.
			const divEl = document.createElement("div");
			divEl.classList.add("student_card");
			divEl.innerHTML = `
					<span>Name:</span> <span>${Name}</span> <span>Phone No:</span
						><span>${contact}</span> <span>DOB:</span> <span>${date_of_birth}</span>
						<span>Career</span><span>${career}</span> 
						<hr class="span_all" />
						<div data-id='${id}' class="card_action_btns span_all">
							<button class="edit_btn" data-btn-function="edit">edit</button>
							<button class="delete_btn" data-btn-function="delete">delete</button>
						</div>
				`;

			Container.appendChild(divEl);
		}
	);
	Toast(toastMessage, toastMsgBg);
	const deleteBtns = document.querySelectorAll(".delete_btn");
	const editBtns = document.querySelectorAll(".edit_btn");

	Array.from(deleteBtns).forEach((deleteBtn) => {
		deleteBtn.addEventListener("click", (e) => {
			const idToBeDeleted = Number(
				e.target.closest(".card_action_btns").dataset.id
			);
			deleteStudent(idToBeDeleted);
		});
	});

	Array.from(editBtns).forEach((editBtn) => {
		editBtn.addEventListener("click", (e) => {
			const idToBeDeleted = Number(
				e.target.closest(".card_action_btns").dataset.id
			);
			editStudent(idToBeDeleted);
		});
	});
};

// ------ create toast

const Toast = (message, flag) => {
	const toastContainer = document.getElementById("toast-container");
	// if a toast exists, clear it.
	const existingToast = toastContainer.querySelector(".toast");
	if (existingToast) {
		existingToast.remove();
	}
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = message;
	toast.style.backgroundColor = flag === "success" ? "#22c55e" : "red";

	// Append to container
	toastContainer.appendChild(toast);

	// Remove toast automatically after 3 seconds
	setTimeout(() => {
		toast.remove();
	}, 3000);
};
// ------- Delete student
const deleteStudent = (identifier) => {
	const newStudentList = studentList.filter(({ id }) => id !== identifier);
	studentList = newStudentList;
	generateCard(
		studentList,
		"student deleted.",
		"fail",
		studentList,
		studentCardsContainer
	);
};

// ------- Edit student detail
const editStudent = (identifier) => {
	// find the item to be edited
	let studentToBeEdited = studentList.find((a) => a.id === identifier);
	const fields = editStudentForm.querySelectorAll("input, textarea");
	fields.forEach((field) => {
		let fieldName = field.name;
		// populate the edit field with the required information
		if (studentToBeEdited[fieldName] !== undefined) {
			field.value = studentToBeEdited[fieldName];
		}
	});
	editStudentModal.showModal();
	// put the id ont the form so it is visible to the next function when editing
	editStudentForm.dataset.editingId = identifier;
};

editStudentForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const editingId = Number(editStudentForm.dataset.editingId);
	// find the index of the item to be edited.
	const studentIndex = studentList.findIndex(
		(student) => student.id === editingId
	);
	let isValid = true;
	const fields = editStudentForm.querySelectorAll("input, textarea");
	fields.forEach((field) => {
		const fieldValidity = validateField(field);
		if (!fieldValidity) {
			isValid = false;
		}
	});
	if (isValid) {
		const formData = new FormData(editStudentForm);

		const rawData = Object.fromEntries(formData.entries());
		// update the particular student information using the index.
		studentList[studentIndex] = {
			id: new Date().getUTCMilliseconds(),
			first_name: rawData.first_name,
			last_name: rawData.last_name,
			contact: rawData.contact,
			date_of_birth: rawData.date_of_birth,
			career: rawData.career,
			reason_for_career: rawData.reason_for_career,
			Name: `${rawData.first_name} ${rawData.last_name}`,
		};
		editStudentModal.close();

		generateCard(
			studentList,
			"student info updated 👏",
			"success",
			"Student List",
			studentCardsContainer
		);
		// clear the form
		editStudentForm.reset();
		// remove whatever error message we might have had when editing the student info.
		fields.forEach((field) => {
			const errorEl = field.parentElement.querySelector(".error_message");
			if (errorEl) errorEl.textContent = "";
		});
	} else {
		editStudentForm.querySelector(":invalid").focus();
	}
});
