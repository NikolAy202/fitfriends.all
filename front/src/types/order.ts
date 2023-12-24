import { Training } from './training';

export type Order = {
  id?: string;
  userId: string;
  trainerId: string;
  orderType: string;
  trainingId: string;
  trainingCount: number;
  totalPrice: number;
  price: number;
  paymentType: PaymentType;
  rating: number;
  isDone: boolean;
  training: Training;
  image: string;
}

export enum PaymentType {
  Visa = 'visa',
  Mir = 'mir',
  Iomoney = 'iomoney',
}
export const PAY_OPTION = Object.values(PaymentType);

export type NewOrder = {
  trainingId: string;
  trainingCount: number;
  paymentType: PaymentType;
}
