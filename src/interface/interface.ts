
export interface Business {
  id: string;
  name: string;
  phone:string;
  email:string;
  categoria: string;
  address: string;
  rating: number;
  image: string;
  images: [];
  amenities:[];
  specialties:[];
  description: string;
  is_sponsor: boolean;
  is_vip:number;
  price?: string;
  taxes?: number;
  tax_percentage?: number;
  review_count?:number;
  type_category_id?:number;
  category_id:number;
}

export interface FeaturedBusiness {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: string;
  taxes: number;
  tax_percentage: number;
  phone: string;
  email: string;
  website: string;
  address: string;
  schedule: string;
  capacity: string;
  images: [];
  amenities: [];
  description: string;
  is_sponsor: boolean;
}

export interface Experience {
  id: string;
  name: string;
  category: string;
  duration: string;
  rating: number;
  price: string;
  date:string;
  time:string;
  capacity:string;
  organizer:string;
  is_free:string;
  tax_percentage:number;
  difficulty:string;
  location:string;
  max_people: number;
  image: string;
  images:[];
  includes:[];
  description: string;
  long_description:string;
  short_description:string;
}

export interface ServicesData {
  id: number;
  name: string;
  location: string;
  category: string;
  short_description: string;
  rating: string;
  price_range: number;
  phone: string;
  schedule: string;
  capacity: number;
  services: [];
  image: string;
  is_vip: boolean;
}

export interface EventsData {
  id:number;
  title:string;
  date:string;
  time:string;
  description:string;
  location:string;
  price:string;
  start_date:string;
  end_date:string;
  is_free:boolean;
  max_capacity:string;
  category:string;
  image:string;
  images:[];
  organizer:string;
  includes:[];
  requirements:[];
}

export interface AdventureCardProps {
  id:number;
  image:string;
  name:string;
  category:string;
  rating:string;
  difficulty:string;
  location:string;
  duration:string;
  max_people:string;
  description: string;
  price: string;
  taxes: number;
  taxPercentage: number;
}

export interface BusinessCardProps {
  id: string;
  name: string;
  phone:string;
  email:string;
  category: string;
  address: string;
  rating: number;
  image: string;
  description: string;
  is_sponsor?: boolean;
  price?: string;
  taxes?: number;
  tax_percentage?: number;
  specialties?: string[];
  amenities?: string[];
  onViewDetails?: (id: string) => void;
}

export interface PointsData {
  id:number;
  name:string;
  slug:string;
  description:string;
  image:string;
  short_description:string;
  category:string;
  latitude:string;
  longitude:string;
  address:string;
  opening_hours:string;
  currency:string;
  images:string;
  historical_significance:string;
  best_time_to_visit:string;
  accessibility_info:string;
  contact_info:string;
  is_active:string;
  is_featured:string;
  visitor_count:string;
  rating:string;
  review_count:string;
  tags:string;
  entry_fee:number;
}

export interface RoomType {
  id: number;
  business_id: number;
  name: string;
  description: string;
  max_occupancy: number;
  bed_type: string;
  room_size: string; // Ej: "30 m²"
  price_per_night: string; // Ej: "$ 150.000 / noche"
  has_tax: boolean;
  tax_percentage: number;
  amenities: string[]; 
  image: string; 
  images: string[];
  is_available: boolean;
  total_rooms: number;
}