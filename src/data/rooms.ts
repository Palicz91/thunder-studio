import { IMG_BASE } from '../config';

export interface Room {
  slug: string;
  simplyBookEventId: number;
  name: { th: string; en: string };
  shortDescription: { th: string; en: string };
  description: { th: string; en: string };
  capacity: string;
  equipment: { th: string; en: string }[];
  images: string[];
}

export const rooms: Room[] = [
  {
    slug: 'large-room',
    simplyBookEventId: 2,
    name: { th: 'Studio 1', en: 'Studio 1' },
    shortDescription: { th: 'ห้องกว้างสำหรับวงเต็ม', en: 'Spacious room for full bands' },
    description: {
      th: 'ห้องซ้อมขนาดใหญ่ เพดานสูง พร้อมอุปกรณ์ครบชุด เหมาะสำหรับวงดนตรีเต็มวง หรือซ้อมก่อนแสดงสด',
      en: 'Spacious rehearsal room with high ceilings and full equipment. Perfect for full bands or pre-gig rehearsals.',
    },
    capacity: '6–10',
    equipment: [
      { th: 'Marshall amps', en: 'Marshall amps' },
      { th: 'กลองชุดเต็ม', en: 'Full drum kit' },
      { th: 'PA system', en: 'PA system' },
      { th: 'ไมค์ & แสตนด์', en: 'Mics & stands' },
    ],
    images: [
      `${IMG_BASE}/large-room-1.webp`,
      `${IMG_BASE}/large-room-2.webp`,
      `${IMG_BASE}/large-room-3.webp`,
      `${IMG_BASE}/large-room-4.webp`,
      `${IMG_BASE}/large-room-5.webp`,
      `${IMG_BASE}/large-room-6.webp`,
    ],
  },
  {
    slug: 'small-room',
    simplyBookEventId: 3,
    name: { th: 'Studio 2', en: 'Studio 2' },
    shortDescription: { th: 'ห้องส่วนตัวขนาดกะทัดรัด', en: 'Compact private room' },
    description: {
      th: 'ห้องซ้อมส่วนตัวขนาดกะทัดรัด เหมาะสำหรับซ้อมเดี่ยว ดูโอ้ หรือวงเล็ก ผนังกันเสียงรอบด้าน',
      en: 'Compact private room ideal for solo practice, duos, or small groups. Fully soundproofed.',
    },
    capacity: '2–4',
    equipment: [
      { th: 'แอมป์กีตาร์', en: 'Guitar amp' },
      { th: 'PA system', en: 'PA system' },
      { th: 'ไมค์ & แสตนด์', en: 'Mics & stands' },
    ],
    images: [
      `${IMG_BASE}/small-room-1.webp`,
      `${IMG_BASE}/small-room-2.webp`,
    ],
  },
  {
    slug: 'control-room',
    simplyBookEventId: 4,
    name: { th: 'Control Room', en: 'Control Room' },
    shortDescription: { th: 'ห้องบันทึกเสียงและมิกซ์', en: 'Recording and mixing room' },
    description: {
      th: 'ห้องบันทึกเสียงพร้อมมิกซ์คอนโซลและอุปกรณ์ระดับสตูดิโอ สำหรับบันทึกเสียง มิกซ์ หรือมาสเตอร์',
      en: 'Recording room with mixing console and studio-grade gear. For recording, mixing, or mastering.',
    },
    capacity: '2–3',
    equipment: [
      { th: 'มิกซ์คอนโซล', en: 'Mixing console' },
      { th: 'Rack gear', en: 'Rack gear' },
      { th: 'มอนิเตอร์สตูดิโอ', en: 'Studio monitors' },
      { th: 'DAW workstation', en: 'DAW workstation' },
    ],
    images: [
      `${IMG_BASE}/control-room.webp`,
    ],
  },
];
