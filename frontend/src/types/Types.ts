export interface Dish {
    id: number;
    name: string;
    description: string;
    recipes: string;
    category_name: string;
    available: boolean;
    price: number;
    image?: string;
    featured?: boolean; // Assuming `featured` is a boolean (change type if needed)
  }

export interface Dish {
  id: number;
  name: string;
  description: string;
  recipes: string;
  category_name: string;
  available: boolean;
  image?: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  dish_data: Dish;
}

export interface OrderedItem {
  id: number;
  dish_name: string;
  quantity: number;
  subtotal: number;
  dishId: number;
  image?: string;
}

export interface Order {
  id: number;
  customer: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  ordered_items: OrderedItem[];
}

export interface DishOrder {
  id: number;
  quantity: number;
}

export interface PaymentMethod {
  value: string;
  label: string;
}

export interface PaymentItem {
  order_id: number;
  id: number;
  order: number;
  payment_method: string;
  transaction_id: string;
  amount: number;
}

export interface PaymentData {
  order: number;
  payment_method: string;
  amount: number;
}

export interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  image?: File | string; // Handle both file uploads and existing URLs
}

export interface ReviewsItem {
  id: number;
  dish: number;
  customer: number;
  customer_email: string;
  rating: number;
  review: string;
}


export interface ReviewData {
  dish: number;
  rating: number;
  review: string;
}

export interface CategoryItem {
  id: number;
  name: string;
}