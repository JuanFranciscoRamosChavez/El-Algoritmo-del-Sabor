// pages/index.js (para Next.js) o src/App.jsx (para React estándar)

import TacoPicker from './TacoPicker';

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <TacoPicker />
    </div>
  );
}
