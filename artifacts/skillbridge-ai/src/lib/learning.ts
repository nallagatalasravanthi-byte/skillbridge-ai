export type Subject = { id: string; title: string; description: string; focus: string };
export type Question = {
  id: string;
  subjectId: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  concept: string;
};
export type AnswerRecord = {
  questionId: string;
  concept: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
};
export type QuizAttempt = {
  id: string;
  subjectId: string;
  score: number;
  total: number;
  completedAt: string;
  answers: AnswerRecord[];
};
export type ConceptAccuracy = {
  concept: string;
  subjectId: string;
  correct: number;
  total: number;
  accuracy: number;
};

export const subjects: Subject[] = [
  { id: 'python', title: 'Python', description: 'Build confidence with Python fundamentals, control flow, and working with collections.', focus: 'Programming foundations' },
  { id: 'data-structures', title: 'Data Structures', description: 'Choose the right structures and understand how they organize and retrieve information.', focus: 'Algorithms & structures' },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence', description: 'Explore search, learning systems, and the ideas behind intelligent applications.', focus: 'Intelligent systems' },
  { id: 'mathematics', title: 'Mathematics', description: 'Strengthen reasoning across algebra, probability, and practical problem solving.', focus: 'Quantitative reasoning' },
  { id: 'science', title: 'Science', description: 'Connect core scientific principles to the observations and systems around us.', focus: 'Scientific thinking' },
];

