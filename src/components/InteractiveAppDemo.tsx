import React, { useState, useEffect, useRef } from 'react';
import { DemoType } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Check, ArrowRight } from 'lucide-react';

interface InteractiveAppDemoProps {
  demoType: DemoType;
  appTitle: string;
  primaryColor: string;
}

export const InteractiveAppDemo: React.FC<InteractiveAppDemoProps> = ({
  demoType,
  appTitle,
  primaryColor,
}) => {
  return (
    <div className="bg-paper text-ink p-4 sm:p-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b-2 border-ink">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5" style={{ backgroundColor: primaryColor }} />
          <span className="label text-[10px] sm:text-[11px]">{appTitle} / demo</span>
        </div>
        <span className="label text-[10px] bg-ink text-paper px-2.5 py-1.5">In-browser</span>
      </div>

      {demoType === 'fractions-visualizer' && <FractionsVisualizerDemo />}
      {demoType === 'pendulum-sim' && <PendulumSimDemo />}
      {demoType === 'periodic-table' && <PeriodicTableDemo />}
      {demoType === 'sound-synth' && <SoundSynthDemo />}
      {demoType === 'code-blocks' && <CodeBlocksDemo />}
      {demoType === 'color-theory' && <ColorTheoryDemo />}
      {demoType === 'speed-reader' && <SpeedReaderDemo />}
      {demoType === 'matrix-math' && <MatrixMathDemo />}
    </div>
  );
};

