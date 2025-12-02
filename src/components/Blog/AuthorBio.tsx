import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AIPersona } from '@/types/blog';

interface AuthorBioProps {
  author: AIPersona | null;
}

export function AuthorBio({ author }: AuthorBioProps) {
  if (!author) return null;

  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="mt-12 bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={author.avatar_url || undefined} alt={author.name} />
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{author.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{author.bio}</p>
            {author.specialty && author.specialty.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {author.specialty.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
