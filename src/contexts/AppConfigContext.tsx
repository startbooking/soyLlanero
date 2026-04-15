import React, { createContext, useContext, useEffect, useState } from 'react';
import { dataService } from '@/services/dataService';

interface AppConfig {
  app_description:string;
  app_favicon_url:string,
  app_logo_url:string,
  app_name:string,
  app_slogan:string,
  auto_approval_reviews:string,
  booking_advance_days:string,
  booking_enabled:string,
  cancellation_deadline_hours:string,
  commission_rate:string,
  company_address:string,
  company_email:string,
  company_movil:string,
  company_name:string,
  company_phone:string,
  company_website:string,
  default_currency:string,
  default_language:string,
  default_timezone:string,
  emergency_phone:string,
  facebook_url:string,
  featured_businesses_limit:string,
  id:string,
  instagram_url:string,
  max_upload_size_mb:string,
  privacy_policy_url:string,
  registration_enabled:string,
  review_moderation:string,
  tax_rate:string,
  terms_and_conditions_url:string,
  tourist_info_phone:string,
  twitter_url:string,
  whatsapp_number:string,
  youtube_url:string,
  linkedin_url:string,
  mision:string;
  vision:string;
  objetivos:string;
  achievements:string;
  horario_atencion:string;
  maintenance_mode:number;
}

interface FooterConfig {
  company_description: string;
  contact_address: string;
  contact_phone: string;
  contact_email: string;
  newsletter_enabled: boolean;
  social_links_enabled: boolean;
  quick_links: string[] | string;
  business_links: string[] | string;
  copyright_text: string;
  created_at: string;
  updated_at: string;
}

interface AppTexts {
  welcome_message: string;
  hero_title: string;
  hero_subtitle: string;
  featured_businesses_title: string;
  featured_businesses_subtitle: string;
  upcoming_events_title: string;
  experiences_title: string;
  services_title: string;
  newsletter_title: string;
  newsletter_subtitle: string;
  contact_us_title: string;
  about_us_title: string;
  created_at: string;
  updated_at: string;
}

interface AppService {
  id: number,
  name: string,
  location: string,
  description: string,
  rating: number,
  price: number,
  phone: string,
  schedule: string,
  capacity: string,
  category: string,
  services: string,
  image: string,
  isVip: string
}

interface AppImagesSlider {
  id:number,
  slide_title:string,
  slide_subtitle:string,
  slide_description:string,
  slide_image_url:string,
  slide_image_mobile_url:string,
  button_text:string,
  button_link:string,
  slide_order:number,
  is_active:number,
  overlay_opacity:string,
  text_color:string,
  button_style:string,
  animation_type:string,
  display_duration:number,
  created_at:string,
  updated_at:string,
}

interface AppStats {
  activeBusinesses:number,
  createdThisMonth:number,
  activeEvents:number,
  averageBusinnesses:number,
}

interface AppCategoriesStats {
  name:string,
  descripcion:string,
  icon:string,
  count:number;
}

interface AppConfigContextType {
  appConfig: AppConfig | null;
  footerConfig: FooterConfig | null;
  appTexts: AppTexts | null;
  appService: AppService | null;
  appImagesSlider: AppImagesSlider | null;
  appStats: AppStats| null;
  appCategoriesStats: AppCategoriesStats | null;
  isLoading: boolean;
  error: string | null;
  refetchConfig: () => Promise<void>;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null);
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);
  const [appTexts, setAppTexts] = useState<AppTexts | null>(null);
  const [appService, setAppService] = useState<AppService | null>(null);
  const [appImagesSlider, setAppImagesSlider] = useState<AppImagesSlider | null>(null);
  const [appStats, setAppStats] = useState<AppStats | null>(null);
  const [appCategoriesStats, setAppCategoriesStats] = useState<AppCategoriesStats | null>(null);;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [configData, footerData, textsData, serviceData, sliderData, statsData, statCategorieData] = await Promise.all([
        dataService.getAppConfig(),
        dataService.getFooterConfig(),
        dataService.getAppTexts(),
        dataService.getServices(),
        dataService.getSliderConfig(),
        dataService.getStatistics(),
        dataService.getCategoriesStats()
      ]);
      setAppConfig(configData);
      setFooterConfig(footerData);
      setAppTexts(textsData);
      setAppService(serviceData);
      setAppImagesSlider(sliderData);
      setAppStats(statsData);
      setAppCategoriesStats(statCategorieData);
      // console.log(appTexts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar configuración');
      console.error('Error fetching app config:', err);
    } finally {
      setIsLoading(false);

    }
  };

  const refetchConfig = async () => {
    await fetchConfig();
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <AppConfigContext.Provider value={{
      appConfig,
      footerConfig,
      appTexts,
      appService,
      appImagesSlider,
      appStats,
      appCategoriesStats,
      isLoading,
      error,
      refetchConfig
    }}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }
  return context;
};