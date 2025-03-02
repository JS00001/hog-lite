import useClientStore from '@/store/client';

const colorPalette = {
  light: {
    ink: '#151515',
    primary: '#EEEFE9',
    accent: '#E5E7E0',
    divider: '#D0D1C9',
    highlight: '#FFFFFF',
    red: '#F54E00',
    yellow: '#DC9300',
    blue: '#1D4AFF',
    green: '#79AC54',
    gray: '#6A7282',
    shadowPrimary: '#E1DDDD',
    shadowAccent: '#B17816',
    borderDanger: '#E96B30',
    shadowDanger: '#F4A178',
  },
  dark: {
    ink: '#EEEFE9',
    primary: '#151515',
    accent: '#3b3b3b',
    highlight: '#232429',
    divider: '#4B4B4B',
    red: '#F54E00',
    yellow: '#F1A82C',
    blue: '#4468fc',
    green: '#2B5E08',
    gray: '#D1D5DC',
    shadowPrimary: '#323232',
    shadowAccent: '#926826',
    borderDanger: '#C44003',
    shadowDanger: '#84300B',
  },
};

const useColors = () => {
  const theme = useClientStore((state) => state.theme);

  return colorPalette[theme];
};

export default useColors;
