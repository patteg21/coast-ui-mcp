export interface NavbarProps {
  brand?: string;
  links?: Array<string | { text: string; href: string }>;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  primaryButton?: string;
  primaryButtonHref?: string;
  secondaryButton?: string;
  secondaryButtonHref?: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface FeatureGridProps {
  title?: string;
  features: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
}

export interface CodeBlockProps {
  title?: string;
  subtitle?: string;
  code: string;
  language?: string;
}

export interface PricingTableProps {
  title?: string;
  plans: Array<{
    name: string;
    price: string;
    period?: string;
    features: string[];
    button: string;
    buttonHref?: string;
    featured?: boolean;
  }>;
}

export interface CardsProps {
  cards: Array<{
    title: string;
    description: string;
    icon?: string;
    footer?: string;
  }>;
}

export interface FooterProps {
  text: string;
  links?: Array<{ text: string; href: string }>;
}


// Form Components
export interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaProps {
  placeholder?: string;
  rows?: number;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface SelectProps {
  options: Array<{ value: string; text: string }>;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface FormProps {
  action?: string;
  method?: string;
  children: React.ReactNode;
}

// Layout Components
export interface ContainerProps {
  children: React.ReactNode;
}

export interface GridProps {
  columns?: number;
  children: React.ReactNode;
}

export interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

// Media Components
export interface ImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

export interface VideoProps {
  src: string;
  poster?: string;
  controls?: boolean;
}

// UI Elements
export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface TextProps {
  children: React.ReactNode;
}

export interface ListProps {
  items: string[];
  ordered?: boolean;
}

export interface CardProps {
  title: string;
  content: string;
  footer?: string;
}

export interface DividerProps {
}

export interface SpacerProps {
}

export interface BreakProps {
}