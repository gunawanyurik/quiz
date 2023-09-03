const readlineSync = require('readline-sync');

function welcome(){
    var userName = readlineSync.question("What is your Name? ");

    console.log("Welcome " + userName + " to this fantastic Quiz!!!")
    console.log("Which topic would you like to choose?");
    console.log("a : Vampire Diaries");
    console.log("b : Space Related");
    var topic = readlineSync.question(":");
    game(userName, topic);
}

var score = 0;

var highScore = {
    name: "Mansi",
    score: 4
}

var questions1 = [{
    question : "Who is the most deadly vampire when their humanity switch is off?",
    options: {
        a : "Stefan",
        b : "Caroline",
        c: "Damon",
        d : "Enzo"
    },
    answer: "a"
}, {
    question : "Which Mikaelson was a supernatrual creature before they were a vampire?",
    options: {
        a : "Rebeka",
        b : "Finn",
        c: "Klaus",
        d : "Elijah"
    },
    answer: "c"
}, {
    question : "Who was the first vampire Elena met?",
    options: {
        a : "Damon",
        b : "Stefan",
        c: "Katherine",
        d : "Col"
    },
    answer: "a"
}, {
    question : "What is the name of the restaurant in Mystic Falls",
    options: {
        a : "Mystic Bars",
        b : "Mystic Tavern",
        c: "Mystic Inn",
        d : "Mystic Grills"
    },
    answer: "d"
}];

var questions2 = [{
    question : "Which is the brightest planet in the universe?",
    options : {
        a : "Mercury",
        b : "Venus",
        c : "Earth", 
        d : "Saturn"
    },
    answer : "b"
}, {
    question : "The first outside orbit of the earth planet is",
    options : {
        a : "Jupiter",
        b : "Mars",
        c : "Saturn", 
        d : "Uranus"
    },
    answer : "b"
}, {
    question : "What is the gap between the orbit of mars and Jupiter called?",
    options : {
        a : "Asteroids",
        b : "Comets",
        c : "Meteor", 
        d : "Meteorite"
    },
    answer : "a"
}, {
    question : "Stars appear to move from",
    options : {
        a : "West to east",
        b : "East to west",
        c : "North to south", 
        d : "South to west"
    },
    answer : "b"
}];

function showScores(userName){
    console.log("Congratulations on completing the Quiz :)");
    console.log("Your total score is ", score);
    console.log("----------------------");

    if(highScore.score <= score){
        highScore.name = userName;
        highScore.score = score;
    }

    console.log("Check out the highest score!");
    console.log("Name   :   Score");
    console.log(highScore.name, " :  ", highScore.score);
}

function play(question, answer, options){
    console.log(question);

    for(const key in options){
        console.log(key + " : " + options[key]);
    }

    var userAnswer = readlineSync.question("What do you choose? ");

    if(userAnswer.toUpperCase() === answer.toUpperCase()){
        console.log("YAY! This the RIGHT Answer.");
        score++;
    }else{
        console.log("Oops! WRONG Answer. Better Luck Next Time!");
    }
    console.log("Your current score is ", score);
    console.log("----------------------------");
}

function game(userName, topic){

    for(var i = 0; i < questions1.length; i++){
        var currentQuestion;
        if(topic == 'a'){
            currentQuestion = questions1[i];
        }else{
            currentQuestion = questions2[i];
        }
        
        play(currentQuestion.question, currentQuestion.answer, currentQuestion.options);
    }
    showScores(userName);
}

welcome();