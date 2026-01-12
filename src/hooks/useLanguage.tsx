import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to manage language preference
 * - Syncs with user profile preference
 * - Provides helper for getting translated content from database
 */
export function useLanguage() {
  const { i18n } = useTranslation();
  const { user, profile } = useAuth();

  // Sync language with user profile preference
  useEffect(() => {
    const loadUserLanguage = async () => {
      if (user && profile?.preferred_language) {
        const savedLang = profile.preferred_language;
        if (savedLang && savedLang !== i18n.language) {
          await i18n.changeLanguage(savedLang);
        }
      }
    };

    loadUserLanguage();
  }, [user, profile, i18n]);

  const currentLanguage = i18n.language;
  const isSpanish = currentLanguage === 'es';

  /**
   * Get the appropriate field based on current language
   * Falls back to English if Spanish translation is not available
   */
  const getLocalizedField = <T extends Record<string, any>>(
    item: T,
    fieldName: string
  ): string => {
    if (isSpanish) {
      const spanishField = `${fieldName}_es` as keyof T;
      if (item[spanishField]) {
        return item[spanishField] as string;
      }
    }
    return item[fieldName as keyof T] as string;
  };

  /**
   * Get localized content_data (for lessons with JSON content)
   */
  const getLocalizedContentData = <T extends Record<string, any>>(
    item: T
  ): any => {
    if (isSpanish && item.content_data_es) {
      return item.content_data_es;
    }
    return item.content_data;
  };

  /**
   * Save user language preference to profile
   */
  const saveLanguagePreference = async (language: string) => {
    await i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    
    if (user) {
      await supabase
        .from('profiles')
        .update({ preferred_language: language })
        .eq('id', user.id);
    }
  };

  return {
    currentLanguage,
    isSpanish,
    getLocalizedField,
    getLocalizedContentData,
    saveLanguagePreference,
    t: i18n.t
  };
}
