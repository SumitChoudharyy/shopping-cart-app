"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/Context/AppContext";
import CartItem from "@/components/CartItem";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

  
  // Calculate the total prive to show at checkout 
  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0)
    );
  }, [cart]);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row p-0 md:p-3 gap-5 items-center">
          <div className="w-[100%] md:w-[60%] flex flex-col p-2">
            {cart.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem.item.id}
                  id={cartItem.item.id}
                  image={cartItem.item.images[0]}
                  title={cartItem.item.title}
                  description={cartItem.item.description}
                  price={cartItem.item.price}
                  quantity={cartItem.quantity}
                />
              );
            })}
          </div>
          <div className="flex flex-col p-5 gap-5 my-14 max-h-[400px] self-start  h-[100%] justify-between">
            <div className="flex flex-col gap-5 ">
              <div className="font-semibold text-xl text-blue-800 ">
                Your Cart
              </div>
              <div className="font-semibold text-5xl text-blue-700  -mt-5">
                Summary
              </div>
              <div className="text-xl">
                <span className="text-gray-700 font-semibold text-xl">
                  Total Items: {cart.length}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <p>
                  <span className="font-semibold text-gray-700">Total Amount: {' '}</span>
                  <span className="font-semibold text-green-600">${totalAmount}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Discount: {' '}</span>
                  <span className="font-semibold text-red-600">-${(totalAmount*0.1).toFixed(2)}{` (10% off)`}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Payable Amount: {' '}</span>
                  <span className="font-semibold text-green-600">${totalAmount - totalAmount*0.1}</span>
                </p>
              </div>
              <button 
              onClick ={(e)=>{
                e.preventDefault();
                router.push('/Checkout');
                setCart([]);
              }}
                className="select-none text-center bg-blue-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-indigo-700 font-bold hover:text-green-700 p-3 text-xl"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h2 className="text-gray-700 font-semibold text-xl mb-2">
            Your Cart is Empty!
          </h2>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-indigo-700 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">
              Show Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
