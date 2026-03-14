import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const useSettings = () => {
  const { settings, dispatch } = useContext(SettingsContext);

  const updateSettings = (updates) => {
    dispatch({ type: 'UPDATE_SETTINGS', updates });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setLanguage = (language) => {
    dispatch({ type: 'UPDATE_SETTINGS', updates: { language } });
  };

  return {
    settings,
    updateSettings,
    toggleTheme,
    setLanguage,
  };
};

export default useSettings;
