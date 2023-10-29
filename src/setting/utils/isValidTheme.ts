type ThemeProps = 'defaultTheme' | 'blueTheme' | 'darkTheme';

export const isValidTheme = (theme: string): theme is ThemeProps => {
  return theme === 'defaultTheme' || theme === 'blueTheme' || theme === 'darkTheme';
}