import { useEffect, useState } from 'react';
import { useSettingsStore } from '../shared/store/useSettingsStore';
import { storage } from '../shared/lib/storage';
import { CooldownRule, DecisionHistoryItem } from '../shared/types/cooldown';
import { Button } from '../shared/components/Button';
import { Textarea } from '../shared/components/Textarea';
import { cn } from '../shared/lib/utils';
import { Check, ArrowRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../shared/components/Logo';

const OceanWaves = () => (
  <div className="fixed inset-0 overflow-hidden -z-10 bg-[#04040a] pointer-events-none">
    {/* Deep base atmospheric glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(129,140,248,0.15),#04040a_70%)]" />
    
    {/* 4 Layers of organic waves for deep parallax */}
    <motion.div
      animate={{ y: [40, -40, 40], x: [-30, 30, -30], scale: [1, 1.05, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[-15%] w-[130%] h-[80%] opacity-[0.08] blur-[2px]"
    >
      <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
        <path fill="#818CF8" d="M0,160L80,170.7C160,181,320,203,480,181.3C640,160,800,96,960,101.3C1120,107,1280,181,1360,218.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </motion.div>

    <motion.div
      animate={{ y: [30, -30, 30], x: [40, -40, 40], scale: [1.05, 1, 1.05] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[-15%] left-[-10%] w-[120%] h-[70%] opacity-[0.12]"
    >
      <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
        <path fill="#4F46E5" d="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,234.7C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </motion.div>

    <motion.div
      animate={{ y: [20, -20, 20], x: [-50, 50, -50] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute bottom-[-20%] left-[-5%] w-[110%] h-[60%] opacity-[0.15]"
    >
      <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
        <path fill="#34D399" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </motion.div>

    <motion.div
      animate={{ y: [15, -15, 15], x: [30, -30, 30] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      className="absolute bottom-[-25%] left-0 w-full h-[50%] opacity-[0.2]"
    >
      <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
        <path fill="#10B981" d="M0,256L80,229.3C160,203,320,149,480,160C640,171,800,245,960,250.7C1120,256,1280,192,1360,160L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </motion.div>

    {/* Soft focal center light */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.12)_0%,transparent_65%)] pointer-events-none" />
  </div>
);

const CountdownRing = ({ progress, isComplete }: { progress: number; isComplete: boolean }) => {
  const size = 280;
  const strokeWidth = 1.2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center scale-110">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="text-white/5"
        />
        <motion.circle
          stroke="currentColor"
          fill="none"
          strokeWidth={strokeWidth + 0.5}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "linear" }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          className={cn(isComplete ? "text-success" : "text-accent")}
        />
      </svg>
      {/* Soft focal glow */}
      <motion.div 
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute inset-0 rounded-full blur-[100px] transition-colors duration-2000",
          isComplete ? "bg-success" : "bg-accent"
        )} 
      />
    </div>
  );
};

export const CooldownPage = () => {
  const [totalTime, setTotalTime] = useState(10 * 60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetUrl, setTargetUrl] = useState('');
  const [_ruleId, setRuleId] = useState('');
  const [rule, setRule] = useState<CooldownRule | null>(null);
  const [note, setNote] = useState('');
  const [sessionStartedAt, setSessionStartedAt] = useState<string>('');

  const { settings, loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings();
    const params = new URLSearchParams(window.location.search);
    const target = params.get('target');
    const id = params.get('ruleId');

    if (target) setTargetUrl(target);
    if (id) {
      setRuleId(id);
      storage.getRules().then(rules => {
        const found = rules.find(r => r.id === id);
        if (found) {
          setRule(found);
          const t = found.cooldownMinutes * 60;
          setTotalTime(t);
          setTimeLeft(t);
          setSessionStartedAt(new Date().toISOString());
        }
      });
    } else {
      const defaultTime = 10 * 60;
      setTotalTime(defaultTime);
      setTimeLeft(defaultTime);
      setSessionStartedAt(new Date().toISOString());
    }
  }, [loadSettings]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const saveHistory = async (outcome: DecisionHistoryItem['outcome']) => {
    const item: DecisionHistoryItem = {
      id: crypto.randomUUID(),
      ruleId: rule?.id || 'manual',
      domain: targetUrl ? new URL(targetUrl).hostname : 'unknown',
      actionType: rule?.actionType || 'custom',
      startedAt: sessionStartedAt,
      completedAt: new Date().toISOString(),
      outcome,
      reflectionNote: settings.storeReflectionNotes && note ? note : undefined
    };
    await storage.addHistoryItem(item);
  };

  const handleContinue = async () => {
    await saveHistory(timeLeft <= 0 ? 'continued' : 'skipped');
    if (targetUrl) {
      try {
        const url = new URL(targetUrl);
        url.searchParams.set('cooldown_skipped', 'true');
        window.location.href = url.toString();
      } catch (e) {
        window.location.href = targetUrl + (targetUrl.includes('?') ? '&' : '?') + 'cooldown_skipped=true';
      }
    } else {
      window.close();
    }
  };

  const handleDecideLater = async () => {
    await saveHistory('decided_later');
    window.close();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isComplete = timeLeft <= 0;
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white selection:bg-accent/30 overflow-hidden font-sans relative">
      <OceanWaves />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[500px] flex flex-col items-center z-10"
      >
        <div className="relative mb-14">
          <CountdownRing progress={progress} isComplete={isComplete} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={isComplete ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-1000",
                isComplete
                  ? "bg-success shadow-[0_0_50px_rgba(52,211,153,0.4)] text-black"
                  : "bg-white/5 border border-white/10 text-accent"
              )}
            >
              {isComplete
                ? <Check className="w-8 h-8" strokeWidth={3} />
                : <Logo size={32} />
              }
            </motion.div>
            <span className="font-mono text-[60px] font-bold tabular-nums tracking-tighter leading-none mb-2 text-white/95">
              {formatTime(timeLeft)}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
              {isComplete ? 'Ready' : 'Breathing'}
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={isComplete ? 'complete' : 'waiting'}
            className="text-3xl font-bold tracking-tight mb-3 text-white"
          >
            {isComplete ? 'Clear Mind.' : 'Just Be.'}
          </motion.h1>
          <p className="text-[15px] text-white/40 leading-relaxed font-medium">
            {targetUrl
              ? <>A short pause for <span className="text-white/70">{new URL(targetUrl).hostname}</span></>
              : 'Entering a intentional silence.'}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-10 mb-10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Reflection</span>
          </div>
          <p className="text-[22px] font-semibold mb-8 leading-tight text-white/90 tracking-tight">
            {rule?.prompt || 'Why do you want to do this right now?'}
          </p>
          <Textarea
            className="min-h-[120px] text-[16px] bg-white/[0.03] border-white/5 focus:ring-accent/10 focus:border-accent/20 rounded-[24px] placeholder:text-white/10 text-white/70 transition-all duration-500 py-5 px-6 leading-relaxed"
            placeholder="Let your thoughts flow here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </motion.div>

        <div className="w-full flex flex-col gap-5">
          <Button
            variant={isComplete ? "primary" : "secondary"}
            size="lg"
            className={cn(
              "w-full h-18 rounded-[28px] text-[17px] font-bold transition-all duration-700",
              isComplete 
                ? "bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/5" 
                : "bg-white/[0.03] text-white/10 border border-white/5 cursor-not-allowed"
            )}
            disabled={!isComplete && !settings.enableEmergencySkip}
            onClick={handleContinue}
          >
            {isComplete ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                Proceed with Intent
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </motion.div>
            ) : (
              'The Ocean is Still...'
            )}
          </Button>

          <button
            onClick={handleDecideLater}
            className="w-full py-2 text-[13px] font-bold text-white/20 hover:text-white/50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" opacity={0.5} />
            I'll decide later
          </button>
        </div>

        <AnimatePresence>
          {!isComplete && settings.enableEmergencySkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleContinue}
              className="mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/5 hover:text-danger/40 transition-all duration-500"
            >
              Emergency Skip
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
