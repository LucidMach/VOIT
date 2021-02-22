const mic = document.querySelector(".mic");
const pre = document.querySelector(".preview");
try {
  //   pre.textContent = "Hello!";
  const SpeechRecog =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const ears = new SpeechRecog();

  ears.onstart = function () {
    console.log("Ears Activated");
  };

  ears.onresult = function (e) {
    // console.log(e);
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;

    pre.style.display = "flex";
    pre.textContent = transcript;
    outLoud(transcript);
  };

  mic.addEventListener("click", () => {
    ears.start();
  });
} catch (err) {
  pre.textContent = "Your Browser Doesn't Support Speech Recognition";
}
try {
  function outLoud(msg) {
    const mouth = new SpeechSynthesisUtterance();
    mouth.rate = 1;
    mouth.pitch = 1;
    mouth.volume = 1;
    mouth.text = msg;
    window.speechSynthesis.speak(mouth);
  }
} catch (err) {
  pre.textContent = "Your Browser Doesn't Support Speech Synthesis";
}
