var msg = new SpeechSynthesisUtterance();
msg.lang = 'ja-JP';

// We have only one voice for ja-JP
// But these are fun to try on a mac
//var voices = window.speechSynthesis.getVoices();
//var jpVoice = voices.filter(function(voice) { return voice.lang == 'ja-JP'; })[0];
//var enVoice = voices.filter(function(voice) { return voice.lang == 'en-US'; })[0];

var currentRate = 1;
var currentVolume  = 3;
var higlightedImg;

msg.onstart = function(event) {
  stopVoice();
  $('#speaker').fadeIn(200);
  higlightedImg.addClass("highlight");
}

msg.onend = function(event) {
  startVoice();
  $('#speaker').fadeOut(200);
  higlightedImg.removeClass("highlight");
}

var currentStep = 0;

function speakMsg(message) {
  console.log(message);
  // TODO: Change language here after analyzing text
　// msg.lang = 'en-US'
  msg.volume = currentVolume;
  msg.rate = currentRate; 
  msg.text = message;
  window.speechSynthesis.speak(msg);
}

function processSearch(term) {
    console.log('search' + term);
    term = term.replace(/\s+/g, '+');
    document.location.href = "http://recipe.rakuten.co.jp/search/" + term;
}

// Page scrolling
function scrollUp() {
  console.log(arguments.callee.name);
  window.scrollBy(0, -400);
}

function scrollDown() {
  console.log(arguments.callee.name);
  window.scrollBy(0, 400);
}


// Speech synthesis settings
function readSlower() {
  console.log(arguments.callee.name);
  currentRate = currentRate - 0.1;  
}

function readFaster() {
  console.log(arguments.callee.name);
  currentRate = currentRate + 0.1;  
}

function readLouder() {
  console.log(arguments.callee.name);
  currentVolume = currentVolume + 0.1;  
}

function readSofter() {
  console.log(arguments.callee.name);
  currentVolume = currentVolume - 0.1;  
}

function startVoice() {
  console.log(arguments.callee.name);
  SpeechKITT.startRecognition();
}
function stopVoice() {
  console.log(arguments.callee.name);
  SpeechKITT.abortRecognition();
}
function pauseVoice() {
  console.log(arguments.callee.name);
  SpeechKITT.abortRecognition();
}

function previousStep() {
  console.log(arguments.callee.name + currentStep);
  if (currentStep == 0 ) {
    return;
  }
  currentStep = currentStep -1;
  readStep(currentStep);
}

function nextStep() {
  console.log(arguments.callee.name + currentStep);
  currentStep = currentStep + 1;
  readStep(currentStep);
}

function readStep(stepNum) {
  console.log(arguments.callee.name + stepNum);
  // 1番is recognized as 一番
  if (stepNum == '一') {
    stepNum = 01;
  }
  if (stepNum == 1) {
    stepNum = 01;
  }
  currentStep = stepNum;
  text = $("h4:contains("+ currentStep +  ")").siblings(':visible').text();
  higlightedImg = $("h4:contains("+ currentStep +  ")").siblings('.stepPhoto').find('.processImage');

  speakMsg(text);
}

// TODO
// How to check language of text and switch voice dynamically?

function loadAnnyang() {
  if (annyang) {
      var commands = {
        '*termのレシピ': processSearch,

        '上側を見せて': scrollUp,
        '下側を見せて': scrollDown,

        'ゆっくり話して': readSlower,
        '早く話して': readFaster,
        '大きい声で': readLouder,
        '小さな声で': readSofter,

        '初めて': startVoice,
        '待って': pauseVoice,
        '終わって': stopVoice,

        '前のステップ': previousStep,
        '次のステップ': nextStep,
        '*term番のステップ': readStep
      };

    //annyang.debug();
    annyang.addCommands(commands);
    annyang.setLanguage("ja-JP");
    SpeechKITT.annyang({ autoRestart: true });
    SpeechKITT.setInstructionsText('話してね！');
    // Looks too big and ugly
    //SpeechKITT.setSampleCommands(['上見せて','次のステップ','番のステップ'])
    SpeechKITT.setStylesheet(chrome.extension.getURL("css/flat.css"));
    SpeechKITT.displayRecognizedSentence();
    SpeechKITT.vroom();
  }
}

function setupSpeaker() {
    var img = document.createElement("img");
    img.src = chrome.extension.getURL("img/speaker.png");

    speaker = document.createElement('div');
    speaker.id = 'speaker';
    speaker.style.display = "none"

    speaker.appendChild(img);
    document.body.appendChild(speaker);  
}

loadAnnyang();
setupSpeaker();