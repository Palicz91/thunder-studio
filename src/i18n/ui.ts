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
  'booking.sub': { th: 'เลือกห้องซ้อมที่ต้องการ เลือกวันเวลา แล้วจองได้เลย', en: 'Pick your room, choose a time slot, and book instantly.' },
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

  'phone': { th: '063-546-1924', en: '063-546-1924' },
  'line': { th: '@thunderstudio', en: '@thunderstudio' },
  'address': { th: '288, 102-103 ถ.พหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพ 10220', en: '288, 102-103 Phahonyothin Rd, Anusawari, Bang Khen, Bangkok 10220' },
  'tax': { th: 'เลขประจำตัวผู้เสียภาษี: 0105586164737', en: 'Tax ID: 0105586164737' },
  'hours': { th: '10:00 – 22:00 ทุกวัน', en: '10:00 AM – 10:00 PM Daily' },

  'footer.tagline': { th: 'ห้องซ้อมดนตรีและสตูดิโอบันทึกเสียงระดับมืออาชีพ ใจกลางกรุงเทพ', en: 'Professional music rehearsal rooms and recording studio in the heart of Bangkok.' },
  'footer.nav': { th: 'เมนู', en: 'NAVIGATE' },
  'footer.company': { th: 'บริษัท', en: 'COMPANY' },
  'footer.parent': { th: 'Thunder Venture Group', en: 'Thunder Venture Group' },
  'footer.privacy': { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
  'footer.terms': { th: 'ข้อกำหนดการใช้งาน', en: 'Terms & Conditions' },
  'email': { th: 'theorn.n@thunderventuregroup.com', en: 'theorn.n@thunderventuregroup.com' },

  'room.select': { th: 'เลือกห้อง', en: 'Select Room' },
  'room.large': { th: 'ห้องซ้อมใหญ่', en: 'Large Rehearsal Room' },
  'room.small': { th: 'ห้องซ้อมเล็ก', en: 'Small Rehearsal Room' },
  'room.control': { th: 'Control Room', en: 'Control Room' },

  'faq.title': { th: 'คำถามที่พบบ่อย', en: 'Frequently Asked Questions' },
  'faq.1.q': { th: 'ต้องจองล่วงหน้าไหม?', en: 'Do I need to book in advance?' },
  'faq.1.a': { th: 'แนะนำให้จองล่วงหน้าผ่านเว็บไซต์หรือ LINE เพื่อรับประกันห้องว่าง แต่สามารถ walk-in ได้ถ้ามีห้องว่าง', en: 'We recommend booking in advance via our website or LINE to guarantee availability. Walk-ins are welcome if rooms are available.' },
  'faq.2.q': { th: 'มีอุปกรณ์ดนตรีให้ใช้ไหม?', en: 'What equipment is provided?' },
  'faq.2.a': { th: 'ทุกห้องมีอุปกรณ์พร้อมใช้ รวมถึง Marshall amps, กลองชุด, PA system, ไมค์และแสตนด์ แค่เอากีตาร์หรือเบสมาก็พอ', en: 'Every room comes fully equipped with Marshall amps, drum kits, PA systems, mics and stands. Just bring your guitar or bass.' },
  'faq.3.q': { th: 'เปิดกี่โมงถึงกี่โมง?', en: 'What are your opening hours?' },
  'faq.3.a': { th: 'เปิดทุกวัน 10:00 - 22:00 รวมวันหยุดนักขัตฤกษ์', en: 'We are open daily from 10:00 AM to 10:00 PM, including public holidays.' },
  'faq.4.q': { th: 'มีที่จอดรถไหม?', en: 'Is parking available?' },
  'faq.4.a': { th: 'มีที่จอดรถให้บริการหน้าอาคาร', en: 'Parking is available in front of the building.' },
  'faq.5.q': { th: 'สามารถบันทึกเสียงได้ไหม?', en: 'Can I record at Thunder Studio?' },
  'faq.5.a': { th: 'ได้ครับ Control Room ของเราพร้อมมิกซ์คอนโซล, studio monitors และ DAW workstation สำหรับบันทึกเสียง มิกซ์ และมาสเตอร์', en: 'Yes. Our Control Room is equipped with a mixing console, studio monitors, and a DAW workstation for recording, mixing, and mastering.' },
  'faq.6.q': { th: 'ยกเลิกการจองได้ไหม?', en: 'What is the cancellation policy?' },
  'faq.6.a': { th: 'สามารถยกเลิกหรือเปลี่ยนเวลาได้ล่วงหน้าอย่างน้อย 2 ชั่วโมง โดยแจ้งผ่าน LINE หรือโทรศัพท์', en: 'You can cancel or reschedule at least 2 hours before your session via LINE or phone.' },
};

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return translations[key]?.[lang] ?? key;
  };
}

