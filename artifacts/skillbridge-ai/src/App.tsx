import { useMemo, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit, BookOpen,
  Check, CheckCircle2, ChevronRight, CircleHelp, Code2, Compass, FlaskConical,
  GraduationCap, Lightbulb, ListChecks, Network, RotateCcw, Sparkles,
  Target, TrendingUp,
} from 'lucide-react';
import {
  type QuizAttempt, type Question, loadAttempts, questionsFor,
  questions, saveAttempt, subjectById, subjects, summarizeConcepts,
} from '@/lib/learning';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Compass },
  { href: '/learn', label: 'Explore subjects', icon: BookOpen },
  { href: '/quiz', label: 'Take a quiz', icon: ListChecks },
  { href: '/recommendations', label: 'Study guidance', icon: Lightbulb },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
];

function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const current = navItems.find((item) => location === item.href) ?? navItems[0];
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link href="/dashboard" className="brand" data-testid="link-brand">
          <span className="brand-mark"><BrainCircuit size={21} /></span>
          <span className="brand-name">SkillBridge<span style={{ color: '#b9a9ff' }}> AI</span></span>
        </Link>
        <div className="nav-label">Your learning space</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link href={href} key={href} className={`nav-link ${location === href ? 'active' : ''}`} data-testid={`link-nav-${href.slice(1)}`}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-foot">Your answers stay yours.<br />Study guidance is based on your quiz history.</div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div className="top-context"><span>SkillBridge AI</span><ChevronRight size={13} /><strong>{current.label}</strong></div>
          <div className="learner-chip"><span className="learner-avatar"><GraduationCap size={17} /></span><span>My learning space</span></div>
        </header>
        <main>{children}</main>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href} className={location === href ? 'active' : ''} data-testid={`mobile-link-${href.slice(1)}`}>
            <Icon strokeWidth={1.9} /><span>{label === 'Explore subjects' ? 'Learn' : label === 'Study guidance' ? 'Guidance' : label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Metric({ icon: Icon, label, value, hint }: { icon: typeof Target; label: string; value: string; hint: string }) {
  return <section className="panel metric" data-testid={`metric-${label.toLowerCase().replaceAll(' ', '-')}`}>
    <div className="metric-icon"><Icon size={20} /></div>
    <div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-hint">{hint}</div></div>
  </section>;
}

function SubjectIcon({ id, size = 19 }: { id: string; size?: number }) {
  const Icon = id === 'python' ? Code2 : id === 'data-structures' ? Network :
    id === 'artificial-intelligence' ? BrainCircuit : id === 'mathematics' ? Target : FlaskConical;
  return <Icon size={size} strokeWidth={1.8} />;
}

function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <div className="page-header"><div className="eyebrow">{eyebrow}</div><h1 className="page-title">{title}</h1><p className="page-intro">{intro}</p></div>;
}

function SubjectCards({ compact = false }: { compact?: boolean }) {
  return <div className="subject-grid">
    {subjects.map((subject) => <article className="panel subject-card" key={subject.id} data-testid={`card-subject-${subject.id}`}>
      <div className="subject-card-top"><span className="subject-icon"><SubjectIcon id={subject.id} /></span><span className="pill">{subject.focus}</span></div>
      <h3>{subject.title}</h3><p>{subject.description}</p>
      {!compact && <Link href={`/quiz?subject=${subject.id}`} className="text-link" data-testid={`link-practice-${subject.id}`}>Practice this subject <ArrowRight size={14} /></Link>}
      {compact && <Link href={`/quiz?subject=${subject.id}`} className="text-link" data-testid={`link-quiz-${subject.id}`}>Start a quiz <ArrowRight size={14} /></Link>}
    </article>)}
  </div>;
}

function EmptyState({ title, body, action, href, icon: Icon = BookOpen }: { title: string; body: string; action?: string; href?: string; icon?: typeof BookOpen }) {
  return <div className="panel empty-state"><div className="empty-symbol"><Icon size={23} /></div><h3>{title}</h3><p>{body}</p>{action && href && <Link href={href} className="btn btn-primary" data-testid="link-empty-action">{action}<ArrowRight size={15} /></Link>}</div>;
}

