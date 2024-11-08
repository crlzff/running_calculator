const NumberInput = ({ value, onChange, placeholder, max, min = 0, label, className = "" }) => {
  // Ensure value is always a valid number string or empty
  const displayValue = value === '' ? '0' : String(value).padStart(2, '0');

  const handleChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    
    if (value === '' || value === '0') {
      onChange('0');
      return;
    }

    const numValue = parseInt(value, 10);
    
    // Apply min/max constraints
    if (max !== undefined) {
      onChange(Math.min(Math.max(numValue, min), max).toString());
    } else {
      onChange(Math.max(numValue, min).toString());
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="number"  // Changed back to number
        value={displayValue}
        onChange={(e) => {
          const value = Math.max(min, Math.min(max || Infinity, Number(e.target.value) || 0));
          onChange(value.toString());
        }}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`w-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
      <span className="text-xs text-gray-500 mt-1 text-center">{label}</span>
    </div>
  );
};

export default NumberInput;