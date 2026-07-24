export type Lang = 'th' | 'en';

const translations: Record<string, Record<Lang, string>> = {
  'site.name': { th: 'Thunder Studio', en: 'Thunder Studio' },
  'site.tagline': { th: 'ห้องซ้อมดนตรี & สตูดิโอบันทึกเสียง', en: 'Music Rehearsal & Recording Studio' },

  'nav.home': { th: 'หน้าแรก', en: 'Home' },
  'nav.rooms': { th: 'ห้องซ้อม', en: 'Rooms' },
  'nav.booking': { th: 'จองห้อง', en: 'Book Now' },
  'nav.contact': { th: 'ติดต่อ', en: 'Contact' },

  'hero.title': { th: 'เล่นดนตรีของคุณ\nไม่ใช่แค่เสียง', en: 'Play Your Music\nNot Just Sound' },
  'hero.sub': { th: 'ห้องซ้อมดนตรีและสตูดิโอบันทึกเสียงระดับมืออาชีพ ใจกลางกรุงเทพ', en: 'Professional rehearsal rooms and recording studio in the heart of Bangkok.' },
  'hero.cta.book': { th: 'จองห้องซ้อม', en: 'Book a Room' },
  'hero.cta.rooms': { th: 'ดูห้องซ้อม', en: 'View Rooms' },

  'rooms.title': { th: 'ห้องซ้อม', en: 'Our Rooms' },
  'rooms.sub': { th: 'ห้องซ้อมหลากหลายขนาด พร้อมอุปกรณ์ครบชุด เสียงคมชัดทุกตัวโน้ต', en: 'Various room sizes with full equipment. Crystal clear sound for every note.' },

  'features.title': { th: 'ทำไมต้อง Thunder Studio', en: 'Why Thunder Studio' },
  'features.1.title': { th: 'เครื่องเสียงระดับมืออาชีพ', en: 'Pro-Grade Sound' },
  'features.1.desc': { th: 'Marshall amps, กลองชุดเต็ม, PA system คุณภาพสูง พร้อมใช้งานทุกห้อง', en: 'Marshall amps, full drum kits, and premium PA systems in every room.' },
  'features.2.title': { th: 'ห้องเก็บเสียงมาตรฐาน', en: 'Acoustic Treatment' },
  'features.2.desc': { th: 'ผนังกันเสียงและอะคูสติกออกแบบมาเพื่อเสียงที่สมบูรณ์แบบ', en: 'Soundproofed walls and acoustic design for perfect sound isolation.' },
  'features.3.title': { th: 'Control Room', en: 'Control Room' },
  'features.3.desc': { th: 'ห้องบันทึกเสียงพร้อมมิกซ์คอนโซลและอุปกรณ์ระดับสตูดิโอ', en: 'Recording room with mixing console and studio-grade equipment.' },
  'features.4.title': { th: 'พื้นที่พักผ่อน', en: 'Chill Zone' },
  'features.4.desc': { th: 'โซนนั่งเล่น ห้องใต้หลังคา พร้อมบรรยากาศสบายๆ ก่อนและหลังซ้อม', en: 'Lounge area and attic space for relaxing before and after sessions.' },

  'booking.title': { th: 'จองห้องซ้อม', en: 'Book a Room' },
  'booking.sub': { th: 'เลือกห้องซ้อมที่ต้องการ กรอกข้อมูล แล้วเราจะติดต่อกลับภายใน 30 นาที', en: 'Choose your preferred room, fill in the details, and we\'ll get back to you within 30 minutes.' },
  'booking.name': { th: 'ชื่อ', en: 'Name' },
  'booking.phone': { th: 'เบอร์โทร', en: 'Phone' },
  'booking.room': { th: 'ห้องที่ต้องการ', en: 'Preferred Room' },
  'booking.date': { th: 'วันที่', en: 'Date' },
  'booking.time': { th: 'เวลา', en: 'Time' },
  'booking.message': { th: 'ข้อความเพิ่มเติม', en: 'Additional Notes' },
  'booking.submit': { th: 'ส่งคำขอจอง', en: 'Submit Booking' },
  'booking.or': { th: 'หรือจองผ่าน LINE', en: 'Or book via LINE' },
  'booking.success': { th: 'ส่งคำขอจองเรียบร้อยแล้ว — เราจะติดต่อกลับภายใน 30 นาที', en: 'Booking request sent — we\'ll get back to you within 30 minutes.' },
  'booking.error': { th: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', en: 'Something went wrong. Please try again.' },
  'booking.retry': { th: 'ลองใหม่', en: 'Try again' },

  'contact.title': { th: 'ติดต่อเรา', en: 'Contact Us' },
  'contact.phone.label': { th: 'โทรศัพท์', en: 'Phone' },
  'contact.line.label': { th: 'LINE', en: 'LINE' },
  'contact.address.label': { th: 'ที่อยู่', en: 'Address' },
  'contact.hours.label': { th: 'เวลาทำการ', en: 'Hours' },
  'contact.social': { th: 'ติดตามเรา', en: 'Follow Us' },

  'phone': { th: '+66 62 225 5164', en: '+66 62 225 5164' },
  'line': { th: '@thunderstudio', en: '@thunderstudio' },
  'address': { th: 'กรุงเทพมหานคร', en: 'Bangkok, Thailand' },
  'hours': { th: '10:00 – 22:00 ทุกวัน', en: '10:00 AM – 10:00 PM Daily' },

  'footer.rights': { th: '© 2025 Thunder Studio — Thunder Venture Group', en: '© 2025 Thunder Studio — Thunder Venture Group' },
  'footer.privacy': { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },

  'room.select': { th: 'เลือกห้อง', en: 'Select Room' },
  'room.large': { th: 'ห้องซ้อมใหญ่', en: 'Large Rehearsal Room' },
  'room.small': { th: 'ห้องซ้อมเล็ก', en: 'Small Rehearsal Room' },
  'room.control': { th: 'Control Room', en: 'Control Room' },
};

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return translations[key]?.[lang] ?? key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}
