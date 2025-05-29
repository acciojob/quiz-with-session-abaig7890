//your JS code here.
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');
    
    // Correct answers
    const correctAnswers = {
        q1: 'b', // Paris
        q2: 'b', // Mars
        q3: 'b', // Blue Whale
        q4: 'c', // JavaScript
        q5: 'b'  // 1945
    };
    
    // Load saved progress from session storage
    function loadProgress() {
        const savedProgress = sessionStorage.getItem('progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            for (const question in progress) {
                const selectedOption = progress[question];
                if (selectedOption) {
                    const radioBtn = document.querySelector(`input[name="${question}"][value="${selectedOption}"]`);
                    if (radioBtn) {
                        radioBtn.checked = true;
                    }
                }
            }
        }
        
        // Check if quiz was already submitted (score in local storage)
        const savedScore = localStorage.getItem('score');
        if (savedScore) {
            showResult(parseInt(savedScore));
        }
    }
    
    // Save progress to session storage
    function saveProgress() {
        const formData = new FormData(quizForm);
        const progress = {};
        
        for (const [name, value] of formData.entries()) {
            progress[name] = value;
        }
        
        sessionStorage.setItem('progress', JSON.stringify(progress));
    }
    
    // Calculate score
    function calculateScore() {
        let score = 0;
        const formData = new FormData(quizForm);
        
        for (const [question, answer] of formData.entries()) {
            if (correctAnswers[question] === answer) {
                score++;
            }
        }
        
        return score;
    }
    
    // Show result
    function showResult(score) {
        resultDiv.textContent = `Your score is ${score} out of 5.`;
        resultDiv.style.display = 'block';
        submitBtn.disabled = true;
        
        // Disable all radio buttons
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.disabled = true;
        });
    }
    
    // Event listener for radio button changes
    quizForm.addEventListener('change', function() {
        saveProgress();
    });
    
    // Event listener for form submission
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const score = calculateScore();
        showResult(score);
        
        // Store score in local storage
        localStorage.setItem('score', score.toString());
    });
    
    // Load progress when page loads
    loadProgress();
});
// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
