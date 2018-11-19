// ----pseudo code overall summary-----
//
// there will be an array of objects
//-------the objects will have a question, answer choices, correct answer, and image
//
//There will be several global variables
//---Vars: wins, loses



//There will be an initial playGame function
//-----the playGame function will randomly select an object from the array
//-----append the selected object to the screen


//---This is the question array---

$(document).ready(function () {

    var options = [

        {
            question: "What are the spikes on the bottom of your boots called?",
            choice: ["skis", "crampons", "tread", "boots"],
            answer: "crampons",
            image: "assets/images/crampons.jpg"
        },

        {
            question: "What is the device that measures your altitude called?",
            choice: ["altimeter", "barometer", "thermometer", "measuring stick"],
            answer: "altimeter",
            image: "assets/images/altimeter.jpg"
        },

        {
            question: "What is the highest mountain in South America?",
            choice: ["Denali", "Mont Blanc", "Anconcagua", "Mt Everest"],
            answer: "Anconcagua",
            image: "assets/images/anconcagua.jpg"
        }
    ];

    var correct = 0;
    var incorrect = 0;
    var timer = 45;
    var intervalId;
    var userGuess = "";
    var pick;
    var questionIndex = 0;
    


    //ON BUTTON CLICK START TIMER AND DISPLAY QUESTION

    $("#startgame").on("click", function() {
        startGame();
    });

    function startGame() {
        $(".instructions").hide();
        $("#answerblock").empty();
        startTimer();
        questionDisplay();
        displayScore();
    };

    //====TIMER FUNCTION AND DISPLAY====
    function startTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000)
    }
    function decrement() {
        timer --;
        $("#timerblock").html("<h3>" + "Time Remaining: " + timer + "</h3>");
        if (timer === 0) {
            incorrect ++;
            clearInterval(intervalId);
            displayScore();
            hideQuestion();
            // hideQuestion();
        }
    }

    //===PICK RANDOM OPTION AND DISPLAY ON SCREEN
    function questionDisplay() {

        //===RANDOM OPTION CHOSEN HERE
       
            
            pick = options[questionIndex];
            questionIndex++,
        console.log(pick);

            //===Picked OPTIONS.QUESTION displayed here
            $("#questionblock").html(pick.question);

            //===Give each OPTIONS.CHOICE a data value to allow user to select a choice
            //===.HTML each OPTIONS.CHOICE to html
            for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<button>");
                userChoice.addClass("answerchoice");
                userChoice.text(pick.choice[i]);
                userChoice.attr("data-choicevalue", pick.choice[i]);
                console.log($(this).attr(""));
                $("#answerblock").append(userChoice);
            }    
    }    
   
    //===RECORD USER CLICK

    $(document).on("click", ".answerchoice", recordClick);


    function recordClick() {
        userGuess = ($(this).attr("data-choicevalue"));
        console.log(userGuess);
        if (userGuess === pick.answer) {
            correct ++;
            hideQuestion();
        } else {
            incorrect ++;
            hideQuestion();
        }
    }

    //===HIDE QUESTION AND SHOW ANSWER for 3 SECONDS
    function hideQuestion() {
         $("#questionblock").empty();
         $("#answerblock").empty();
         $("#questionblock").html("<p>" + pick.answer + "</p>");
         var answerImage = $("<img>").attr("src", pick.image);
         $("#answerblock").append(answerImage);
//TIMER HERE
        setTimeout (startGame, 3000)
     }

    //===DISPLAY SCORE BOARD HERE
    function displayScore () {
            $("#correct").html("<p>" + "Correct: " + correct + "</p>");
            $("#incorrect").html("<p>" + "Incorrect: " + incorrect + "</p>");
    }

})
