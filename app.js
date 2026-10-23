const studentForm = document.getElementById("student_form");
const studentCardsContainer = document.getElementById(
	"student_cards_container"
);
const firstName = document.getElementById("fname");
const editStudentModal = document.getElementById("EditStudentModal");

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
		generateCard(studentList, "student added 👏", "success");
		studentForm.reset();
	} else {
		// focus on the first input that is invalid, prompting the user to fill it up
		studentForm.querySelector(":invalid").focus();
	}
});

// ------ Generate a card
const generateCard = (arr, toastMessage, toastMsgBg) => {
	studentCardsContainer.innerHTML = "";

	if (arr.length < 1) {
		Toast("student deleted.");
		// console.log("No student yet.");
		return;
	}

	const h2El = document.createElement("h2");
	h2El.classList.add("span_all");
	h2El.textContent = "Student List";

	studentCardsContainer.appendChild(h2El);

	arr.forEach(({ Name, Phone, DOB, Career, Reason, id }) => {
		// Remember to include the id to help with deleting and editing the card.
		const divEl = document.createElement("div");
		divEl.classList.add("student_card");
		divEl.innerHTML = `
					<span>Name:</span> <span>${Name}</span> <span>Phone No:</span
						><span>${Phone}</span> <span>DOB:</span> <span>${DOB}</span>
						<span>Career</span><span>${Career}</span> 
						<hr class="span_all" />
						<div data-id='${id}' class="card_action_btns span_all">
							<button class="edit_btn" data-btn-function="edit">edit</button>
							<button class="delete_btn" data-btn-function="delete">delete</button>
						</div>
				`;

		studentCardsContainer.appendChild(divEl);
	});
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
	toast.style.backgroundColor = flag ? "#22c55e" : "red";

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
	generateCard(studentList, "student deleted.");
};

// ------- Edit student detail
const editStudent = (identifier) => {
	console.log("edit button has been clicked.", identifier);
	editStudentModal.showModal();
};
