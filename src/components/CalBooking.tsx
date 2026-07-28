import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface Props {
  lang: 'th' | 'en';
  calLink: string;
}

export default function CalBooking({ lang, calLink }: Props) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'dark',
        styles: {
          branding: { brandColor: '#f4f4f4' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '100%', overflow: 'auto', minHeight: '500px' }}
        config={{
          layout: 'month_view',
          theme: 'dark',
          lang: lang === 'th' ? 'th' : 'en',
        }}
      />
    </div>
  );
}
