import { useEffect, useState } from 'react';

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 800);
    const t2 = setTimeout(() => setHidden(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loader-wrap${fadeOut ? ' fade-out' : ''}`}>
      <div className="loader-ring" />
    </div>
  );
}
