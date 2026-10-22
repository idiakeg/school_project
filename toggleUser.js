const toggle_btns = document.querySelectorAll(".toggle_btns button");
const teacherForm = document.getElementById("teacher_form");

toggle_btns.forEach((btn) => {
	const flag = btn.id === "student_btn";
	btn.addEventListener("click", () => {
		// toggle which of the form is visible to the user
		teacherForm.dataset.formHidden = flag;
		studentForm.dataset.formHidden = !flag;

		toggle_btns.forEach((toggleBtn) => {
			// Remove the activeBtn from both buttons
			toggleBtn.dataset.activeBtn = "false";
			// add the avtiveBtn to the desired button
			btn.dataset.activeBtn = "true";
		});
	});
});
