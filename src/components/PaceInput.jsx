import NumberInput from './NumberInput';

const PaceInput = ({ pace, unit, onPaceChange, onUnitChange, isHighlighted, t }) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 mr-2">{t.pace.label}</label>
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="text-sm p-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="km">{t.pace.perKm}</option>
          <option value="mi">{t.pace.perMile}</option>
        </select>
      </div>
      <div className="flex gap-2">
        <NumberInput
          value={pace.minutes}
          onChange={(value) => onPaceChange('minutes', value)}
          placeholder="00"
          label={t.time.minutes}
        />
        <span className="text-xl self-center">:</span>
        <NumberInput
          value={pace.seconds}
          onChange={(value) => onPaceChange('seconds', value)}
          max={59}
          placeholder="00"
          label={t.time.seconds}
        />
      </div>
    </div>
  );
};

export default PaceInput;