function Dashboard({ attempts }: { attempts: QuizAttempt[] }) {
  const total = attempts.length;
  const scoredAttempts = attempts.filter((attempt) => attempt.total > 0);
  const accuracy = scoredAttempts.length
    ? Math.round(scoredAttempts.reduce((sum, attempt) => sum + attempt.score / attempt.total, 0) / scoredAttempts.length * 100)
    : null;
  const practicedQuestions = new Set(attempts.flatMap((attempt) => attempt.answers.map((answer) => answer.questionId))).size;
  const learningProgress = questions.length ? Math.round(practicedQuestions / questions.length * 100) : null;
  const concepts = summarizeConcepts(attempts);
  const latest = attempts.slice(0, 3);
  return <div className="page">
    <section className="hero-panel">
      <div className="eyebrow" style={{ color: '#c4b9ff' }}>Your next step starts here</div>
      <h1>Identify your learning gaps. Build your skills. Bridge your future.</h1>
      <p>SkillBridge AI turns your quiz responses into clear, practical study guidance—so you know what to work on next and why.</p>
      <div className="hero-actions"><Link href="/quiz" className="btn btn-light" data-testid="button-dashboard-quiz">Take a quick quiz <ArrowRight size={15} /></Link><Link href="/learn" className="btn" style={{ color: '#f2efff', background: '#ffffff18' }} data-testid="button-explore-subjects">Explore subjects</Link></div>
    </section>
    <div className="metrics">
      <Metric icon={ListChecks} label="Quizzes completed" value={String(total)} hint={total ? 'Your submitted attempts' : 'Ready when you are'} />
      <Metric icon={Target} label="Average score" value={accuracy === null ? '—' : `${accuracy}%`} hint={accuracy === null ? 'Calculated after your first quiz' : 'Average across submitted quizzes'} />
      <Metric icon={TrendingUp} label="Learning progress" value={learningProgress === null || total === 0 ? '—' : `${learningProgress}%`} hint={total ? `${practicedQuestions} of ${questions.length} unique questions practiced` : 'Your practice will appear here'} />
    </div>
    <div className="section-heading"><div><h2>Choose a place to begin</h2><p>Five subjects, one thoughtful next step at a time.</p></div><Link href="/learn" className="text-link" data-testid="link-see-all-subjects">All subjects <ArrowRight size={14} /></Link></div>
    <SubjectCards compact />
    <div className="section-heading"><div><h2>Your learning signals</h2><p>Only submitted answers are included in this view.</p></div><Link href="/recommendations" className="text-link" data-testid="link-dashboard-guidance">View guidance <ArrowRight size={14} /></Link></div>
    {total === 0 ? <EmptyState title="Your learning story starts with one quiz" body="Complete a short quiz to see your answer history, identify concepts to revisit, and get practical study suggestions here." action="Choose a subject" href="/learn" icon={Sparkles} /> :
      <div className="two-col">
        <section className="panel list-panel"><div className="section-heading" style={{ margin: '0 0 14px' }}><div><h2>Recent attempts</h2><p>Your latest submitted quizzes</p></div></div>
          {latest.map((attempt) => <AttemptRow key={attempt.id} attempt={attempt} />)}
        </section>
        <section className="panel list-panel"><div className="section-heading" style={{ margin: '0 0 14px' }}><div><h2>Concepts to revisit</h2><p>Low accuracy is flagged below 70%.</p></div></div>
          {concepts.filter((concept) => concept.accuracy < 70).length ? concepts.filter((concept) => concept.accuracy < 70).slice(0, 3).map((item) => <ConceptRow key={`${item.subjectId}-${item.concept}`} item={item} />) : <p className="notice">{concepts.length ? 'No concepts are below the review threshold yet. Keep practicing to build a fuller picture.' : 'More answers will help us surface patterns across concepts.'}</p>}
        </section>
      </div>}
    <div className="footer-note">A transparent study companion. Guidance is based on your submitted quiz answers.</div>
  </div>;
}

