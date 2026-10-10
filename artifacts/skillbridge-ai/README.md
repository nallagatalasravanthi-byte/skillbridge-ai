# SkillBridge AI

SkillBridge AI is a responsive learning companion for students. It makes quiz answers useful by showing automatic scoring, correct answers, concise explanations, concept tags, and transparent study recommendations grounded in a learner’s submitted responses.

## Features

- Learner overview with a real attempt count, answer count, overall accuracy, recent activity, and observed concept signals.
- Subject library for Python, Data Structures, Artificial Intelligence, Mathematics, and Science.
- Four curated multiple-choice questions per subject, with answer validation, step-by-step quiz navigation, automatic scoring, and answer explanations.
- Rule-based concept review: submitted answer history is aggregated by subject and concept; concepts below 70% accuracy are flagged for practice.
- Progress history with per-subject accuracy, quiz history, and score comparison when there are repeat attempts in the same subject.
- Retake entry points from subject cards, quiz results, guidance, and progress.
- Attempts persist in browser `localStorage`. The app handles malformed or unavailable local storage gracefully and explains that data is local to the current browser.
- Empty states before quiz completion; no sample learner performance or generated results are included.

There is no backend, external AI service, or third-party API integration.

## Local setup

From the workspace root, install dependencies:

```bash
pnpm install
```

The managed web workflow starts the preview with the required port and base path. To run the package manually, change into this artifact directory and provide both variables:

```bash
cd artifacts/skillbridge-ai
PORT=5173 BASE_PATH=/ pnpm dev
```

Open the local Vite URL printed in the terminal. To check types and run a production build locally:

```bash
pnpm typecheck
PORT=5173 BASE_PATH=/ pnpm build
PORT=4173 BASE_PATH=/ pnpm serve
```

Attempts are stored only in the current browser profile. Clearing site data removes them.

## Publishing

Use Replit's **Publish** action for this web app. It has no backend services or external API setup requirements. For another static host, publish the generated `dist/public` directory, configure it to serve a single-page application by falling back to `index.html` for routes such as `/dashboard`, `/quiz`, and `/progress`, and set the Vite base path to match the host's URL prefix.
