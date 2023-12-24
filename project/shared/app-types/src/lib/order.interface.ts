import { PaymentType } from "./payment-type.enam";

export interface Order {
  _id?: string;
  userId: string;
  trainerId: string;
  orderType: string;
  trainingId: string;
  trainingCount: number;
  totalPrice: number;
  price: number;
  paymentType: PaymentType;
}
