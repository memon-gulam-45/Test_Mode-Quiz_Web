import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const allQues = [
  {
    question: "What does ML stand for in AI?",
    options: {
      A: "Machine Logic",
      B: "Machine Learning",
      C: "Macro Learning",
      D: "Manual Learning",
    },
    answer: "B",
  },
  {
    question: "Which of these is a type of AI?",
    options: {
      A: "Narrow AI",
      B: "Supervised Learning",
      C: "Data Mining",
      D: "Feature Scaling",
    },
    answer: "A",
  },
  {
    question: "Which algorithm is used for classification problems?",
    options: {
      A: "Linear Regression",
      B: "Logistic Regression",
      C: "K-Means",
      D: "PCA",
    },
    answer: "B",
  },
  {
    question: "What is the goal of supervised learning?",
    options: {
      A: "Group unlabeled data",
      B: "Predict output using labeled data",
      C: "Compress data",
      D: "Reinforce behavior",
    },
    answer: "B",
  },
  {
    question: "What is overfitting?",
    options: {
      A: "Model under-performs",
      B: "Model memorizes training data",
      C: "Model generalizes well",
      D: "Model ignores outliers",
    },
    answer: "B",
  },
  {
    question: "Which of the following is an unsupervised algorithm?",
    options: {
      A: "Logistic Regression",
      B: "Decision Tree",
      C: "K-Means Clustering",
      D: "Random Forest",
    },
    answer: "C",
  },
  {
    question: "Which library is used for deep learning in Python?",
    options: { A: "Flask", B: "TensorFlow", C: "Matplotlib", D: "Requests" },
    answer: "B",
  },
  {
    question: "Which activation function is most common in hidden layers?",
    options: { A: "Sigmoid", B: "Tanh", C: "ReLU", D: "Softmax" },
    answer: "C",
  },
  {
    question: "Which of the following is a reinforcement learning algorithm?",
    options: { A: "Q-Learning", B: "KNN", C: "LDA", D: "Gradient Boosting" },
    answer: "A",
  },
  {
    question: "What is the output of a classification model?",
    options: {
      A: "Clusters",
      B: "Categories",
      C: "Regression values",
      D: "Distances",
    },
    answer: "B",
  },
  {
    question: "What is the full form of CNN?",
    options: {
      A: "Clustered Neural Network",
      B: "Convolutional Neural Network",
      C: "Central Neural Node",
      D: "Cognitive Neural Network",
    },
    answer: "B",
  },
  {
    question: "Which metric is used for classification performance?",
    options: { A: "MSE", B: "RMSE", C: "Accuracy", D: "MAE" },
    answer: "C",
  },
  {
    question: "What is the main goal of AI?",
    options: {
      A: "Storing data",
      B: "Mimicking human intelligence",
      C: "Creating databases",
      D: "Creating mobile apps",
    },
    answer: "B",
  },
  {
    question: "Which method is used to reduce overfitting?",
    options: {
      A: "Underfitting",
      B: "Data Splitting",
      C: "Regularization",
      D: "Gradient Clipping",
    },
    answer: "C",
  },
  {
    question: "Which algorithm is suitable for spam detection?",
    options: {
      A: "Linear Regression",
      B: "K-Means",
      C: "Naive Bayes",
      D: "PCA",
    },
    answer: "C",
  },
  {
    question: "Which function is used to compute loss in regression?",
    options: {
      A: "Cross-entropy",
      B: "Mean Squared Error",
      C: "Binary loss",
      D: "Hinge loss",
    },
    answer: "B",
  },
  {
    question: "Which ML model works by voting from multiple models?",
    options: { A: "SVM", B: "Naive Bayes", C: "Ensemble", D: "KNN" },
    answer: "C",
  },
  {
    question: "Which of the following is NOT an ML task?",
    options: {
      A: "Classification",
      B: "Clustering",
      C: "Sorting",
      D: "Regression",
    },
    answer: "C",
  },
  {
    question: "What does backpropagation do?",
    options: {
      A: "Classifies output",
      B: "Updates weights",
      C: "Generates features",
      D: "Splits dataset",
    },
    answer: "B",
  },
  {
    question: "Which is a popular library for ML in Python?",
    options: { A: "Pandas", B: "Scikit-learn", C: "Flask", D: "Numpy" },
    answer: "B",
  },
  {
    question: "What is the function of an optimizer?",
    options: {
      A: "Choose features",
      B: "Reduce dataset size",
      C: "Minimize loss",
      D: "Add noise",
    },
    answer: "C",
  },
  {
    question: "Which neural net layer extracts features in images?",
    options: { A: "Dense", B: "Dropout", C: "Convolution", D: "Flatten" },
    answer: "C",
  },
  {
    question: "What does the softmax function return?",
    options: {
      A: "Distances",
      B: "One-hot vectors",
      C: "Probability distribution",
      D: "Zero values",
    },
    answer: "C",
  },
  {
    question: "What is AI bias?",
    options: {
      A: "Accurate prediction",
      B: "Training mistake",
      C: "Unfair decisions by AI",
      D: "AI learning from data",
    },
    answer: "C",
  },
  {
    question: "Which model works well with text data?",
    options: { A: "CNN", B: "RNN", C: "GAN", D: "LDA" },
    answer: "B",
  },
  {
    question: "What is epoch in training?",
    options: {
      A: "Single batch",
      B: "1 forward pass",
      C: "One full pass through dataset",
      D: "Optimizer run",
    },
    answer: "C",
  },
  {
    question: "What is AI hallucination?",
    options: {
      A: "Model crashes",
      B: "Model predicts accurately",
      C: "Model generates incorrect but confident outputs",
      D: "Training data missing",
    },
    answer: "C",
  },
  {
    question: "Which is an example of Natural Language Processing?",
    options: {
      A: "Face detection",
      B: "Speech recognition",
      C: "Digit recognition",
      D: "Clustering data",
    },
    answer: "B",
  },
  {
    question: "Which is a common evaluation metric in NLP?",
    options: { A: "BLEU score", B: "Accuracy", C: "RMSE", D: "Recall" },
    answer: "A",
  },
  {
    question: "Which algorithm is based on margin maximization?",
    options: { A: "KNN", B: "Naive Bayes", C: "SVM", D: "K-Means" },
    answer: "C",
  },
  {
    question: "Which technique generates new data?",
    options: { A: "CNN", B: "GAN", C: "RNN", D: "SVM" },
    answer: "B",
  },
  {
    question: "Which technique reduces dimensions?",
    options: { A: "CNN", B: "Regularization", C: "PCA", D: "Dropout" },
    answer: "C",
  },
  {
    question: "What is the job of a hidden layer?",
    options: {
      A: "Output prediction",
      B: "Loss calculation",
      C: "Feature transformation",
      D: "Data input",
    },
    answer: "C",
  },
];

async function uploadQuestions() {
  for (let q of allQues) {
    try {
      const docRef = await addDoc(collection(db, "ai-ml"), q);
      console.log("Added:", docRef.id);
    } catch (err) {
      console.error("Error :", err);
    }
  }
}

document.body.addEventListener("click", () => {
  uploadQuestions();
});
