import { useEffect, useState } from 'react';

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = typeof target === 'number' ? target : parseInt(target.toString().replace(/[^\d]/g, ''));
    if (isNaN(end)) return;
    const increment = end / (duration / 16);
    let raf;
    function update() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    }
    update();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

export default function StatsBar() {
  const partners = useCountUp(300);
  const dataProcessed = useCountUp(1000);
  const aiAccuracy = useCountUp(99);
  const mediaPR = useCountUp(200);

  return (
    <section className="w-full bg-gradient-main py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-white text-center gap-6 md:gap-0">
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1">{partners}+</div>
          <div className="text-lg font-medium">Partners</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1">{dataProcessed.toLocaleString()} TB+</div>
          <div className="text-lg font-medium">Data Processed</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1">{aiAccuracy}%</div>
          <div className="text-lg font-medium">AI Accuracy</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1">{mediaPR}+</div>
          <div className="text-lg font-medium">Media & PR</div>
        </div>
      </div>
    </section>
  );
}
