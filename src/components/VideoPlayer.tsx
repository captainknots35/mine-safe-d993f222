import { useEffect, useState } from 'react';
import { Play, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  description?: string;
}

export const VideoPlayer = ({ videoUrl, title, description }: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [provider, setProvider] = useState<'youtube' | 'nocookie' | 'invidious' | 'piped'>('youtube');

  useEffect(() => {
    try {
      if (window.location.hostname.includes('lovableproject.com') || window.top !== window.self) {
        setProvider('invidious');
      }
    } catch {
      // ignore cross-origin access errors
    }
  }, []);

  // Extract YouTube video ID from URL
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

  const videoId = getYouTubeId(videoUrl);

  const buildEmbedUrl = (id: string, prov: 'youtube' | 'nocookie' | 'invidious' | 'piped') => {
    switch (prov) {
      case 'nocookie':
        return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
      case 'invidious':
        return `https://yewtu.be/embed/${id}`;
      case 'piped':
        return `https://piped.video/embed/${id}`;
      default:
        return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
    }
  };

  const embedUrl = videoId ? buildEmbedUrl(videoId, provider) : videoUrl;

  console.info('VideoPlayer embed debug', { videoUrl, videoId, embedUrl, provider });

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card className={`overflow-hidden transition-all ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="relative">
        {title && (
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Play className="h-4 w-4" />
              {title}
            </h3>
          </div>
        )}
        
        <div className={`relative ${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'aspect-video'} bg-black`}>
          <iframe
            src={embedUrl}
            title={title || 'Training Video'}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
          
          {videoId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-12 bg-black/50 hover:bg-black/70 text-white z-10"
                  aria-label="Change embed provider"
                >
                  Alt
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[220px]">
                <DropdownMenuItem onClick={() => setProvider('youtube')}>YouTube</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProvider('nocookie')}>YouTube (NoCookie)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProvider('invidious')}>Invidious (yewtu.be)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProvider('piped')}>Piped (piped.video)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white z-10"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>

        {videoId && (
          <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-t">
            <p className="text-xs text-muted-foreground">If the video is blocked by your network, open it directly:</p>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:underline"
              aria-label={`Open ${title || 'video'} on YouTube`}
            >
              Watch on YouTube
            </a>
          </div>
        )}

        {description && (
          <div className="p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
