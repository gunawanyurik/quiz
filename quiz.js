var topic = document.querySelectorAll('#topic');
var Username = document.getElementById('Username');
var name2 = document.querySelector('.name2');
var topic2 = document.querySelector('.topic2');
var enter = document.querySelector('button[type="button"]');
var container = document.querySelector('.container');
var quiz = document.querySelector('.quiz');
var restartQuiz = document.querySelector('.restart');
const quizContainer = document.querySelector('.answer');
const resultsContainer = document.querySelector('.remark');
const submitButton = document.getElementById("submit");
var timer = document.getElementById("timer");

//score
var score = 0;

// array of questions

var questions1 = [{
    question : "Hewan laut yang jalannya miring dan bersembunyi di batu atau pasir biasanya?",
    options: {
        a : "Lagi Malu",
        b : "Bintang Laut",
        c: "Bulu Babi",
        d : "Terumbu Karang"
    },
    answer: "a"
}, {
    question : "Saat naik pesawat kita dilarang membawa..?",
    options: {
        a : "Rumah",
        b : "Kompor",
        c: "Sendiri",
        d : "Sapi"
    },
    answer: "c"
}, {
    question : "Seorang istri akan merasa terkejut bila di hari ulang tahun dibelikan?",
    options: {
        a : "Beruang",
        b : "Perhiasan",
        c: "Mobil Mevah",
        d : "Kanopi"
    },
    answer: "a"
}, {
    question : "Buah yang dipotong-potong, diuleg campur gula jawa dan cabai, jadinya?",
    options: {
        a : "Rujak",
        b : "Gado-Gado",
        c: "Pecel",
        d : "Rusak"
    },
    answer: "d"
}];

var questions2 = [{
    question : "Asep pergi nyari sesuatu trus pulang babak belur. Apa yang dia cari?",
    options : {
        a : "Musuh",
        b : "Masalah",
        c : "Telur", 
        d : "Binatang Buas"
    },
    answer : "b"
}, {
    question : "Hewan apa yang gapapa?",
    options : {
        a : "Ayam",
        b : "Bebek",
        c : "Sapi", 
        d : "Gajah"
    },
    answer : "b"
}, {
    question : "Ikan bernafas di air dengan?",
    options : {
        a : "Tenang",
        b : "Berenang",
        c : "Insang", 
        d : "Mulut"
    },
    answer : "a"
}, {
    question : "Di dalam perpustakaan tidak boleh?",
    options : {
        a : "Mandi",
        b : "Keramas",
        c : "Main Slot", 
        d : "Balap Liar"
    },
    answer : "b"
}];

var questions = questions1;

// to fill topic and name

enter.addEventListener("click", () => {
    container.style.display = "none";
    quiz.style.display = "block";
    buildQuiz();
    startTimer();
})

Username.addEventListener("input", () => {
    name2.innerText = Username.value;
  });

if(topic[0].checked){
    topic[0].addEventListener("input", () => {
        topic2.innerText = "Lontong Quiz";
    })
}else{
    topic[1].addEventListener("input", () => {
        topic2.innerText = "Sengklek Quiz";
        questions = questions2;
    })
    
}


function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    questions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];
  
      // and for each available answer...
      for (key in currentQuestion.options) {
        // ...add an HTML radio button
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${key}" class="question">
              ${currentQuestion.options[key]}
              <br>
            </label>`
        );
      }
  
      console.log(answers);
  
      // add this question and its answers to the output
      output.push(
        `<div class="question"> Q${questionNumber+1}. ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>`
      );
    });
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
    console.log(output);
  }


  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
  
    // keep track of user's answers
    let score = 0;
  
    // for each question..
    questions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
       // color the right answers green
     for(var i = 0; i < 4; i++){
        if(answerContainer.querySelectorAll('input')[i].value == currentQuestion.answer){
            answerContainer.querySelectorAll('label')[i].style.color = "rgb(5, 197, 30)";
        }
      } 
      // if answer is correct
      if (userAnswer === currentQuestion.answer) {
        // add to the number of correct answers
        score++;
      }             
      // if answer is wrong or blank
      else {
        // color the wrong answers red
        for(var i = 0; i < 4; i++){
            if(answerContainers[questionNumber].querySelectorAll('input')[i].checked){
                answerContainers[questionNumber].querySelectorAll('label')[i].style.color = "red";
            }
        }
      }
    });
    // show number of correct answers out of total
    if(score >= 3){
        resultsContainer.innerHTML = `YAY! Anda Mendapatkan ${score} Dari ${questions1.length} Jawaban yang Benar!!! <br> Sepertinya Anda Berhasil Menyelesaikan Quiz Ini :)`;
    }else{
        resultsContainer.innerHTML = `Ups! Anda Mendapatkan ${score} Dari ${questions1.length} Jawaban yang Benar! <br> Semoga Lebih Berutung di Lain Waktu! :)`;
    }
    
  }


  submitButton.addEventListener("click", showResults);

  restartQuiz.addEventListener("click", () => {
    window.location.reload();
  });

  // timer
  function startTimer(){
      var time = new Date().getTime() + 1000*60*4;
      var interval = setInterval(function(){
        var now = new Date().getTime();
        var distance = time - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timer.innerHTML = minutes + " : " + seconds;
        if (distance <= 0) {
            clearInterval(interval);
            timer.innerHTML = "00:00";
            window.alert('Time Up!');
            showResults();
        }
      } ,1000);
  }
  