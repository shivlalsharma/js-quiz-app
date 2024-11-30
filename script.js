import { questions } from "./questions.js";

let index = 0;
let answer;
let right = 0;
let wrong = 0;
const totalQuestion = questions.length;
const question = document.querySelector('.ques');
const main = document.querySelector('.main');
const option = document.querySelectorAll('label');
const inputVal = document.querySelectorAll('input');
const submitAnswer = document.querySelector('.submit-answer');

const loadQuestion = () => {
    if (index == totalQuestion) {
        return endQuiz();
    }
    reset();
    const data = questions[index];
    question.textContent = `${index + 1}. ${data.ques}`;
    option[0].textContent = data.a;
    option[1].textContent = data.b;
    option[2].textContent = data.c;
    option[3].textContent = data.d;
}

const submitQuestion = () => {
    const data = questions[index];
    const ans = getAnswer();
    if (ans == data.correct) {
        right++;
    }
    else {
        wrong++;
    }
    inputVal.forEach((input)=>{
        if(input.checked == true){
            index++;
            loadQuestion();
        }
        else{
            index;
        }
    });
}

const getAnswer = () => {
    inputVal.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

const reset = () => {
    inputVal.forEach((input) => {
        if (input.checked) {
            input.checked = false;
        }
    })
}

const startAgain = ()=>{
    location.replace('index.html');
}

const endQuiz = () => {
    const scorePercentage = ((right / totalQuestion) * 100).toFixed(2); // Show percentage up to two decimal places
    main.innerHTML = `
        <div class="result-container">
            <h2>Quiz Completed!</h2>
            <p>Thank you for participating in the JavaScript Quiz.</p>
            <p><strong>Your Score:</strong> ${scorePercentage}%</p>
            <p class="feedback-message">
                ${scorePercentage >= 75 
                    ? "Excellent work! You have a strong understanding of JavaScript." 
                    : scorePercentage >= 50 
                    ? "Good effort! Keep practicing to improve your skills." 
                    : "Don't worry! Review the concepts and try again to improve your score."}
            </p>
            <button class="start-again">Start Again</button>
        </div>
    `;

    document.querySelector('.start-again').addEventListener('click', startAgain);
}

loadQuestion();

submitAnswer.addEventListener('click',submitQuestion);