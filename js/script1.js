// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelectorAll(".info_box")[1]; // Select the second info_box for rules
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.getElementById("continue");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const continue_btns = info_box.querySelector(".buttons .restart");

// If startQuiz button clicked
function startQuiz() {
    // Hide the start button
    document.getElementById('startQuizButton').style.display = 'none';
    continue_btn.style.display = 'block';

    // Show the section and name input box
    document.querySelectorAll(".info_box")[0].classList.add("activeInfo");
}
//restart button is clicked
function restartQuiz() {
    // Hide the start button
    document.getElementById('startQuizButton').style.display = 'none';

    // Show the section and name input box
    document.querySelectorAll(".info_box")[0].classList.add("activeInfo");
}
//continue button is clicked
continue_btns.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(59); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
    
}

// If exitQuiz button clicked
exit_btn.onclick = () => {
    document.getElementById('startQuizButton').style.display = 'block';
    info_box.classList.remove("activeInfo"); // Hide info box
}

// Show continue button when inputs are clicked
// document.getElementById('section').addEventListener('input', function() {
//     continue_btn.style.display = 'block';
// });
// document.getElementById('name').addEventListener('input', function() {
//     continue_btn.style.display = 'block';
// });

continue_btn.onclick = () => {
    const sectionValue = document.getElementById('section').value;
    const nameValue = document.getElementById('name').value;

    if (sectionValue && nameValue) {
        document.getElementById('firstName').value = nameValue;
        document.getElementById('section2').value = sectionValue;

        document.querySelectorAll(".info_box")[0].classList.remove("activeInfo"); // Hide input box
        info_box.classList.add("activeInfo"); // Show rules box
    }
}

let timeValue = 59;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// If restartQuiz button clicked
restart_quiz.onclick = () => {
    // document.getElementById("userScoreInput").value = userScore;
    // document.getElementById("submitButton").click();
    document.getElementById('startQuizButton').style.display = 'block';
    document.querySelectorAll(".info_box")[0].classList.remove("activeInfo");//show input
    quiz_box.classList.remove("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide result box
    timeValue = 59; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // Calling showQestions function
    queCounter(que_numb); // Passing que_numb value to queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    startTimer(timeValue); // Calling startTimer function
    startTimerLine(widthValue); // Calling startTimerLine function
    timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
    next_btn.classList.remove("show"); // Hide the next button
    document.getElementById('next_btn').style.display = 'none';
}

// If quitQuiz button clicked
quit_quiz.onclick = () => {
    document.getElementById('startQuizButton').style.display = 'block';
    window.location.reload(); // Reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If Next Que button clicked
next_btn.onclick = () => {
    document.getElementById('next_btn').style.display = 'none';
    if(que_count < questions.length - 1){ // If question count is less than total question length
        que_count++; // Increment the que_count value
        que_numb++; // Increment the que_numb value
        showQuetions(que_count); // Calling showQestions function
        queCounter(que_numb); // Passing que_numb value to queCounter
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        startTimer(timeValue); // Calling startTimer function
        startTimerLine(widthValue); // Calling startTimerLine function
        timeText.textContent = "Time Left"; // Change the timeText to Time Left
        next_btn.classList.remove("show"); // Hide the next button
        // document.getElementById('next_btn').style.display = 'none';
    }else{
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        showResult(); // Calling showResult function
    }
}

// Getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // Creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // Adding new span tag inside que_tag
    option_list.innerHTML = option_tag; // Adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // Set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// Creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// If user clicked on option
function optionSelected(answer){
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    let userAns = answer.textContent; // Getting user selected option
    let correcAns = questions[que_count].answer; // Getting correct answer from array
    const allOptions = option_list.children.length; // Getting all option items
    
    if(userAns == correcAns){ // If user selected option is equal to array's correct answer
        userScore += 1; // Upgrade score value with 1
        answer.classList.add("correct"); // Add green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); // Add red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Add cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // If there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); // Add green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // Once user select an option then disabled all options
    }
    next_btn.classList.add("show"); // Show the next button if user selected any option
    document.getElementById('next_btn').style.display = 'block';
}

function showResult(){
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.remove("activeQuiz"); // Hide quiz box
    result_box.classList.add("activeResult"); // Show result box
    const scoreText = result_box.querySelector(".score_text");
    const userScoreInput = document.getElementById('userScoreInput');
    
    // Set the value of the hidden input field in the result box form
    userScoreInput.value = userScore;

    if (userScore > 3){ // If user scored more than 3
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; // Add new span tag inside score_Text
    }
    else if(userScore > 1){ // If user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // If user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    
    }
    document.getElementById("userScoreInput").value = userScore;
    document.getElementById("submitButton").click();
}

// Start Timer function
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // Changing the value of timeCount with time value
        time--; // Decrement the time value
        if(time < 9){ // If timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; // Add a 0 before time value
        }
        if(time < 0){ // If timer is less than 0
            clearInterval(counter); // Clear counter
            timeText.textContent = "Time Off"; // Change the time text to time off
            const allOptions = option_list.children.length; // Get all option items
            let correcAns = questions[que_count].answer; // Get correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ // If there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); // Add green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // Once user select an option then disabled all options
            }
            next_btn.classList.add("show"); // Show the next button if user selected any option
        }
    }
}

// Start TimerLine function
// function startTimerLine(time){
//     counterLine = setInterval(timer, 29);
//     function timer(){
//         time += 1; // Upgrading time value with 1
//         time_line.style.width = time + "px"; // Increasing width of time_line with px by time value
//         if(time > 549){ // If time value is greater than 549
//             clearInterval(counterLine); // Clear counterLine
//         }
//     }
// }

// Function to count the number of questions
function queCounter(index){
    // Creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; // Adding new span tag inside bottom_ques_counter
}



const scriptURL = 'https://script.google.com/macros/s/AKfycbz6K3iWro2OmDcxAv2Qm3XyP0wcnQJ6s3Pn_fZUqRFEJ0PMR6zcKjRfYMG3BZv8eIir/exec'
    const form = document.forms['scoreForm']

  
    form.addEventListener('submit',e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfuly"
            setTimeout(function(){
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })

    form1.addEventListener('submit',e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form1)})
          .then(response => {
              msg.innerHTML = "Message sent successfuly"
              setTimeout(function(){
                  msg.innerHTML = ""
              }, 5000)
              form1.reset()
          })
          .catch(error => console.error('Error!', error.message))
      })


