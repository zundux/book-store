import { initialStateOrder } from "./reducer";

export const saveOrderData = {
  products: [
    { id: 1, title: "book 1", amount: 1 },
    { id: 2, title: "book 2", amount: 2 }
  ],
  orderDetails: {
    contactName: "Joe Doe",
    phoneNumber: "+1 212-340-0863",
    email: "example@example.com",
    paymentAddress: "476 5th Ave, New York, NY 10018, USA"
  }
};

export const errorMessage = "Something went wrong";

export default {
  initialState: initialStateOrder,
  saveOrderData,
  errorMessage
};