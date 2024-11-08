const DistanceInput = ({ distance, unit, onDistanceChange, onUnitChange, isHighlighted, t }) => {
  const handleChange = (e) => {
    // Only allow numbers and one decimal point
    const value = e.target.value.replace(/[^\d.]/g, '');
    
    // Handle decimal numbers properly
    if (value === '' || value === '.') {
      onDistanceChange('0');
      return;
    }

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) return;

    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) return;

    // Validate number
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onDistanceChange(numValue.toString());
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{t.distance.label}</label>
      <div className="flex flex-wrap gap-2">
        <input
          type="number"
          value={distance}
          onChange={(e) => {
            const value = Math.max(0, Number(e.target.value) || 0);
            onDistanceChange(value.toString());
          }}
          min="0"
          step="0.01"
          placeholder="0.00"
          className="w-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="km">{t.distance.km}</option>
          <option value="mi">{t.distance.mi}</option>
        </select>
      </div>
    </div>
  );
};

export default DistanceInput;