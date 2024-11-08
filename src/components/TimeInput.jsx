import NumberInput from './NumberInput';

const TimeInput = ({ time, onTimeChange, isHighlighted, t }) => {
  const handleChange = (field, value) => {
    const max = field === 'hours' ? undefined : 59;
    onTimeChange(field, value);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{t.time.label}</label>
      <div className="flex flex-wrap gap-2">
        <NumberInput
          value={time.hours}
          onChange={(value) => onTimeChange('hours', value)}
          placeholder="00"
          label={t.time.hours}
        />
        <span className="text-xl self-center">:</span>
        <NumberInput
          value={time.minutes}
          onChange={(value) => onTimeChange('minutes', value)}
          max={59}
          placeholder="00"
          label={t.time.minutes}
        />
        <span className="text-xl self-center">:</span>
        <NumberInput
          value={time.seconds}
          onChange={(value) => onTimeChange('seconds', value)}
          max={59}
          placeholder="00"
          label={t.time.seconds}
        />
      </div>
    </div>
  );
};

export default TimeInput;