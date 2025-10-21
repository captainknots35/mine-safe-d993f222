import { useState } from 'react';
import { Play, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  description?: string;
}

export const VideoPlayer = ({ videoUrl, title, description }: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white z-10"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>

        {description && (
          <div className="p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
