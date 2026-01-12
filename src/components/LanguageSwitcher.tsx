import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const { user } = useAuth();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);

    // Save to user profile if logged in
    if (user) {
      await supabase
        .from('profiles')
        .update({ preferred_language: lng })
        .eq('id', user.id);
    }
  };

  const currentLanguage = i18n.language === 'es' ? 'Español' : 'English';
  const currentFlag = i18n.language === 'es' ? '🇲🇽' : '🇺🇸';

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="text-lg">{currentFlag}</span>
            <span className="hidden sm:inline text-sm">{currentLanguage}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLanguage('en')} className="gap-2">
            <span className="text-lg">🇺🇸</span>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('es')} className="gap-2">
            <span className="text-lg">🇲🇽</span>
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-lg">{currentFlag}</span>
          <span className="hidden sm:inline">{currentLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')} 
          className="gap-3 cursor-pointer"
        >
          <span className="text-lg">🇺🇸</span>
          <div className="flex flex-col">
            <span className="font-medium">English</span>
            <span className="text-xs text-muted-foreground">United States</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('es')} 
          className="gap-3 cursor-pointer"
        >
          <span className="text-lg">🇲🇽</span>
          <div className="flex flex-col">
            <span className="font-medium">Español</span>
            <span className="text-xs text-muted-foreground">México / Latinoamérica</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
