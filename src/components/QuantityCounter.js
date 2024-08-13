const QuantityCounter = ({ quantity, increase, decrease }) => {
    return (
      <div className="flex items-center gap-3 ">
        <p>Quantity: </p>
        <div className="flex items-center justify-center gap-3 border border-slate-700 rounded-md">
        <div
          className="text-2xlh-6 w-6 flex items-center justify-center cursor-pointer select-none border-r border-slate-700"
          onClick={() => {
            if (quantity != 1) decrease();
          }}
        >
          -
        </div>
        <div className="text-xl font-semibold">{quantity}</div>
        <div
          className="text-2xl h-6 w-6 flex items-center justify-center cursor-pointer select-none border-l border-slate-700"
          onClick={increase}
        >
          +
        </div>
        </div>
      </div>
    );
  };
  
  export default QuantityCounter;