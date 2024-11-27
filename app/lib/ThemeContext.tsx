import { createContext, ReactNode, useContext } from 'react';
import { darkTheme, defaultTheme } from './themes';

export type ColorScheme = 'light' | 'dark';

export type ThemeName = 'light' | 'dim' | 'dark';

export type PaletteColorName =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'inverted'
  | 'error';

export type PaletteColor = {
  background: string;
  backgroundLight: string;
  text: string;
  textLight: string;
  textInverted: string;
  link: string;
  border: string;
  borderDark: string;
  icon: string;
  [k: string]: string;
};

export type Palette = Record<PaletteColorName, PaletteColor>;

export interface Theme {
  colorScheme: ColorScheme;
  palette: Palette;
}

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

function getTheme(theme: ThemeName) {
  switch (theme) {
    case 'light':
      return defaultTheme;
    case 'dark':
      return darkTheme;
    default:
      return defaultTheme;
  }
}

export interface ThemeProviderProps {
  children?: ReactNode;
  theme: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const themeValue = getTheme(theme);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};
