// model.js
let model;

async function loadModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [2] }));
  model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

  const xs = tf.tensor2d([
    [10, 80], [20, 85], [30, 90], [40, 95], [50, 96], [70, 97]
  ]);
  const ys = tf.tensor2d([
    [1, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 1],
  ]);

  await model.fit(xs, ys, { epochs: 50 });
  console.log("AI model trained & ready!");
}

loadModel();

// Random paragraph options
window.paragraphs = [
  "Learning to type faster is not just about speed but also accuracy. Focus on each letter and gradually your hands will remember where each key is.",
  "Artificial Intelligence is changing the way we interact with technology. From voice assistants to self-driving cars, AI is everywhere around us.",
  "Typing regularly improves muscle memory and helps in reducing typing errors. Practice for at least ten minutes daily to see improvement."
];
