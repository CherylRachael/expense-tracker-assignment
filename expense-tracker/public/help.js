// Search Functionality
function helpSearchFunction() {
    let input = document.getElementById('helpSearchBar').value.toLowerCase();
    let faqItems = document.querySelectorAll('.help-faq-item');

    faqItems.forEach(item => {
        let question = item.querySelector('.help-question').textContent.toLowerCase();
        let answer = item.querySelector('.help-answer').textContent.toLowerCase();

        if (question.includes(input) || answer.includes(input)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Toggle FAQ Answers
document.querySelectorAll('.help-question').forEach(question => {
    question.addEventListener('click', function () {
        let answer = this.nextElementSibling;
        answer.style.display = (answer.style.display === "none" || !answer.style.display) ? "block" : "none";
    });
});

// Feedback Functionality
function helpFeedback() {
    alert("Thank you for your feedback!");
}
