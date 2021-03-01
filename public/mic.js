const mic = document.querySelector(".mic");
const pre = document.querySelector(".preview");

const keywords = {
  created: "I was created by Suraj",
  built: "Team 6 built me",

  lights: "turning on LED",
  off: "turning off LED",

  faster: "increasing blink speed",
  slower: "decreasing blink speed",

  hello: "Hello, I'm voit",
  you: "I am voit",
};

const keys = Object.keys(keywords);

try {
  const SpeechRecog =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const ears = new SpeechRecog();

  ears.onstart = function () {
    console.log("Ears Activated");
  };

  ears.onresult = function (e) {
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
    msg = handleCommands(msg);
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
function handleCommands(command) {
  console.log(command);
  keys.forEach((key) => {
    if (command.includes(key)) {
      transferCommands(key);
      command = keywords[key];
    }
  });
  return command;
}

const transferCommands = async (command) => {
  const res = await fetch("../command", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command: command }),
  });
  const data = await res.json();
  console.log(data);
};
