import { useState, useEffect } from "react";
import BasketCard from "../../components/basket/BasketCard";
import OrderSummary from "../../components/basket/OrderSummary";
import { data } from "../../data/mydata";
import PageLayout from "../PageLayout";

type QuantitiesType = { [key: number]: number };
const Basket = () => {
  const [quantities, setQuantities] = useState<QuantitiesType>({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const initialQuantities = data.reduce((acc: QuantitiesType, product) => {
      acc[product.id] = 1; // Start each product with a quantity of 1
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    const newSubTotal = data.reduce((acc, product) => {
      return acc + product.price * (quantities[product.id] || 0);
    }, 0);
    setSubTotal(newSubTotal);
  }, [quantities]);

  const handleQuantityChange = (
    productId: number,

    newQuantity: number
  ) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
    <PageLayout>
      <div className="w-full h-auto text-xl mt-[80px] py-10 px-4 sm:px-6 lg:px-10 xl:px-20">
        <h1 className="w-full font-bold font-DreamToBerich">Basket</h1>
        <div className="w-full h-auto flex md:flex-row px-4 flex-col justify-center gap-20 items-start ">
          <section className="h-auto ">
            <div className="w-full h-auto overflow-y-hidden flex flex-col justify-center items-center gap-2">
              <button className="text-end font-normal w-full text-gray-500">
                see all
              </button>
              {data.map((product) => (
                <BasketCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] || 1}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          </section>
          <section className="md:w-[400px] w-full border-2 shadow-lg bg-white h-[350px] rounded-3xl">
            <OrderSummary total={subTotal} subTotal={subTotal} />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Basket;
