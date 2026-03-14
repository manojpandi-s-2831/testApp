import { createContext, useReducer, useEffect, useRef } from 'react';
import { getSettings, saveSettings } from '../services/settingsService';

const SettingsContext = createContext();

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, ...action.settings };
    case 'UPDATE_SETTINGS':
      return { ...state, ...action.updates };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

const SettingsProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, null, getSettings);
  const timerRef = useRef(null);

  // Debounce localStorage writes (500ms)
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveSettings(settings), 500);
    return () => clearTimeout(timerRef.current);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
