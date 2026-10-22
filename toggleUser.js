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

// ----- to handle the sticky header on scroll

const primaryHeader = document.querySelector("header");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");

primaryHeader.before(scrollWatcher);

const navScrollObserver = new IntersectionObserver((entries) => {
	primaryHeader.classList.toggle("sticking", !entries[0].isIntersecting);
}, {});

navScrollObserver.observe(scrollWatcher);
