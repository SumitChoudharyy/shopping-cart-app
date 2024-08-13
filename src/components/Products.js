"use client";

import { useCart } from "@/Context/AppContext";
import { Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Products = ({ id, title, description, price, images }) => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const { cart, add, remove } = useCart();


  // It changes the image of the product at 3 sec interval in pop up
  const changeIndex = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length])

  useEffect(() => {
    const interval = setInterval(() => {
      changeIndex();
    }, 2000);

    return () => clearInterval(interval);
  }, [show, changeIndex]);


  // addTocart Function the item to the cart
  const addToCart = (id) => {
    add(id);
    toast.success("Item Added to Cart");
  };

  // removeFromCart Remove the item from the cart
  const removeFromCart = (id) => {
    remove(id);
    toast.error("Item Removed");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 ease-in shadow-2xl gap-3 p-4 mt-10 ml-5 rounded-xl cursor-pointer">
        <div onClick={() => setShow(true)}>
          <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
            {title.length > 10 ? `${title.substr(0, 16)}...` : `${title}`}
          </p>
        </div>
        <div>
          <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
            {description.split(" ").slice(0, 10).join(" ") + "..."}
          </p>
        </div>
        <div onClick={() => setShow(true)} className="h-[180px]">
          <img src={images[0]} alt={title} className="w-full h-full select-none" />
        </div>

        <div className="flex items-center justify-between gap-16 w-full mt-5">
          <div>
            <p className="text-green-700 font-bold">$ {price}</p>
          </div>
          <div>
            {cart.some((item) => item.item.id === id) ? (
              <button
                className="text-blue-700 border-2 border-blue-600 rounded-full font-bold text-[12px] p-1 px-3 uppercase hover:bg-blue-600 hover:text-white transition-all ease-in duration-300 select-none"
                onClick={() => removeFromCart(id)}
              >
                Remove Item
              </button>
            ) : (
              <button
                className="text-blue-700 border-2 border-blue-600 rounded-full font-bold text-[12px] p-1 px-3 uppercase hover:bg-blue-600 hover:text-white transition-all ease-in duration-300 select-none"
                onClick={() => addToCart(id)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transition model to have more description about product invoke when pressed on item */}
      <Transition
        as={Fragment}
        show={show}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="overflow-y-auto max-w-[900px] w-full max-h-[80vh] rounded-xl bg-[#0C162D]/75 backdrop-blur-md border py-5 px-10 border-white/80">
            <button
              onClick={() => setShow(false)}
              className="fixed top-1 right-1 z-10 flex overflow-hidden items-center justify-center rounded-full border border-white/75 p-2 group"
            >
              <div className="h-full w-full absolute -left-[100%] bg-black group-hover:left-0 transition-all duration-300" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white z-10 group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col lg:flex-row space-y-4 gap-10 text-center lg:text-start">
              <img
                src={images[index]}
                alt={title}
                className="mx-auto h-[350px] opacity-80 w-full object-cover rounded-lg select-none"
              />
              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-5">
                  <h2 className="text-white text-2xl leading-8 font-semibold">
                    {title}
                  </h2>
                  <p className="text-white text-sm">{description}</p>
                </div>
                <div className="flex items-center justify-between gap-16 w-full mt-5">
                  <div>
                    <p className="text-green-500 text-2xl font-bold">
                      ${price}
                    </p>
                  </div>
                  <div>
                    {cart.some((item) => item.item.id === id) ? (
                      <button
                        className="text-gray-100 border-2 border-gray-100 rounded-full font-bold text-[12px] p-1 px-3 uppercase hover:bg-gray-100 hover:text-gray-700 transition-all ease-in duration-300 select-none"
                        onClick={() => removeFromCart(id)}
                      >
                        Remove Item
                      </button>
                    ) : (
                      <button
                        className="text-gray-100 border-2 border-gray-100 rounded-full font-bold text-[12px] p-1 px-3 uppercase hover:bg-gray-100 hover:text-gray-700 transition-all ease-in duration-300 select-none"
                        onClick={() => addToCart(id)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Products;