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
  backgroundColor?: string;
  textColor?: string;
}

export interface DesignSystem {
  theme?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    surface?: string;
    text?: string;
    textSecondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    navbar?: string;
    navbarText?: string;
  };
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: number;
  };
  spacing?: {
    scale?: string;
    containerPadding?: string;
    elementSpacing?: string;
  };
  borderRadius?: string;
  shadows?: boolean;
}