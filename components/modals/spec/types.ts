export type SpecificationType = 'bends' | 'pipes' | 'coldDeformed';

export interface Specification {
  name?: string;
  diameter?: string;
  weight: number;
  price?: number;
  pricePerMeter?: number;
  pricePerton?: number;
}

export interface SelectedItem {
  name: string;
  quantity: number;
}

export interface SpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  title: string;
  gost: string;
  specifications: Specification[];
  type: SpecificationType;
}

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
  weight: number;
  type: SpecificationType;
} 