/* ---------------- 1. Fractions Visualizer Demo ---------------- */
function FractionsVisualizerDemo() {
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(4);
  const [shape, setShape] = useState<'circle' | 'rectangle'>('circle');

  const decimal = (numerator / denominator).toFixed(3);
  const percentage = Math.round((numerator / denominator) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual representation */}
        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[220px]">
          {shape === 'circle' ? (
            <svg viewBox="0 0 160 160" className="w-40 h-40 transform -rotate-90">
              {Array.from({ length: denominator }).map((_, i) => {
                const sliceAngle = (2 * Math.PI) / denominator;
                const startAngle = i * sliceAngle;
                const endAngle = (i + 1) * sliceAngle;
                const r = 70;
                const cx = 80;
                const cy = 80;

                const x1 = cx + r * Math.cos(startAngle);
                const y1 = cy + r * Math.sin(startAngle);
                const x2 = cx + r * Math.cos(endAngle);
                const y2 = cy + r * Math.sin(endAngle);
                const largeArc = sliceAngle > Math.PI ? 1 : 0;

                const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
                const isSelected = i < numerator;

                return (
                  <path
                    key={i}
                    d={pathData}
                    className={`transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? 'fill-sky-500 dark:fill-sky-600 stroke-white dark:stroke-slate-950 stroke-2'
                        : 'fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 stroke-1'
                    }`}
                    onClick={() => setNumerator(i + 1)}
                  />
                );
              })}
            </svg>
          ) : (
            <div className="w-full max-w-[240px] h-24 border-2 border-slate-300 dark:border-slate-700 rounded-lg flex overflow-hidden bg-slate-100 dark:bg-slate-800">
              {Array.from({ length: denominator }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setNumerator(i + 1)}
                  className={`flex-1 border-r last:border-r-0 border-slate-300 dark:border-slate-700 transition-colors cursor-pointer flex items-center justify-center text-xs font-semibold ${
                    i < numerator
                      ? 'bg-sky-500 dark:bg-sky-600 text-white'
                      : 'text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  1/{denominator}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-center">
            <div>
              <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {numerator} / {denominator}
              </span>
              <p className="text-xs text-slate-500">Fraction</p>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="text-xl font-bold text-slate-700 dark:text-slate-300">{decimal}</span>
              <p className="text-xs text-slate-500">Decimal</p>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</span>
              <p className="text-xs text-slate-500">Percent</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>Numerator (Selected Parts):</span>
              <span className="font-bold text-sky-600 dark:text-sky-400">{numerator}</span>
            </div>
            <input
              type="range"
              min="0"
              max={denominator}
              value={numerator}
              onChange={(e) => setNumerator(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>Denominator (Total Partitions):</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{denominator}</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              value={denominator}
              onChange={(e) => {
                const newDen = Number(e.target.value);
                setDenominator(newDen);
                if (numerator > newDen) setNumerator(newDen);
              }}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">Geometry Model:</span>
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setShape('circle')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  shape === 'circle'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Circle Pie
              </button>
              <button
                type="button"
                onClick={() => setShape('rectangle')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  shape === 'rectangle'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Bar Model
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 2. Pendulum & Gravity Lab Demo ---------------- */
function PendulumSimDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gravityPreset, setGravityPreset] = useState<'Earth' | 'Moon' | 'Jupiter'>('Earth');
  const [length, setLength] = useState<number>(140);
  const [damping, setDamping] = useState<number>(0.998);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const gravities = {
    Earth: 9.81,
    Moon: 1.62,
    Jupiter: 24.79,
  };

  const stateRef = useRef({
    angle: Math.PI / 4,
    angleVelocity: 0,
    angleAccel: 0,
    originX: 150,
    originY: 20,
    isDragging: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const g = (gravities[gravityPreset] / 9.81) * 0.4;
      const state = stateRef.current;

      if (isRunning && !state.isDragging) {
        state.angleAccel = (-g / (length / 10)) * Math.sin(state.angle);
        state.angleVelocity += state.angleAccel;
        state.angleVelocity *= damping;
        state.angle += state.angleVelocity;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const originX = canvas.width / 2;
      const originY = 30;
      const bobX = originX + length * Math.sin(state.angle);
      const bobY = originY + length * Math.cos(state.angle);

      // Support line / pivot
      ctx.beginPath();
      ctx.arc(originX, originY, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#64748b';
      ctx.fill();

      // String
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bob shadow
      ctx.beginPath();
      ctx.arc(bobX, 220, 8 * (1 - (220 - bobY) / 220), 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fill();

      // Bob
      ctx.beginPath();
      ctx.arc(bobX, bobY, 18, 0, 2 * Math.PI);
      const grad = ctx.createRadialGradient(bobX - 4, bobY - 4, 3, bobX, bobY, 18);
      grad.addColorStop(0, '#34d399');
      grad.addColorStop(1, '#059669');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Velocity indicator line
      if (isRunning) {
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX + state.angleVelocity * 800 * Math.cos(state.angle), bobY - state.angleVelocity * 800 * Math.sin(state.angle));
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gravityPreset, length, damping, isRunning]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative flex flex-col items-center justify-center bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-2">
          <canvas
            ref={canvasRef}
            width={300}
            height={240}
            className="w-full max-w-[300px] h-[240px] cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left - rect.width / 2;
              const clickY = e.clientY - rect.top - 30;
              stateRef.current.angle = Math.atan2(clickX, clickY);
              stateRef.current.angleVelocity = 0;
            }}
          />
          <div className="absolute bottom-2 left-3 text-[11px] text-slate-400">
            Click canvas to set angle
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Celestial Body Gravity:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Earth', 'Moon', 'Jupiter'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setGravityPreset(preset)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    gravityPreset === preset
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset} ({gravities[preset]} m/s²)
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>String Length:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{(length / 100).toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="80"
              max="180"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-sm"
            >
              {isRunning ? <Pause size={14} /> : <Play size={14} />}
              {isRunning ? 'Pause Simulation' : 'Resume Simulation'}
            </button>
            <button
              type="button"
              onClick={() => {
                stateRef.current.angle = Math.PI / 4;
                stateRef.current.angleVelocity = 0;
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 3. Elementa: Periodic Explorer Demo ---------------- */
function PeriodicTableDemo() {
  const [selectedElement, setSelectedElement] = useState({
    symbol: 'Au',
    name: 'Gold',
    number: 79,
    mass: 196.97,
    category: 'Transition Metal',
    electrons: '2, 8, 18, 32, 18, 1',
    meltingPoint: 1337,
    color: '#eab308',
  });

  const [temperatureK, setTemperatureK] = useState<number>(293);

  const sampleElements = [
    { symbol: 'H', name: 'Hydrogen', number: 1, mass: 1.008, category: 'Nonmetal', electrons: '1', meltingPoint: 14, boilingPoint: 20, color: '#38bdf8' },
    { symbol: 'C', name: 'Carbon', number: 6, mass: 12.011, category: 'Nonmetal', electrons: '2, 4', meltingPoint: 3823, boilingPoint: 4098, color: '#64748b' },
    { symbol: 'O', name: 'Oxygen', number: 8, mass: 15.999, category: 'Nonmetal', electrons: '2, 6', meltingPoint: 54, boilingPoint: 90, color: '#60a5fa' },
    { symbol: 'Na', name: 'Sodium', number: 11, mass: 22.99, category: 'Alkali Metal', electrons: '2, 8, 1', meltingPoint: 371, boilingPoint: 1156, color: '#f59e0b' },
    { symbol: 'Fe', name: 'Iron', number: 26, mass: 55.845, category: 'Transition Metal', electrons: '2, 8, 14, 2', meltingPoint: 1811, boilingPoint: 3134, color: '#ef4444' },
    { symbol: 'Au', name: 'Gold', number: 79, mass: 196.97, category: 'Transition Metal', electrons: '2, 8, 18, 32, 18, 1', meltingPoint: 1337, boilingPoint: 3243, color: '#eab308' },
    { symbol: 'Ne', name: 'Neon', number: 10, mass: 20.18, category: 'Noble Gas', electrons: '2, 8', meltingPoint: 24, boilingPoint: 27, color: '#a855f7' },
  ];

  const stateOfMatter =
    temperatureK < (selectedElement.meltingPoint || 1000)
      ? 'Solid'
      : temperatureK < (selectedElement.meltingPoint * 2.2 || 2000)
      ? 'Liquid'
      : 'Gas';

  return (
    <div className="space-y-4">
      {/* Element Selector */}
      <div className="flex flex-wrap gap-2 pb-2">
        {sampleElements.map((el) => (
          <button
            key={el.symbol}
            type="button"
            onClick={() => setSelectedElement(el as any)}
            className={`flex flex-col items-center justify-center w-14 h-16 rounded-lg border transition-all flex-shrink-0 ${
              selectedElement.symbol === el.symbol
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/60 ring-2 ring-violet-500/30'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] text-slate-400">{el.number}</span>
            <span className="text-base font-bold text-slate-800 dark:text-slate-100">{el.symbol}</span>
            <span className="text-[9px] text-slate-500 truncate max-w-[48px]">{el.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Element Card */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/60">
          <div className="w-24 h-24 rounded-2xl bg-violet-600 text-white flex flex-col items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="text-xs opacity-80">{selectedElement.number}</span>
            <span className="text-3xl font-extrabold">{selectedElement.symbol}</span>
            <span className="text-[10px] opacity-90">{selectedElement.mass}</span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{selectedElement.name}</h4>
            <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">{selectedElement.category}</p>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
              <div>Shells: <span className="font-mono text-slate-800 dark:text-slate-200">{selectedElement.electrons}</span></div>
              <div>Melting Point: <span className="font-semibold">{selectedElement.meltingPoint} K</span></div>
              <div className="flex items-center gap-1.5 mt-1">
                <span>Phase at {temperatureK}K:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  stateOfMatter === 'Solid' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                  stateOfMatter === 'Liquid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                }`}>
                  {stateOfMatter}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Controller */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Thermal Chamber Temperature:</span>
            <span className="font-bold text-violet-600 dark:text-violet-400">
              {temperatureK} K ({temperatureK - 273}°C)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="4000"
            step="10"
            value={temperatureK}
            onChange={(e) => setTemperatureK(Number(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0 K (Absolute Zero)</span>
            <span>293 K (Room Temp)</span>
            <span>4,000 K (Plasma Heat)</span>
          </div>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Drag the temperature slider to trigger physical state phase shifts from rigid crystalline lattice to fluid liquid and ionized gas!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 4. Sound Synth Demo ---------------- */
function SoundSynthDemo() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(440); // A4
  const [waveType, setWaveType] = useState<OscillatorType>('sine');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  };

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
      oscRef.current.type = waveType;
    }
  }, [frequency, waveType]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Animate oscilloscope waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ec4899';
      ctx.beginPath();

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;
      const cycles = (frequency / 100);

      for (let x = 0; x < width; x++) {
        const t = (x / width) * cycles * 2 * Math.PI + phase;
        let y = midY;
        if (waveType === 'sine') {
          y += Math.sin(t) * (isPlaying ? 35 : 10);
        } else if (waveType === 'square') {
          y += (Math.sin(t) >= 0 ? 1 : -1) * (isPlaying ? 30 : 8);
        } else if (waveType === 'triangle') {
          y += (Math.asin(Math.sin(t)) / (Math.PI / 2)) * (isPlaying ? 35 : 10);
        } else {
          y += ((t % (2 * Math.PI)) / Math.PI - 1) * (isPlaying ? 30 : 8);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (isPlaying) {
        phase += 0.08;
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [frequency, waveType, isPlaying]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Oscilloscope Canvas */}
        <div className="flex flex-col items-center justify-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <canvas ref={canvasRef} width={280} height={120} className="w-full max-w-[280px] h-[120px]" />
          <div className="flex items-center justify-between w-full text-xs text-pink-400 font-mono mt-2 pt-2 border-t border-slate-800">
            <span>{frequency} Hz</span>
            <span className="uppercase">{waveType} wave</span>
            <span>{isPlaying ? '● LIVE OUTPUT' : '○ MUTED'}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>Frequency / Pitch:</span>
              <span className="font-bold text-pink-600 dark:text-pink-400">{frequency} Hz</span>
            </div>
            <input
              type="range"
              min="110"
              max="880"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>A2 (110Hz)</span>
              <span>A4 Concert (440Hz)</span>
              <span>A5 (880Hz)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Waveform Harmonic Timbre:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['sine', 'triangle', 'square', 'sawtooth'] as OscillatorType[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWaveType(w)}
                  className={`py-1.5 text-[11px] capitalize font-medium rounded-lg border transition-all ${
                    waveType === w
                      ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={isPlaying ? stopAudio : startAudio}
            className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-white transition-all shadow-md ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                : 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/20'
            }`}
          >
            {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {isPlaying ? 'Mute Audio Output' : 'Play Interactive Audio'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 5. Code Blocks Demo ---------------- */
function CodeBlocksDemo() {
  const [step, setStep] = useState<number>(0);
  const [outputLogs, setOutputLogs] = useState<string[]>(['Ready to execute']);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const blocks = [
    { type: 'init', text: 'count = 0', py: 'count = 0' },
    { type: 'loop', text: 'repeat 3 times:', py: 'for i in range(3):' },
    { type: 'body', text: '  count = count + 2', py: '    count += 2' },
    { type: 'print', text: 'print("Final score:", count)', py: 'print("Final score:", count)' },
  ];

  const handleRun = () => {
    setIsRunning(true);
    setOutputLogs(['>>> Initializing Python 3.12 VM...', '>>> count = 0']);
    setStep(1);

    setTimeout(() => {
      setOutputLogs((prev) => [...prev, '>>> Iteration 1: count = 2']);
      setStep(2);
    }, 600);

    setTimeout(() => {
      setOutputLogs((prev) => [...prev, '>>> Iteration 2: count = 4', '>>> Iteration 3: count = 6']);
      setStep(3);
    }, 1200);

    setTimeout(() => {
      setOutputLogs((prev) => [...prev, '>>> Final score: 6', '>>> Execution completed in 0.04s']);
      setStep(0);
      setIsRunning(false);
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Blocks pane */}
      <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Visual Block Puzzle
        </span>
        <div className="space-y-2 pt-2">
          {blocks.map((b, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-lg font-mono text-xs border transition-all ${
                step === i + 1
                  ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 ring-2 ring-amber-400'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              {b.text}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleRun}
          disabled={isRunning}
          className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <Play size={14} />
          {isRunning ? 'Stepping Program...' : 'Run Algorithm Simulation'}
        </button>
      </div>

      {/* Terminal Output */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-800 mb-2">
            <span>Terminal REPL</span>
            <span>stdout (UTF-8)</span>
          </div>
          <div className="space-y-1 overflow-y-auto max-h-[140px]">
            {outputLogs.map((log, idx) => (
              <div key={idx} className="leading-tight">{log}</div>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800 mt-2">
          Syncs Blockly AST graph directly to WebAssembly compiler.
        </div>
      </div>
    </div>
  );
}

/* ---------------- 6. Color Theory & Accessibility Demo ---------------- */
function ColorTheoryDemo() {
  const [mode, setMode] = useState<'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('normal');

  const getFilterStyle = () => {
    switch (mode) {
      case 'protanopia':
        return 'contrast(1.05) hue-rotate(-25deg) saturate(0.7)';
      case 'deuteranopia':
        return 'contrast(1.1) hue-rotate(35deg) saturate(0.6)';
      case 'tritanopia':
        return 'contrast(1.0) hue-rotate(180deg) saturate(0.8)';
      default:
        return 'none';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['normal', 'protanopia', 'deuteranopia', 'tritanopia'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
              mode === m
                ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            {m === 'normal' ? 'Normal Trichromat' : m}
          </button>
        ))}
      </div>

      <div
        style={{ filter: getFilterStyle() }}
        className="grid grid-cols-3 gap-3 p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 transition-all duration-300"
      >
        <div className="p-4 rounded-lg bg-emerald-500 text-white font-bold text-center text-xs">
          Success Alert (Green)
          <div className="text-[10px] opacity-80 mt-1">#10b981</div>
        </div>
        <div className="p-4 rounded-lg bg-rose-500 text-white font-bold text-center text-xs">
          Critical Error (Red)
          <div className="text-[10px] opacity-80 mt-1">#f43f5e</div>
        </div>
        <div className="p-4 rounded-lg bg-blue-600 text-white font-bold text-center text-xs">
          Primary Action (Blue)
          <div className="text-[10px] opacity-80 mt-1">#2563eb</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Simulates ophthalmic cone photoreceptor variances to assist instructional designers in passing WCAG Level AAA color contrast.
      </p>
    </div>
  );
}

/* ---------------- 7. Speed Reader Demo ---------------- */
function SpeedReaderDemo() {
  const sampleText = 'Educational technology thrives when deep cognitive pedagogy meets intuitive digital design.';
  const words = sampleText.split(' ');
  const [index, setIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(300);

  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = (60 / wpm) * 1000;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, wpm, words.length]);

  const currentWord = words[index] || '';
  const midIndex = Math.floor(currentWord.length / 2);
  const prefix = currentWord.slice(0, midIndex);
  const focal = currentWord[midIndex] || '';
  const suffix = currentWord.slice(midIndex + 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center min-h-[120px] bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 relative">
        <div className="text-3xl sm:text-4xl font-mono tracking-wide">
          <span className="text-slate-800 dark:text-slate-200">{prefix}</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold underline decoration-indigo-400 decoration-2 underline-offset-4">{focal}</span>
          <span className="text-slate-800 dark:text-slate-200">{suffix}</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-3">
          Word {index + 1} of {words.length} • Optimal Recognition Point (ORP) centered
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          {isPlaying ? 'Pause Pacing' : 'Start RSVP Stream'}
        </button>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-slate-500 whitespace-nowrap">{wpm} WPM</span>
          <input
            type="range"
            min="150"
            max="600"
            step="25"
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- 8. Matrix Math Demo ---------------- */
function MatrixMathDemo() {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0.5);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(1);

  const determinant = a * d - b * c;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Grid with warped square */}
        <div className="flex items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <svg viewBox="-80 -80 160 160" className="w-48 h-48">
            {/* Base grid axes */}
            <line x1="-70" y1="0" x2="70" y2="0" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="0" y1="-70" x2="0" y2="70" stroke="#cbd5e1" strokeWidth="1" />

            {/* Original Unit Square (dotted) */}
            <polygon points="0,0 40,0 40,-40 0,-40" fill="none" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />

            {/* Transformed Parallelogram */}
            <polygon
              points={`0,0 ${a * 40},${-c * 40} ${a * 40 + b * 40},${-(c * 40 + d * 40)} ${b * 40},${-d * 40}`}
              fill="rgba(249, 115, 22, 0.25)"
              stroke="#f97316"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Matrix inputs & determinant */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            2×2 Transformation Matrix [T]
          </span>
          <div className="grid grid-cols-2 gap-2 max-w-[200px]">
            <input
              type="number"
              step="0.25"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="p-2 border rounded text-center font-mono font-bold text-slate-800 dark:text-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
            />
            <input
              type="number"
              step="0.25"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="p-2 border rounded text-center font-mono font-bold text-slate-800 dark:text-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
            />
            <input
              type="number"
              step="0.25"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              className="p-2 border rounded text-center font-mono font-bold text-slate-800 dark:text-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
            />
            <input
              type="number"
              step="0.25"
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
              className="p-2 border rounded text-center font-mono font-bold text-slate-800 dark:text-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
            />
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 pt-1">
            Signed Area Scaling (Determinant): <span className="font-bold text-orange-600 dark:text-orange-400">{determinant.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