export const questions: Question[] = [
  { id: 'py-1', subjectId: 'python', prompt: 'What does the expression `len([4, 7, 9])` return?', options: ['2', '3', '4', 'An error'], correctIndex: 1, explanation: 'The list contains three items, so len returns the number of items: 3.', concept: 'Lists & built-ins' },
  { id: 'py-2', subjectId: 'python', prompt: 'Which keyword begins a conditional branch in Python?', options: ['when', 'if', 'check', 'switch'], correctIndex: 1, explanation: 'Python uses `if` to start a conditional. Additional branches can use `elif` and `else`.', concept: 'Conditionals' },
  { id: 'py-3', subjectId: 'python', prompt: 'What is the value of `range(2, 5)` when iterated?', options: ['2, 3, 4', '2, 3, 4, 5', '1, 2, 3, 4', '3, 4, 5'], correctIndex: 0, explanation: 'The stop value is exclusive. Starting at 2 and stopping before 5 yields 2, 3, and 4.', concept: 'Loops & ranges' },
  { id: 'py-4', subjectId: 'python', prompt: 'Which statement creates a function named `greet`?', options: ['function greet():', 'def greet():', 'make greet():', 'fn greet():'], correctIndex: 1, explanation: 'Python function definitions begin with `def`, followed by the function name and parentheses.', concept: 'Functions' },
  { id: 'ds-1', subjectId: 'data-structures', prompt: 'Which structure follows last-in, first-out order?', options: ['Queue', 'Stack', 'Graph', 'Hash table'], correctIndex: 1, explanation: 'A stack removes the most recently added item first: last in, first out.', concept: 'Stacks & queues' },
  { id: 'ds-2', subjectId: 'data-structures', prompt: 'What is the average lookup time for a value by key in a hash map?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctIndex: 0, explanation: 'Hash maps provide average constant-time lookup, assuming a good hash function and manageable collisions.', concept: 'Hashing & complexity' },
  { id: 'ds-3', subjectId: 'data-structures', prompt: 'In a queue, where is a new item usually added?', options: ['At the front', 'At the rear', 'At the middle', 'At a random position'], correctIndex: 1, explanation: 'Queues enqueue at the rear and dequeue from the front, preserving first-in, first-out order.', concept: 'Stacks & queues' },
  { id: 'ds-4', subjectId: 'data-structures', prompt: 'Which traversal visits a node before its child nodes?', options: ['Post-order', 'In-order', 'Pre-order', 'Level-back'], correctIndex: 2, explanation: 'Pre-order traversal visits the current node first, then recursively visits its children.', concept: 'Trees & traversal' },
  { id: 'ai-1', subjectId: 'artificial-intelligence', prompt: 'In supervised learning, training examples include what?', options: ['Only unlabelled inputs', 'Inputs paired with labels', 'Only a reward signal', 'No examples'], correctIndex: 1, explanation: 'Supervised learning uses examples with known labels or target values to learn a mapping.', concept: 'Machine learning basics' },
  { id: 'ai-2', subjectId: 'artificial-intelligence', prompt: 'What is the purpose of a heuristic in informed search?', options: ['Estimate distance to a goal', 'Store every visited state', 'Guarantee a random route', 'Remove all constraints'], correctIndex: 0, explanation: 'A heuristic estimates how close a state is to the goal and helps guide search efficiently.', concept: 'Search & heuristics' },
  { id: 'ai-3', subjectId: 'artificial-intelligence', prompt: 'Which outcome best describes overfitting?', options: ['Model performs equally on all data', 'Model memorizes training patterns but generalizes poorly', 'Model has too few parameters to learn', 'Model never sees training data'], correctIndex: 1, explanation: 'An overfit model captures noise or very specific training examples, then struggles with new data.', concept: 'Model evaluation' },
  { id: 'ai-4', subjectId: 'artificial-intelligence', prompt: 'What does a classification model predict?', options: ['A category or class', 'Only a continuous measurement', 'A database schema', 'A sorting order'], correctIndex: 0, explanation: 'Classification predicts discrete labels, such as whether an image contains a cat or a dog.', concept: 'Machine learning basics' },
  { id: 'ma-1', subjectId: 'mathematics', prompt: 'If 3x + 2 = 14, what is x?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: 'Subtract 2 from both sides to get 3x = 12, then divide by 3. So x = 4.', concept: 'Linear equations' },
  { id: 'ma-2', subjectId: 'mathematics', prompt: 'What is the probability of rolling an even number on a fair six-sided die?', options: ['1/6', '1/3', '1/2', '2/3'], correctIndex: 2, explanation: 'Three of the six equally likely outcomes (2, 4, 6) are even, so the probability is 3/6 = 1/2.', concept: 'Probability' },
  { id: 'ma-3', subjectId: 'mathematics', prompt: 'What is the area of a triangle with base 8 and height 5?', options: ['13', '20', '40', '80'], correctIndex: 1, explanation: 'Triangle area is one-half times base times height: 0.5 × 8 × 5 = 20.', concept: 'Geometry & measurement' },
  { id: 'ma-4', subjectId: 'mathematics', prompt: 'Which is the slope of the line through (1, 2) and (3, 8)?', options: ['2', '3', '4', '6'], correctIndex: 1, explanation: 'Slope is change in y divided by change in x: (8 − 2) / (3 − 1) = 3.', concept: 'Linear equations' },
  { id: 'sc-1', subjectId: 'science', prompt: 'Which particle has a negative electric charge?', options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], correctIndex: 2, explanation: 'Electrons carry negative charge. Protons are positive and neutrons have no net charge.', concept: 'Atoms & matter' },
  { id: 'sc-2', subjectId: 'science', prompt: 'What process do plants use to convert light energy into chemical energy?', options: ['Respiration', 'Photosynthesis', 'Evaporation', 'Fermentation'], correctIndex: 1, explanation: 'Photosynthesis uses light energy to build sugars from carbon dioxide and water.', concept: 'Energy & ecosystems' },
  { id: 'sc-3', subjectId: 'science', prompt: 'At sea level, pure water boils at approximately what temperature?', options: ['0°C', '50°C', '100°C', '150°C'], correctIndex: 2, explanation: 'At standard atmospheric pressure, water boils at 100°C (212°F).', concept: 'Energy & matter' },
  { id: 'sc-4', subjectId: 'science', prompt: 'Which force keeps planets in orbit around the Sun?', options: ['Magnetism', 'Friction', 'Gravity', 'Buoyancy'], correctIndex: 2, explanation: 'The Sun’s gravitational attraction provides the centripetal force that keeps planets in orbit.', concept: 'Forces & motion' },
];

const STORAGE_KEY = 'skillbridge.quizAttempts.v1';

function isAttempt(value: unknown): value is QuizAttempt {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<QuizAttempt>;
  return typeof item.id === 'string' && typeof item.subjectId === 'string' &&
    typeof item.score === 'number' && typeof item.total === 'number' &&
    typeof item.completedAt === 'string' && Array.isArray(item.answers) &&
    item.answers.every((answer) => !!answer && typeof answer.questionId === 'string' &&
      typeof answer.concept === 'string' && typeof answer.selectedIndex === 'number' &&
      typeof answer.correctIndex === 'number' && typeof answer.isCorrect === 'boolean');
}

export function loadAttempts(): QuizAttempt[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter(isAttempt) : [];
  } catch {
    return [];
  }
}

export function saveAttempt(attempt: QuizAttempt): boolean {
  try {
    const current = loadAttempts();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([attempt, ...current]));
    return true;
  } catch {
    return false;
  }
}

export function summarizeConcepts(attempts: QuizAttempt[]): ConceptAccuracy[] {
  const map = new Map<string, { subjectId: string; correct: number; total: number }>();
  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const key = `${attempt.subjectId}::${answer.concept}`;
      const entry = map.get(key) ?? { subjectId: attempt.subjectId, correct: 0, total: 0 };
      entry.total += 1;
      if (answer.isCorrect) entry.correct += 1;
      map.set(key, entry);
    }
  }
  return [...map.entries()].map(([key, value]) => {
    const concept = key.split('::').slice(1).join('::');
    return { concept, ...value, accuracy: Math.round(value.correct / value.total * 100) };
  }).sort((a, b) => a.accuracy - b.accuracy);
}

export const subjectById = (id: string) => subjects.find((subject) => subject.id === id);
export const questionsFor = (id: string) => questions.filter((question) => question.subjectId === id);
