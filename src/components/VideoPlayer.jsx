
import { useState } from 'react';

export default function VideoPlayer({
  title = 'Course Video',
  videoUrl = ''
}) {
  const [error, setError] = useState(false);

  function getEmbedUrl(url) {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname.includes('youtube.com') ||
        parsed.hostname === 'youtu.be'
      ) {
        let id = '';

        if (parsed.hostname === 'youtu.be') {
          id = parsed.pathname.slice(1);
        } else if (parsed.pathname === '/watch') {
          id = parsed.searchParams.get('v') || '';
        } else {
          id = parsed.pathname.split('/').filter(Boolean).pop() || '';
        }

        if (!/^[\w-]{11}$/.test(id)) return '';

        return `https://www.youtube-nocookie.com/embed/${id}`;
      }

      if (
        parsed.hostname === 'vimeo.com' ||
        parsed.hostname === 'www.vimeo.com'
      ) {
        const id = parsed.pathname.split('/').filter(Boolean).pop();
        if (!/^\d+$/.test(id || '')) return '';
        return `https://player.vimeo.com/video/${id}`;
      }

      return '';
    } catch {
      return '';
    }
  }

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className="course-video">
      <h3>{title}</h3>

      {embedUrl && !error ? (
        <div className="video-frame">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <div className="video-placeholder">
          <p>ভিডিও এখনো যোগ করা হয়নি।</p>
          <p>YouTube বা Vimeo ভিডিওর লিংক যোগ করতে হবে।</p>
        </div>
      )}
    </section>
  );
}
