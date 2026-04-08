import { useState } from 'react';
import ProgressBar from './components/ProgressBar.jsx';
import Welcome from './screens/Welcome.jsx';
import TokenLesson from './screens/TokenLesson.jsx';
import ContextLesson from './screens/ContextLesson.jsx';
import TipsLesson from './screens/TipsLesson.jsx';
import Quiz from './screens/Quiz.jsx';
import Complete from './screens/Complete.jsx';

const TOTAL_SCREENS = 6;

export default function App() {
  const [screen, setScreen] = useState(0);

  const goNext = () => setScreen(s => Math.min(s + 1, TOTAL_SCREENS - 1));
  const goBack = () => setScreen(s => Math.max(s - 1, 0));
  const restart = () => setScreen(0);

  const showProgress = screen > 0 && screen < TOTAL_SCREENS - 1;

  return (
    <div>
      {showProgress && <ProgressBar current={screen} total={TOTAL_SCREENS - 1} />}

      {screen === 0 && <Welcome onNext={goNext} />}
      {screen === 1 && <TokenLesson onNext={goNext} onBack={goBack} />}
      {screen === 2 && <ContextLesson onNext={goNext} onBack={goBack} />}
      {screen === 3 && <TipsLesson onNext={goNext} onBack={goBack} />}
      {screen === 4 && <Quiz onNext={goNext} onBack={goBack} />}
      {screen === 5 && <Complete onRestart={restart} />}
    </div>
  );
}
