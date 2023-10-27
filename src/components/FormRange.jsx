import { useState } from 'react';
import { formatPrice } from '../utils';

const FormRange = ({ label, size, name, price }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        {' '}
        <span className="label-text capitalize">{label}</span>
        <span> {formatPrice(selectedPrice)} </span>
      </label>
      <input
        type="range"
        name={name}
        min={price}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />

      {/* min and max */}
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md opacity-60">0 </span>
        <span className="opacity-60 font-bold text-md opacity-60">
          {' '}
          {formatPrice(maxPrice)}
        </span>
      </div>
    </div>
  );
};

export default FormRange;
