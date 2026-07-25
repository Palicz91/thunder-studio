import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  lang: 'th' | 'en';
  labels: {
    name: string;
    phone: string;
    room: string;
    date: string;
    time: string;
    message: string;
    submit: string;
    roomSelect: string;
    roomLarge: string;
    roomSmall: string;
    roomControl: string;
    success: string;
    error: string;
    retry: string;
  };
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const inputClass =
  'bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-[14px] text-white focus:border-white/50 outline-none transition-colors w-full';

export default function BookingForm({ lang, labels }: Props) {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as any).toString(),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Submit failed');
      setState('success');
    } catch {
      setState('error');
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
          className="flex flex-col items-center justify-center text-center py-16 px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...spring, delay: 0.1 }}
            className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-6"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <p className="text-xl font-bold">{labels.success}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          name="booking"
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <input type="hidden" name="form-name" value="booking" />
          <p style={{ display: 'none' }}><input name="bot-field" /></p>
          <input type="hidden" name="lang" value={lang} />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[12px] font-semibold">{labels.name}</label>
              <input type="text" id="name" name="name" required className={inputClass} disabled={state === 'submitting'} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[12px] font-semibold">{labels.phone}</label>
              <input type="tel" id="phone" name="phone" required className={inputClass} disabled={state === 'submitting'} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="room" className="text-[12px] font-semibold">{labels.room}</label>
            <select id="room" name="room" required className={inputClass} disabled={state === 'submitting'}>
              <option value="" className="bg-onyx">{labels.roomSelect}</option>
              <option value="large" className="bg-onyx">{labels.roomLarge}</option>
              <option value="small" className="bg-onyx">{labels.roomSmall}</option>
              <option value="control" className="bg-onyx">{labels.roomControl}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-[12px] font-semibold">{labels.date}</label>
              <input type="date" id="date" name="date" required min={new Date().toISOString().split('T')[0]} className={inputClass} disabled={state === 'submitting'} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="text-[12px] font-semibold">{labels.time}</label>
              <input type="time" id="time" name="time" required className={inputClass} disabled={state === 'submitting'} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[12px] font-semibold">{labels.message}</label>
            <textarea id="message" name="message" rows={3} className={`${inputClass} resize-none`} disabled={state === 'submitting'} />
          </div>

          {state === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-red-500/30 bg-red-500/10 rounded-xl px-4 py-3 text-[13px] text-red-400 flex items-center justify-between"
            >
              <span>{labels.error}</span>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="text-white/60 hover:text-white text-[12px] font-semibold underline"
              >
                {labels.retry}
              </button>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={state === 'submitting'}
            className="w-full bg-white text-onyx rounded-xl py-4 font-semibold text-[15px] hover:bg-white/90 transition-colors mt-2 disabled:opacity-50 relative overflow-hidden"
            whileTap={{ scale: 0.98 }}
          >
            {state === 'submitting' ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  className="block w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              </span>
            ) : (
              labels.submit
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
