import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Room } from '../data/rooms';

interface Props {
  lang: 'th' | 'en';
  rooms: Room[];
  companyLogin: string;
  apiKey: string;
  labels: {
    selectRoom: string;
    selectDate: string;
    selectTime: string;
    selectDuration: string;
    yourDetails: string;
    name: string;
    email: string;
    phone: string;
    confirm: string;
    success: string;
    error: string;
    retry: string;
    back: string;
    noSlots: string;
    loading: string;
    fullyBooked: string;
    duration: string;
  };
}

type Step = 'room' | 'duration' | 'date' | 'time' | 'details' | 'submitting' | 'success' | 'error';

interface TimeSlots {
  [date: string]: string[];
}

interface WorkDay {
  from: string;
  to: string;
  is_day_off: string | number;
}

interface WorkCalendar {
  [date: string]: WorkDay;
}

const DURATIONS = [60, 120, 180, 240, 300, 360];

const MONTHS_TH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const DAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const inputClass =
  'bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-[16px] text-white focus:border-white/50 outline-none transition-colors w-full';

function formatDuration(minutes: number, lang: 'th' | 'en'): string {
  const h = minutes / 60;
  if (lang === 'th') return `${h} ชั่วโมง`;
  return h === 1 ? '1 hour' : `${h} hours`;
}

function formatDurationShort(minutes: number): string {
  return `${minutes}m`;
}

