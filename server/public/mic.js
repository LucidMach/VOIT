const mic = document.querySelector(".mic");
const pre = document.querySelector(".preview");
const commands = document.querySelector(".commands");

const keywords = {
  hello: "Hello Master Wayne\n",
  name: "My name is voit\n",
  who: "I am voit\n",

  on: "powering up the bi ped\n",
  down: "shutting down the bi ped\n",

  walk: "initiating walk cycle\n",
  run: "initiating walk cycle\n",
  crawl: "initiating walk cycle\n",

  faster: "increasing speed\n",
  slower: "decreasing speed\n",
};

const keys = Object.keys(keywords);

try {
  const SpeechRecog =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const ears = new SpeechRecog();

  ears.onstart = function () {
    console.log("Ears Activated");
  };

  // outputting what it hears
  ears.onresult = function (e) {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    pre.style.display = "flex";
    pre.textContent = transcript;
    const op = handleCommands(transcript);
    outLoud(op);
  };

  mic.addEventListener("click", () => {
    ears.start();
  });
} catch (err) {
  pre.textContent = "Your Browser Doesn't Support Speech Synthesis";
}

function outLoud(msg) {
  const mouth = new SpeechSynthesisUtterance();
  mouth.rate = 1;
  mouth.pitch = 1;
  mouth.volume = 1;
  mouth.text = msg;
  window.speechSynthesis.speak(mouth);
}

function handleCommands(input) {
  let output = [];
  let inout = [];
  // console.log(input);
  keys.forEach((key) => {
    if (input.includes(key)) {
      transferCommands(key);
      inout.push(keywords[key]);
      output.push(key);
    }
  });
  commands.style.display = "flex";
  commands.textContent = output.join(" ");
  // console.log(output);
  return inout;
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
