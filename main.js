// Select Elements

let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let countdownInterval;
let arrayOfChosenAnswers = [];
function getQuestions() {
  let myRequest = new XMLHttpRequest();
  // استدعاء الاسئلة
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);

      let qCount = questionsObject.length;
      //  checking for questions file

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown
      // countdown(3, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(qCount, questionsObject, currentIndex);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Show Results
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(count, currentIndex) {
  let answers = document.getElementsByName("question");
  let theChosenAnswer;
  console.log(count);

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAnswer =
        i == 0
          ? "1000"
          : i == 1
          ? "0100"
          : i == 2
          ? "0010"
          : i == 3
          ? "0001"
          : "not one of them";
    }
  }
  let answerObject = {
    question_number: currentIndex,
    answer: theChosenAnswer,
  };
  arrayOfChosenAnswers.push(answerObject);
}

function showResults(count) {
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();

    resultsContainer.innerHTML = "thank you very much";
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
  console.log(arrayOfChosenAnswers);
}