async function rpcLogin(companyLogin: string, apiKey: string): Promise<string> {
  const res = await fetch('https://user-api.simplybook.me/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'getToken',
      params: [companyLogin, apiKey],
      id: 1
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

async function rpc(
  companyLogin: string,
  token: string,
  method: string,
  params: unknown[] = []
): Promise<unknown> {
  const res = await fetch('https://user-api.simplybook.me/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Company-Login': companyLogin,
      'X-Token': token
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now()
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${parseInt(d)}/${parseInt(m)}/${y}`;
}

function formatTime(time: string): string {
  const [h, m] = time.split(':');
  return `${h}:${m}`;
}

function addHours(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number);
  const newH = h + hours;
  return `${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getAvailableStartTimes(allSlots: string[], slotsNeeded: number): string[] {
  if (slotsNeeded <= 1) return allSlots;
  return allSlots.filter(startTime => {
    const [startH] = startTime.split(':').map(Number);
    for (let i = 1; i < slotsNeeded; i++) {
      const neededTime = `${String(startH + i).padStart(2, '0')}:00:00`;
      if (!allSlots.includes(neededTime)) return false;
    }
    return true;
  });
}

export default function SimplyBooking({ lang, rooms, companyLogin, apiKey, labels }: Props) {
  const [step, setStep] = useState<Step>('room');
  const [token, setToken] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [workCalendar, setWorkCalendar] = useState<WorkCalendar>({});
  const [timeSlots, setTimeSlots] = useState<TimeSlots>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  const authenticate = useCallback(async () => {
    if (token) return token;
    const t = await rpcLogin(companyLogin, apiKey);
    setToken(t);
    return t;
  }, [companyLogin, apiKey, token]);

  const rpcCall = useCallback(async (method: string, params: unknown[] = []) => {
    let t = token;
    if (!t) t = await authenticate();
    try {
      return await rpc(companyLogin, t!, method, params);
    } catch {
      const newToken = await rpcLogin(companyLogin, apiKey);
      setToken(newToken);
      return await rpc(companyLogin, newToken, method, params);
    }
  }, [companyLogin, apiKey, token, authenticate]);

  useEffect(() => {
    authenticate().catch(() => {});
  }, [authenticate]);

  const loadCalendar = useCallback(async (year: number, month: number, eventId: number) => {
    setLoadingCalendar(true);
    try {
      const cal = await rpcCall('getWorkCalendar', [year, month + 1, { event_id: eventId }]) as WorkCalendar;
      setWorkCalendar(prev => ({ ...prev, ...cal }));
    } finally {
      setLoadingCalendar(false);
    }
  }, [rpcCall]);

  const loadTimeSlots = useCallback(async (date: string, eventId: number) => {
    setLoadingSlots(true);
    try {
      const matrix = await rpcCall('getStartTimeMatrix', [date, date, eventId, null, 1]) as TimeSlots;
      setTimeSlots(prev => ({ ...prev, ...matrix }));
    } finally {
      setLoadingSlots(false);
    }
  }, [rpcCall]);

  function handleRoomSelect(room: Room) {
    setSelectedRoom(room);
    setSelectedDuration(60);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep('duration');
  }

  function handleDurationSelect(minutes: number) {
    if (!selectedRoom) return;
    setSelectedDuration(minutes);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep('date');
    const now = new Date();
    setViewMonth({ year: now.getFullYear(), month: now.getMonth() });
    loadCalendar(now.getFullYear(), now.getMonth(), selectedRoom.simplyBookEventId);
  }

  function handleDateSelect(date: string) {
    if (!selectedRoom) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setStep('time');
    loadTimeSlots(date, selectedRoom.simplyBookEventId);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setStep('details');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedRoom || !selectedDate || !selectedTime) return;
    setStep('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    const slotsNeeded = selectedDuration / 60;

    try {
      if (slotsNeeded === 1) {
        const result = await rpcCall('book', [
          selectedRoom.simplyBookEventId, null, selectedDate, selectedTime, clientData, {}, 1
        ]) as { id: number; hash: string };

        try {
          await fetch('/.netlify/functions/confirm-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: result.id, bookingHash: result.hash })
          });
        } catch { /* best-effort */ }
      } else {
        const batchId = await rpcCall('createBatch') as number;
        const [startH] = selectedTime.split(':').map(Number);

        for (let i = 0; i < slotsNeeded; i++) {
          const slotTime = `${String(startH + i).padStart(2, '0')}:00:00`;
          const result = await rpcCall('book', [
            selectedRoom.simplyBookEventId, null, selectedDate, slotTime, clientData, {}, 1, batchId
          ]) as { id: number; hash: string };

          try {
            await fetch('/.netlify/functions/confirm-booking', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bookingId: result.id, bookingHash: result.hash })
            });
          } catch { /* best-effort */ }
        }
      }

      setStep('success');
    } catch {
      setStep('error');
    }
  }

  function handleBack() {
    if (step === 'duration') { setStep('room'); setSelectedRoom(null); }
    else if (step === 'date') { setStep('duration'); setSelectedDate(null); }
    else if (step === 'time') { setStep('date'); setSelectedTime(null); }
    else if (step === 'details') { setStep('time'); }
    else if (step === 'error') { setStep('details'); }
  }

  function handleMonthNav(dir: -1 | 1) {
    if (!selectedRoom) return;
    setViewMonth(prev => {
      let m = prev.month + dir;
      let y = prev.year;
      if (m < 0) { m = 11; y--; }
      if (m > 11) { m = 0; y++; }
      loadCalendar(y, m, selectedRoom.simplyBookEventId);
      return { year: y, month: m };
    });
  }

  function reset() {
    setStep('room');
    setSelectedRoom(null);
    setSelectedDuration(60);
    setSelectedDate(null);
    setSelectedTime(null);
    setTimeSlots({});
    setWorkCalendar({});
  }

  const months = lang === 'th' ? MONTHS_TH : MONTHS_EN;
  const days = lang === 'th' ? DAYS_TH : DAYS_EN;
  const today = toDateStr(new Date());
  const slotsNeeded = selectedDuration / 60;

  const BackButton = ({ disabled }: { disabled?: boolean }) => (
    <button onClick={handleBack} disabled={disabled} className="text-[14px] text-white/40 hover:text-white/70 transition-colors mb-5 flex items-center gap-1.5 disabled:opacity-30">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
      {labels.back}
    </button>
  );

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <AnimatePresence mode="wait">
        {/* STEP: SELECT ROOM */}
        {step === 'room' && (
          <motion.div key="room" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 sm:p-8">
            <div className="text-[13px] font-semibold tracking-[0.14em] text-white/40 mb-5 uppercase">{labels.selectRoom}</div>
            <div className="space-y-4">
              {rooms.map(room => (
                <button
                  key={room.slug}
                  onClick={() => handleRoomSelect(room)}
                  className="w-full group relative flex items-center gap-5 rounded-2xl border border-white/10 p-4 sm:p-5 hover:border-white/30 transition-all text-left"
                >
                  <img
                    src={room.images[0]}
                    alt={room.name[lang]}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[18px] font-bold">{room.name[lang]}</div>
                    <div className="text-[15px] text-white/50 mt-1">{room.shortDescription[lang]}</div>
                    <div className="hidden sm:flex flex-wrap gap-2 mt-3">
                      {DURATIONS.map(d => (
                        <span key={d} className="text-[12px] text-white/30 bg-white/5 rounded-md px-2 py-1">
                          {formatDurationShort(d)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-white/30 group-hover:text-white/70 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP: SELECT DURATION */}
        {step === 'duration' && selectedRoom && (
          <motion.div key="duration" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring} className="p-5 sm:p-8">
            <BackButton />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-5">
              <div className="text-[13px] font-semibold tracking-[0.14em] text-white/40 uppercase">{labels.selectDuration}</div>
              <div className="text-[15px] text-white/60 font-medium">{selectedRoom.name[lang]}</div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {DURATIONS.map(d => (
                <button
                  key={d}
                  onClick={() => handleDurationSelect(d)}
                  className="flex flex-col items-center gap-1.5 px-4 py-5 rounded-xl border border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white transition-all"
                >
                  <span className="text-[20px] font-bold">{d / 60}h</span>
                  <span className="text-[13px] text-white/40">{d}m</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP: SELECT DATE */}
        {step === 'date' && selectedRoom && (
          <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring} className="p-5 sm:p-8">
            <BackButton />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <div className="text-[13px] font-semibold tracking-[0.14em] text-white/40 uppercase">{labels.selectDate}</div>
              <div className="text-[15px] text-white/60 font-medium">
                {selectedRoom.name[lang]} · {formatDuration(selectedDuration, lang)}
              </div>
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between mt-5 mb-4">
              <button onClick={() => handleMonthNav(-1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/30 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className="text-[18px] font-semibold">
                {months[viewMonth.month]} {viewMonth.year}
              </div>
              <button onClick={() => handleMonthNav(1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/30 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>

            {/* Calendar grid */}
            {loadingCalendar ? (
              <div className="flex items-center justify-center py-16">
                <motion.span className="block w-6 h-6 border-2 border-white/20 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1.5">
                {days.map(d => (
                  <div key={d} className="text-center text-[13px] text-white/30 font-medium py-2">{d}</div>
                ))}
                {(() => {
                  const firstDay = new Date(viewMonth.year, viewMonth.month, 1).getDay();
                  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
                  const cells: React.ReactNode[] = [];
                  for (let i = 0; i < firstDay; i++) {
                    cells.push(<div key={`empty-${i}`} />);
                  }
                  for (let d = 1; d <= daysInMonth; d++) {
                    const dateStr = `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                    const dayInfo = workCalendar[dateStr];
                    const isDayOff = !dayInfo || dayInfo.is_day_off === '1' || dayInfo.is_day_off === 1;
                    const isPast = dateStr < today;
                    const disabled = isDayOff || isPast;
                    cells.push(
                      <button
                        key={dateStr}
                        disabled={disabled}
                        onClick={() => handleDateSelect(dateStr)}
                        className={`h-12 sm:h-14 rounded-lg text-[15px] font-medium transition-all ${
                          disabled
                            ? 'text-white/15 cursor-not-allowed'
                            : dateStr === today
                              ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                              : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  }
                  return cells;
                })()}
              </div>
            )}
          </motion.div>
        )}

        {/* STEP: SELECT TIME */}
        {step === 'time' && selectedRoom && selectedDate && (
          <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring} className="p-5 sm:p-8">
            <BackButton />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <div className="text-[13px] font-semibold tracking-[0.14em] text-white/40 uppercase">{labels.selectTime}</div>
              <div className="text-[15px] text-white/60 font-medium">
                {selectedRoom.name[lang]} · {formatDuration(selectedDuration, lang)} · {formatDate(selectedDate)}
              </div>
            </div>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-16">
                <motion.span className="block w-6 h-6 border-2 border-white/20 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
              </div>
            ) : (() => {
              const allSlots = timeSlots[selectedDate] ?? [];
              const available = getAvailableStartTimes(allSlots, slotsNeeded);
              if (available.length === 0) {
                return <div className="text-center py-16 text-white/40 text-[16px]">{labels.fullyBooked}</div>;
              }
              return (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-5">
                  {available.map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="px-3 py-4 rounded-xl text-[16px] font-medium border border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <div>{formatTime(time)}</div>
                      {slotsNeeded > 1 && (
                        <div className="text-[13px] text-white/30 mt-1">→ {addHours(time, slotsNeeded)}</div>
                      )}
                    </button>
                  ))}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* STEP: CLIENT DETAILS */}
        {(step === 'details' || step === 'submitting') && selectedRoom && selectedDate && selectedTime && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring} className="p-5 sm:p-8">
            <BackButton disabled={step === 'submitting'} />

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-7">
              <div className="text-[18px] font-bold">{selectedRoom.name[lang]}</div>
              <div className="text-[15px] text-white/50 mt-1.5">
                {formatDate(selectedDate)} · {formatTime(selectedTime)}
                {slotsNeeded > 1 && ` → ${addHours(selectedTime, slotsNeeded)}`}
                {' · '}{formatDuration(selectedDuration, lang)}
              </div>
            </div>

            <div className="text-[13px] font-semibold tracking-[0.14em] text-white/40 mb-5 uppercase">{labels.yourDetails}</div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="sb-name" className="text-[14px] font-semibold">{labels.name}</label>
                <input type="text" id="sb-name" name="name" required className={inputClass} disabled={step === 'submitting'} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="sb-email" className="text-[14px] font-semibold">{labels.email}</label>
                  <input type="email" id="sb-email" name="email" required className={inputClass} disabled={step === 'submitting'} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="sb-phone" className="text-[14px] font-semibold">{labels.phone}</label>
                  <input type="tel" id="sb-phone" name="phone" required className={inputClass} disabled={step === 'submitting'} />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={step === 'submitting'}
                className="w-full bg-white text-onyx rounded-xl py-5 font-semibold text-[17px] hover:bg-white/90 transition-colors mt-3 disabled:opacity-50 relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {step === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="block w-5 h-5 border-2 border-onyx/30 border-t-onyx rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  </span>
                ) : (
                  labels.confirm
                )}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={spring} className="flex flex-col items-center justify-center text-center py-20 px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...spring, delay: 0.1 }}
              className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center mb-7"
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
            <p className="text-2xl font-bold">{labels.success}</p>
            <button onClick={reset} className="mt-7 text-[15px] text-white/50 hover:text-white transition-colors underline underline-offset-4">
              {lang === 'th' ? 'จองอีกครั้ง' : 'Book another room'}
            </button>
          </motion.div>
        )}

        {/* ERROR */}
        {step === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 sm:p-8">
            <div className="border border-red-500/30 bg-red-500/10 rounded-xl px-5 py-5 text-[15px] text-red-400 flex items-center justify-between">
              <span>{labels.error}</span>
              <button onClick={handleBack} className="text-white/60 hover:text-white text-[14px] font-semibold underline">
                {labels.retry}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
