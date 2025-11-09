import React from "react";
import { Card } from "./ui/card";

interface BasicVideoProps {
  src: string;
  title?: string;
  description?: string;
}

export const BasicVideo: React.FC<BasicVideoProps> = ({ src, title, description }) => {
  const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(src);
  const isVimeo = /vimeo\.com/i.test(src);

  const getYouTubeId = (url: string) => {
    const patterns = [
      /[?&]v=([^&]+)/, // youtube.com/watch?v=
      /youtu\.be\/([^?&]+)/, // youtu.be/ID
      /youtube\.com\/embed\/([^?&]+)/, // youtube.com/embed/ID
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m?.[1]) return m[1];
    }
    return null;
  };

  const getVimeoId = (url: string) => {
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m?.[1] || null;
  };

  const ytId = isYouTube ? getYouTubeId(src) : null;
  const vimeoId = isVimeo ? getVimeoId(src) : null;

  return (
    <Card className="overflow-hidden">
      {title && (
        <div className="px-4 py-3 bg-primary/10 border-b border-border">
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
      )}

      <div className="relative aspect-video bg-black">
        {ytId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&playsinline=1`}
            title={title || "Training Video"}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        ) : vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title || "Training Video"}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={src}
            controls
            className="absolute inset-0 w-full h-full"
            playsInline
          />
        )}
      </div>

      {description && (
        <div className="p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="px-4 py-3 border-t bg-background">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
          aria-label={`Open ${title || 'video'} in a new tab`}
        >
          Open video in a new tab
        </a>
      </div>
    </Card>
  );
};