function AttemptRow({ attempt }: { attempt: QuizAttempt }) {
  const subject = subjectById(attempt.subjectId);
  return <div className="list-row" data-testid={`attempt-row-${attempt.id}`}><div className="list-icon"><SubjectIcon id={attempt.subjectId} size={17} /></div><div className="list-copy"><strong>{subject?.title ?? 'Subject quiz'}</strong><span>{new Date(attempt.completedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} · {attempt.score} of {attempt.total} correct</span></div><span className="pill">{attempt.total ? Math.round(attempt.score / attempt.total * 100) : 0}%</span></div>;
}

function ConceptRow({ item }: { item: ReturnType<typeof summarizeConcepts>[number] }) {
  return <div className="list-row" data-testid={`concept-row-${item.concept.toLowerCase().replaceAll(' ', '-')}`}><div className="list-icon"><CircleHelp size={17} /></div><div className="list-copy"><strong>{item.concept}</strong><span>{subjectById(item.subjectId)?.title} · {item.correct}/{item.total} correct</span></div><span className="pill muted-pill">{item.accuracy}%</span></div>;
}

function LearnPage() {
  return <div className="page"><PageHeader eyebrow="Subject library" title="Learn with a clear direction." intro="Pick a subject to explore a few focused questions. Each quiz is a chance to notice what you know and what deserves another look." />
    <div className="section-heading"><div><h2>Five areas to explore</h2><p>Curated questions with answer explanations and concept tags.</p></div></div>
    <SubjectCards />
    <div className="footer-note">Start anywhere. Your progress is built from the quizzes you choose to submit.</div>
  </div>;
}

function QuizPage({ onSave }: { onSave: (attempt: QuizAttempt) => boolean }) {
  const [, setLocation] = useLocation();
  const querySubject = new URLSearchParams(window.location.search).get('subject') ?? '';
  const [subjectId, setSubjectId] = useState(querySubject);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(() => questionsFor(querySubject));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [storageWarning, setStorageWarning] = useState(false);
  const activeSubject = subjectById(subjectId);
  const question = activeQuestions[index];
  const setSubject = (value: string) => {
    setSubjectId(value); setActiveQuestions(questionsFor(value)); setAnswers({}); setIndex(0); setResult(null); setStorageWarning(false);
    setLocation(value ? `/quiz?subject=${value}` : '/quiz');
  };
  const startOver = (id = subjectId) => {
    setSubjectId(id); setActiveQuestions(questionsFor(id)); setAnswers({}); setIndex(0); setResult(null); setStorageWarning(false);
  };
  const submit = () => {
    if (!activeSubject || activeQuestions.length === 0 || activeQuestions.some((item) => answers[item.id] === undefined)) return;
    const records = activeQuestions.map((item) => ({
      questionId: item.id, concept: item.concept, selectedIndex: answers[item.id],
      correctIndex: item.correctIndex, isCorrect: answers[item.id] === item.correctIndex,
    }));
    const attempt: QuizAttempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, subjectId,
      score: records.filter((answer) => answer.isCorrect).length, total: records.length,
      completedAt: new Date().toISOString(), answers: records,
    };
    setResult(attempt);
    setStorageWarning(!onSave(attempt));
  };
  return <div className="page">
    <PageHeader eyebrow="Knowledge check" title={result ? 'Your quiz, explained.' : 'Practice makes progress.'} intro={result ? 'See how you did, review every answer, and use the explanations to decide what to revisit.' : 'Answer a short set of multiple choice questions. Your score and learning guidance are based on what you submit.'} />
    {!activeSubject || activeQuestions.length === 0 ? <section className="panel subject-select">
      <label className="select-label" htmlFor="quiz-subject">Choose a subject to begin</label>
      <select className="select-control" id="quiz-subject" value={subjectId} onChange={(event) => setSubject(event.target.value)} data-testid="select-quiz-subject">
        <option value="">Select a subject</option>{subjects.map((subject) => <option value={subject.id} key={subject.id}>{subject.title}</option>)}
      </select>
      <p className="notice">Each quiz contains four questions. Your answers are saved on this device when you submit.</p>
      <div className="section-heading"><div><h2>Or choose a subject below</h2><p>Pick up where your curiosity takes you.</p></div></div>
      <div className="subject-grid">{subjects.map((subject) => <button type="button" className="panel subject-card" key={subject.id} onClick={() => setSubject(subject.id)} data-testid={`button-quiz-${subject.id}`} style={{ textAlign: 'left', cursor: 'pointer' }}><div className="subject-card-top"><span className="subject-icon"><SubjectIcon id={subject.id} /></span><ArrowRight size={15} color="#8273c9" /></div><h3>{subject.title}</h3><p>{subject.description}</p><span className="text-link">Start quiz</span></button>)}</div>
    </section> : result ? <div className="quiz-layout">
      <section className="panel">
        <div className="results-head"><div className="score-ring" style={{ ['--score' as string]: `${result.score / result.total * 100}%` }}><strong>{result.score}/{result.total}</strong></div><div><span className="question-tag">{activeSubject.title} · quiz complete</span><h2 style={{ margin: '0 0 5px', font: '800 20px var(--app-font-display)', color: '#29355f' }}>{result.score === result.total ? 'Excellent work.' : result.score >= result.total / 2 ? 'A solid learning step.' : 'A useful place to begin.'}</h2><div className="notice" style={{ margin: 0 }}>{Math.round(result.score / result.total * 100)}% correct · Submitted answers are now included in your learning history.</div></div></div>
        {storageWarning && <p className="notice" style={{ padding: '0 22px', color: '#a35c35' }}>This browser could not save the attempt. Your result is visible for this session, but may not appear in history.</p>}
        {activeQuestions.map((item, i) => {
          const selected = result.answers.find((answer) => answer.questionId === item.id)?.selectedIndex ?? -1;
          const correct = selected === item.correctIndex;
          return <div className="result-item" key={item.id} data-testid={`result-question-${item.id}`}>
            <span className={`question-tag ${correct ? 'status-correct' : 'status-wrong'}`}>{correct ? 'Correct' : 'Review this'} · {item.concept}</span>
            <h4>{i + 1}. {item.prompt}</h4>
            <div className="answer-line"><b>Your answer:</b> {item.options[selected] ?? 'No answer'}{!correct && <span> · <b>Correct answer:</b> {item.options[item.correctIndex]}</span>}</div>
            <div className="result-explanation"><b>Why:</b> {item.explanation}</div>
          </div>;
        })}
      </section>
      <div className="hero-actions" style={{ marginTop: 17 }}><button className="btn btn-primary" onClick={() => startOver()} data-testid="button-retake-quiz"><RotateCcw size={15} />Retake {activeSubject.title}</button><Link href="/recommendations" className="btn btn-outline" data-testid="link-result-guidance">See study guidance <ArrowRight size={15} /></Link></div>
    </div> : <div className="quiz-layout">
      <div className="quiz-toolbar"><button type="button" className="text-link" onClick={() => setSubject('')} data-testid="button-change-subject"><ArrowLeft size={14} /> Change subject</button><span className="quiz-progress">{activeSubject.title} · Question {index + 1} of {activeQuestions.length}</span></div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${(index + 1) / activeQuestions.length * 100}%` }} /></div>
      {question && <section className="panel question-card" data-testid={`question-card-${question.id}`}>
        <span className="question-tag">{question.concept}</span><h2>{question.prompt}</h2>
        <div className="options">{question.options.map((option, optionIndex) => <button type="button" key={option} className={`option ${answers[question.id] === optionIndex ? 'selected' : ''}`} onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }))} aria-pressed={answers[question.id] === optionIndex} data-testid={`answer-${question.id}-${optionIndex}`}><span className="option-key">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{answers[question.id] === optionIndex && <Check size={16} style={{ marginLeft: 'auto' }} />}</button>)}</div>
        <div className="quiz-controls">
          <button type="button" className="btn btn-outline" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0} data-testid="button-previous-question"><ArrowLeft size={15} />Previous</button>
          {index < activeQuestions.length - 1 ? <button type="button" className="btn btn-primary" onClick={() => setIndex((current) => Math.min(activeQuestions.length - 1, current + 1))} disabled={answers[question.id] === undefined} data-testid="button-next-question">Next question<ArrowRight size={15} /></button> :
            <button type="button" className="btn btn-primary" onClick={submit} disabled={activeQuestions.some((item) => answers[item.id] === undefined)} data-testid="button-submit-quiz"><CheckCircle2 size={16} />Submit quiz</button>}
        </div>
        <p className="notice">{Object.keys(answers).length} of {activeQuestions.length} answered. Complete every question to submit your quiz.</p>
      </section>}
    </div>}
  </div>;
}

function Recommendations({ attempts }: { attempts: QuizAttempt[] }) {
  const concepts = useMemo(() => summarizeConcepts(attempts), [attempts]);
  const gaps = concepts.filter((item) => item.total >= 1 && item.accuracy < 70);
  const reviewGroups = new Map<string, typeof gaps>();
  for (const gap of gaps) reviewGroups.set(gap.subjectId, [...(reviewGroups.get(gap.subjectId) ?? []), gap]);
  return <div className="page"><PageHeader eyebrow="Personalized study guidance" title="A practical next step, from your answers." intro="Recommendations below come from your submitted answer history. A concept is flagged for review when its accuracy is below 70%; we do not infer results from unanswered questions." />
    {attempts.length === 0 ? <div style={{ marginTop: 28 }}><EmptyState title="Guidance appears after your first quiz" body="Take any subject quiz and submit your answers. We’ll then aggregate your actual responses by concept and highlight areas to revisit." action="Start a quiz" href="/quiz" icon={Lightbulb} /></div> :
      <>
        <div className="metrics"><Metric icon={Target} label="Concepts observed" value={String(concepts.length)} hint="Across submitted answers" /><Metric icon={ArrowDownRight} label="Review signals" value={String(gaps.length)} hint="Below 70% accuracy" /><Metric icon={CheckCircle2} label="Subjects practiced" value={String(new Set(attempts.map((attempt) => attempt.subjectId)).size)} hint="From your quiz history" /></div>
        {gaps.length === 0 ? <div className="panel empty-state" style={{ marginTop: 22 }}><div className="empty-symbol"><CheckCircle2 size={23} /></div><h3>No review flags yet</h3><p>Every observed concept is currently at or above 70%. Keep taking quizzes to build a broader, more reliable picture of your learning.</p><Link href="/learn" className="btn btn-primary" data-testid="link-recommendations-keep-going">Explore more subjects <ArrowRight size={15} /></Link></div> :
          <><div className="section-heading"><div><h2>Concepts worth another look</h2><p>Accuracy uses all recorded responses for each concept, not just your latest attempt.</p></div></div>
            <div className="two-col">{[...reviewGroups.entries()].map(([subjectId, items]) => <section className="panel recommendation" key={subjectId} data-testid={`recommendation-${subjectId}`}>
              <div className="subject-card-top"><span className="subject-icon"><SubjectIcon id={subjectId} /></span><span className="pill">{subjectById(subjectId)?.title}</span></div>
              <h3>Make these concepts your focus</h3>
              <p>Your submitted answers show these concepts below the 70% review threshold.</p>
              {items.map((item) => <div className="list-row" key={item.concept}><div className="list-copy"><strong>{item.concept}</strong><span>{item.correct} of {item.total} correct · {item.accuracy}% accuracy</span></div><span className="pill muted-pill">{item.accuracy}%</span></div>)}
              <ul className="tips-list"><li>Review the explanations attached to your missed answers.</li><li>Write one example in your own words, then check what changes in a new example.</li><li>Retake the subject quiz to compare new submitted answers.</li></ul>
              <Link href={`/quiz?subject=${subjectId}`} className="btn btn-primary" data-testid={`link-retake-${subjectId}`}><RotateCcw size={14} />Practice {subjectById(subjectId)?.title}</Link>
            </section>)}</div>
          </>}
        <div className="section-heading"><div><h2>What we observed</h2><p>Transparent concept-level totals from your recorded answers.</p></div></div>
        <section className="panel list-panel">{concepts.map((item) => <ConceptRow key={`${item.subjectId}-${item.concept}`} item={item} />)}</section>
      </>}
    <div className="footer-note">Study suggestions are rule-based and explainable—not a prediction of ability.</div>
  </div>;
}

function ProgressPage({ attempts }: { attempts: QuizAttempt[] }) {
  const overall = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const answered = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const latest = attempts[0];
  const earliestForLatestSubject = latest ? attempts.filter((attempt) => attempt.subjectId === latest.subjectId).at(-1) : undefined;
  const change = earliestForLatestSubject && latest && earliestForLatestSubject.id !== latest.id
    ? Math.round((latest.score / latest.total - earliestForLatestSubject.score / earliestForLatestSubject.total) * 100) : null;
  const bySubject = subjects.map((subject) => {
    const records = attempts.filter((attempt) => attempt.subjectId === subject.id);
    const total = records.reduce((sum, attempt) => sum + attempt.total, 0);
    return { subject, records, total, correct: records.reduce((sum, attempt) => sum + attempt.score, 0), accuracy: total ? Math.round(records.reduce((sum, attempt) => sum + attempt.score, 0) / total * 100) : 0 };
  }).filter((item) => item.records.length > 0);
  return <div className="page"><PageHeader eyebrow="Your progress" title="Progress that reflects your practice." intro="A record of quizzes you have actually submitted, with score history and subject-level accuracy. Nothing is prefilled." />
    {attempts.length === 0 ? <div style={{ marginTop: 28 }}><EmptyState title="No quiz history yet" body="Your progress page will fill in as you complete quizzes. Start with any subject that interests you." action="Explore subjects" href="/learn" icon={TrendingUp} /></div> :
      <>
        <div className="metrics"><Metric icon={ListChecks} label="Submitted quizzes" value={String(attempts.length)} hint="Saved in this browser" /><Metric icon={Target} label="Answers correct" value={`${overall}/${answered}`} hint="Across your attempts" /><Metric icon={change !== null ? (change >= 0 ? ArrowUpRight : ArrowDownRight) : TrendingUp} label="Score change" value={change === null ? '—' : `${change > 0 ? '+' : ''}${change} pts`} hint={change === null ? 'Compare repeat attempts in one subject' : `Latest vs. earliest ${subjectById(latest.subjectId)?.title} attempt`} /></div>
        <div className="section-heading"><div><h2>By subject</h2><p>Combined accuracy across each subject’s recorded attempts.</p></div></div>
        <div className="two-col">{bySubject.map(({ subject, records, total, correct, accuracy }) => <section className="panel list-panel" key={subject.id} data-testid={`progress-subject-${subject.id}`}>
          <div className="list-row" style={{ border: 0, paddingTop: 0 }}><div className="list-icon"><SubjectIcon id={subject.id} /></div><div className="list-copy"><strong>{subject.title}</strong><span>{records.length} {records.length === 1 ? 'quiz' : 'quizzes'} · {correct}/{total} correct</span></div><span className="pill">{accuracy}%</span></div>
          <div className="accuracy-bar"><span style={{ width: `${accuracy}%` }} /></div>
          <div className="notice">Most recent attempt: {new Date(records[0].completedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</div>
          <Link href={`/quiz?subject=${subject.id}`} className="text-link" style={{ marginTop: 11 }} data-testid={`link-progress-retake-${subject.id}`}>Practice again <RotateCcw size={13} /></Link>
        </section>)}</div>
        <div className="section-heading"><div><h2>Attempt history</h2><p>Sorted newest first. Score changes are only compared within the same subject.</p></div></div>
        <section className="panel list-panel table-wrap"><table className="history-table"><thead><tr><th>Subject</th><th>Completed</th><th>Score</th><th>Accuracy</th></tr></thead><tbody>
          {attempts.map((attempt) => <tr key={attempt.id} data-testid={`history-row-${attempt.id}`}><td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><SubjectIcon id={attempt.subjectId} size={15} />{subjectById(attempt.subjectId)?.title ?? 'Subject'}</span></td><td>{new Date(attempt.completedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</td><td>{attempt.score} / {attempt.total}</td><td>{attempt.total ? Math.round(attempt.score / attempt.total * 100) : 0}%</td></tr>)}
        </tbody></table></section>
        <p className="notice">Attempts are stored locally in this browser and are not synced between devices.</p>
      </>}
    <div className="footer-note">Small, consistent practice adds up. Keep your next step manageable.</div>
  </div>;
}

function NotFoundPage() {
  return <div className="page"><EmptyState title="This page took a wrong turn" body="That destination is not part of your learning space. Head back to your overview and choose a next step." action="Back to overview" href="/dashboard" icon={Compass} /></div>;
}

function App() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => loadAttempts());
  const recordAttempt = (attempt: QuizAttempt) => {
    const saved = saveAttempt(attempt);
    if (saved) setAttempts(loadAttempts());
    return saved;
  };
  return <AppShell>
    <Switch>
      <Route path="/"><Dashboard attempts={attempts} /></Route>
      <Route path="/dashboard"><Dashboard attempts={attempts} /></Route>
      <Route path="/learn"><LearnPage /></Route>
      <Route path="/quiz"><QuizPage onSave={recordAttempt} /></Route>
      <Route path="/recommendations"><Recommendations attempts={attempts} /></Route>
      <Route path="/progress"><ProgressPage attempts={attempts} /></Route>
      <Route><NotFoundPage /></Route>
    </Switch>
  </AppShell>;
}

export default App;
