// Start Page

let start = document.querySelector("#start")


// Guide page
let guide = document.querySelector("#guide")
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

// Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");


// Questionn Section
let question = document.querySelector("#question");
let qstnText = document.querySelector("#qstnText");
let qstnNo = document.querySelector("#qstnNo");


// Choices Section
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

// Answers Section
let totalCorrect = document.querySelector("#total_correct");
let nextQuestion = document.querySelector("#next_question");


// Results Page
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let restartBtn = document.querySelector("#startAgain");

let choice_que = document.querySelectorAll(".choice_que")
let index=0;
let timer = 0;
let interval = 0;


//Total Points
let correct = 0;

// Store Answer value
let userAns = undefined;

// Clicking the Start Button
start.addEventListener('click', ()=>{
    start.style.display = "none";
    guide.style.display="block";
});

// Exit Button ont quiz guide screen
exit.addEventListener('click', ()=>{
    start.style.display = "block";
    guide.style.display="none";
});

//Timer
let countDown = () => {
    if (timer === 0) {
        clearInterval(interval);
        nextQuestion.click();
        
    }else {
        timer--;
        time.innerText = timer;
    }
}

// setInterval(countDown, 1000);

let loadData = () => {
    qstnNo.innerText = index + 1 + ". ";
    qstnText.innerText = QUESTIONS[index].question;
    option1.innerText =  QUESTIONS[index].choice1
    option2.innerText =  QUESTIONS[index].choice2
    option3.innerText =  QUESTIONS[index].choice3
    option4.innerText =  QUESTIONS[index].choice4

    // Starting the timer
    timer = 20
}

// loadData();

// Continue Button ont quiz guide screen
continueBtn.addEventListener('click', ()=>{
    quiz.style.display = "block";
    guide.style.display="none";

    interval = setInterval(countDown, 1000);
    loadData()

    // Removes all  active classes 
    choice_que.forEach(removeActive =>{
        removeActive.classList.remove("active")
    })
    
            totalCorrect.innerHTML = `${correct = 0} out Of ${QUESTIONS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", ()=>{
        choices.classList.add("active");


        // check answer is correct
        if (choiceNo === QUESTIONS[index].answer) {
            correct++;
        }else {
            correct+=0;
        }
        // Stopping the counter
        clearInterval(interval)

        // Disabling all choices once one is selected;
        for (let i = 0; i <=3; i++) {
            choice_que[i].classList.add("disabled")
            
        }
    })   
});

// When Next button in quiz is clicked
nextQuestion.addEventListener("click", ()=>{

    if (index !== QUESTIONS.length -1) {
        index++;
        choice_que.forEach(removeActive =>{
            removeActive.classList.remove("active");
        })
        loadData();

        // result
        totalCorrect.style.display = "block";
        totalCorrect.innerHTML = `${correct} out Of ${QUESTIONS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    }
    else{
        index = 0;

        // Omce Quiz is finished, display result;
        clearInterval(interval);
        quiz.style.display = "none";
        result.style.display= "block";
        points.innerHTML = `You scored ${correct} out of ${QUESTIONS.length}`
    }
    for (let i = 0; i <=3; i++) {
        choice_que[i].classList.remove("disabled")
        
    }
})

// Quit Button ont result screen
quit.addEventListener('click', ()=>{
    start.style.display = "block";
    result.style.display="none";
});
// Restart Button ont result screen
restartBtn.addEventListener('click', ()=>{
    guide.style.display = "block";
    result.style.display="none";
});

