import { PropsWithChildren, createContext, useContext } from "react";

export const OrderContext = createContext({});

const OrderProvider = ({ children }: PropsWithChildren) => {
  return (
    <OrderContext.Provider
      value={{ invoices: ["#12", "#21"], addInvoice: () => {} }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;

export const useOrders = () => useContext(OrderContext);
