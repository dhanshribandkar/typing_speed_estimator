const sampleTextElement = document.getElementById("sample-text");
const inputArea = document.getElementById("input-area");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const levelDisplay = document.getElementById("level");
const restartBtn = document.getElementById("restart-btn");
const resultsDiv = document.getElementById("results");

let startTime = null;
let mistakes = 0;
let sampleText = "";

// Load a random paragraph
function loadParagraph() {
  sampleText = window.paragraphs[Math.floor(Math.random() * window.paragraphs.length)];
  sampleTextElement.innerText = sampleText;
}

loadParagraph();

inputArea.addEventListener("input", async () => {
  if (!startTime) startTime = new Date();

  const typedText = inputArea.value;

  // If user completed the paragraph
  if (typedText.length === sampleText.length) {
    const timeTaken = (new Date() - startTime) / 1000 / 60; // minutes
    mistakes = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] !== sampleText[i]) mistakes++;
    }

    const wordsTyped = typedText.trim().split(" ").length;
    const wpm = Math.round(wordsTyped / timeTaken);
    const accuracy = Math.max(0, Math.round(((typedText.length - mistakes) / typedText.length) * 100));

    // Show results
    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy;
    mistakesDisplay.innerText = mistakes;
    resultsDiv.style.display = "block";

    // AI Prediction
    if (model) {
      const inputTensor = tf.tensor2d([[wpm, accuracy]]);
      const prediction = model.predict(inputTensor);
      const result = await prediction.data();
      const classes = ["Beginner", "Intermediate", "Advanced"];
      levelDisplay.innerText = classes[result.indexOf(Math.max(...result))];
    } else {
      levelDisplay.innerText = "Loading AI...";
    }

    inputArea.disabled = true;
  }
});

restartBtn.addEventListener("click", () => {
  inputArea.value = "";
  inputArea.disabled = false;
  resultsDiv.style.display = "none";
  startTime = null;
  mistakes = 0;
  loadParagraph();
});
