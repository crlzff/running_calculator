import { useState, useEffect } from 'react';
import TimeInput from './components/TimeInput';
import DistanceInput from './components/DistanceInput';
import PaceInput from './components/PaceInput';
import { useCalculator } from './hooks/useCalculator';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { useLanguage } from './hooks/useLanguage';
import en from './i18n/en';
import it from './i18n/it';

function App() {
  const { getInitialLanguage, defaultLanguage } = useLanguage();
  const [language, setLanguage] = useState(getInitialLanguage());
  const t = language === 'it' ? it : en;

  useDocumentMeta(t.title, t.metadata.description);

  // Update URL when language changes
  useEffect(() => {
    if (language !== defaultLanguage) {
      const params = new URLSearchParams(window.location.search);
      params.set('lang', language);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      // Remove lang parameter if we're using the default language
      const params = new URLSearchParams(window.location.search);
      params.delete('lang');
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [language, defaultLanguage]);
  
  const {
    time,
    distance,
    pace,
    distanceUnit, setDistanceUnit,
    paceUnit, setPaceUnit,
    calculated,
    calculateTime,
    calculateDistance,
    calculatePace,
    firstCalculationDone,
    handleTimeChange,
    handleDistanceChange,
    handlePaceChange
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Header section reworked */}
        <div className="mb-6 sm:mb-8">
          {/* Title and Language selector row */}
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.title}</h1>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="ml-4 p-1.5 text-sm border rounded-lg"
            >
              <option value="en">EN</option>
              <option value="it">IT</option>
            </select>
          </div>
          {/* Subtitle and help text in their own rows */}
          <p className="text-sm sm:text-base text-blue-800">{firstCalculationDone ? t.help.afterFirst : t.help.initial}</p>
        </div>

        <div className="space-y-6">
          {/* Time Section */}
          <div className={`transition-colors duration-500 ${calculated === 'time' ? 'bg-blue-100' : ''}`}>
            <div className="py-4 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <TimeInput 
                time={time}
                onTimeChange={handleTimeChange}
                isHighlighted={false}
                t={t}
              />
              {firstCalculationDone && (
                <button
                  onClick={calculateTime}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                          transition-colors min-w-[165px] self-end sm:self-center sm:mt-3"
                >
                  {t.time.update}
                </button>
              )}
            </div>
          </div>

          {/* Distance Section */}
          <div className={`transition-colors duration-500 ${calculated === 'distance' ? 'bg-blue-100' : ''}`}>
            <div className="py-4 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <DistanceInput 
                distance={distance}
                unit={distanceUnit}
                onDistanceChange={handleDistanceChange}
                onUnitChange={setDistanceUnit}
                isHighlighted={false}
                t={t}
              />
              {firstCalculationDone && (
                <button
                  onClick={calculateDistance}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                          transition-colors min-w-[165px] self-end sm:self-center sm:mt-3"
                >
                  {t.distance.update}
                </button>
              )}
            </div>
          </div>

          {/* Pace Section */}
          <div className={`transition-colors duration-500 ${calculated === 'pace' ? 'bg-blue-100' : ''}`}>
            <div className="py-4 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <PaceInput 
                pace={pace}
                unit={paceUnit}
                onPaceChange={handlePaceChange}
                onUnitChange={setPaceUnit}
                isHighlighted={false}
                t={t}
              />
              {firstCalculationDone && (
                <button
                  onClick={calculatePace}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                          transition-colors min-w-[165px] self-end sm:self-center sm:mt-3"
                >
                  {t.pace.update}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;