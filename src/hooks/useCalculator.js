import { useState, useEffect, useRef } from 'react';

export const useCalculator = () => {
  // State declarations
  const [time, setTime] = useState({ hours: '0', minutes: '0', seconds: '0' });
  const [distance, setDistance] = useState('0');
  const [pace, setPace] = useState({ minutes: '0', seconds: '0' });
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [paceUnit, setPaceUnit] = useState('km');
  const [lastEdited, setLastEdited] = useState(null);
  const [calculated, setCalculated] = useState(null);
  const [firstCalculationDone, setFirstCalculationDone] = useState(false);

  // Refs
  const calculationTimeout = useRef(null);
  const previousUnits = useRef({ distanceUnit, paceUnit });

  // Helper Functions
  const timeToMinutes = (t) => {
    const h = parseInt(t.hours, 10) || 0;
    const m = parseInt(t.minutes, 10) || 0;
    const s = parseInt(t.seconds, 10) || 0;
    return h * 60 + m + s / 60;
  };

  const paceToMinutes = (p) => {
    const minutes = parseInt(p.minutes, 10) || 0;
    const seconds = parseInt(p.seconds, 10) || 0;
    return minutes + seconds / 60;
  };

  const convertPace = (paceValue, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return paceValue;
    return fromUnit === 'km' ? paceValue * 1.60934 : paceValue / 1.60934;
  };

  const clearCalculationTimeout = () => {
    if (calculationTimeout.current) {
      clearTimeout(calculationTimeout.current);
      calculationTimeout.current = null;
    }
  };

  const getDelayForInputType = (inputType) => {
    switch (inputType) {
      case 'distance':
        return 1000; // 1 second for distance (decimal input)
      case 'time':
      case 'pace':
        return 1500; // 1.5 seconds for time and pace (multiple fields)
      default:
        return 800;
    }
  };

  // Calculation Functions
  const calculateTime = () => {
    if (distance && pace.minutes) {
      let paceMinutes = paceToMinutes(pace);
      if (paceUnit !== distanceUnit) {
        paceMinutes = convertPace(paceMinutes, paceUnit, distanceUnit);
      }
      const totalMinutes = paceMinutes * parseFloat(distance);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      const seconds = Math.round((totalMinutes % 1) * 60);
      
      setTime({
        hours: String(hours),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
      setCalculated('time');
      setTimeout(() => setCalculated(null), 1000);
    }
  };

  const calculateDistance = () => {
    if (timeToMinutes(time) && paceToMinutes(pace)) {
      const totalMinutes = timeToMinutes(time);
      let paceMinutes = paceToMinutes(pace);
      if (paceUnit !== distanceUnit) {
        paceMinutes = convertPace(paceMinutes, paceUnit, distanceUnit);
      }
      setDistance((totalMinutes / paceMinutes).toFixed(2));
      setCalculated('distance');
      setTimeout(() => setCalculated(null), 1000);
    }
  };

  const calculatePace = () => {
    if (timeToMinutes(time) && distance) {
      const totalMinutes = timeToMinutes(time);
      let paceValue = totalMinutes / parseFloat(distance);
      if (paceUnit !== distanceUnit) {
        paceValue = convertPace(paceValue, distanceUnit, paceUnit);
      }
      const paceMinutes = Math.floor(paceValue);
      const paceSeconds = Math.round((paceValue - paceMinutes) * 60);
      setPace({
        minutes: String(paceMinutes),
        seconds: String(paceSeconds).padStart(2, '0')
      });
      setCalculated('pace');
      setTimeout(() => setCalculated(null), 1000);
    }
  };

  // Input Handlers
  const handleTimeChange = (field, value) => {
    setTime(prev => ({ ...prev, [field]: value }));
    clearCalculationTimeout();
    setLastEdited('time');
  };

  const handleDistanceChange = (value) => {
    setDistance(value);
    clearCalculationTimeout();
    setLastEdited('distance');
  };

  const handlePaceChange = (field, value) => {
    setPace(prev => ({ ...prev, [field]: value }));
    clearCalculationTimeout();
    setLastEdited('pace');
  };

  // Effects
  useEffect(() => {
    const timeValid = timeToMinutes(time) > 0;
    const distanceValid = parseFloat(distance) > 0;
    const paceValid = paceToMinutes(pace) > 0;
    
    let validInputs = 0;
    if (timeValid) validInputs++;
    if (distanceValid) validInputs++;
    if (paceValid) validInputs++;

    if (validInputs === 2 && !firstCalculationDone && lastEdited) {
      clearCalculationTimeout();

      calculationTimeout.current = setTimeout(() => {
        if (lastEdited !== 'time' && timeValid && distanceValid) {
          calculatePace();
          setFirstCalculationDone(true);
        } else if (lastEdited !== 'distance' && paceValid && timeValid) {
          calculateDistance();
          setFirstCalculationDone(true);
        } else if (lastEdited !== 'pace' && distanceValid && paceValid) {
          calculateTime();
          setFirstCalculationDone(true);
        }
      }, getDelayForInputType(lastEdited));
    }

    return () => clearCalculationTimeout();
  }, [time, distance, pace, lastEdited]);

  // Effect for unit changes
  useEffect(() => {
    if (previousUnits.current.distanceUnit !== distanceUnit ||
        previousUnits.current.paceUnit !== paceUnit) {
      
      const timeValid = timeToMinutes(time) > 0;
      const distanceValid = parseFloat(distance) > 0;
      const paceValid = paceToMinutes(pace) > 0;

      if ((timeValid && distanceValid) || (timeValid && paceValid) || (distanceValid && paceValid)) {
        if (lastEdited === 'time') {
          calculatePace();
        } else if (lastEdited === 'pace') {
          calculateDistance();
        } else {
          calculateTime();
        }
      }

      previousUnits.current = { distanceUnit, paceUnit };
    }
  }, [distanceUnit, paceUnit]);

  return {
    time, setTime,
    distance, setDistance,
    pace, setPace,
    distanceUnit, setDistanceUnit,
    paceUnit, setPaceUnit,
    calculated,
    setLastEdited,
    calculateTime,
    calculateDistance,
    calculatePace,
    firstCalculationDone,
    handleTimeChange,
    handleDistanceChange,
    handlePaceChange
  };
};