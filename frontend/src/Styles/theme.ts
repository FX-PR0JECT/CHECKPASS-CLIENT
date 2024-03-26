import { icons } from '@/common/icons';
import { COLOR } from '../constants/color';

const colors = {
  // bg
  white: COLOR.white,
  'form-component': COLOR.transparent[50],
  'card-dark': COLOR.gray[90],
  'bg-dark': COLOR.gray[100],
  'attendance-item-g1': COLOR.gray[5],
  'attendance-item-g2': COLOR.gray['7a'],
  'attendance-item-b1': COLOR.blue[30],
  'attendance-item-b2': COLOR.blue[65],
  'attendance-item-y1': '#FFE27B',
  'attendance-item-y2': '#FCD928',
  'attendance-item-r1': '#FF7B7B',
  'attendance-item-r2': '#FD2929',

  // input & select
  'form-tag': COLOR.transparent[45],

  // border
  'border-default': COLOR.gray[10],
  'border-dark': COLOR.gray[85],
  'border-error': COLOR.red,

  // icon
  bubble: COLOR.gray[8],
  'bubble-dark': COLOR.gray[75],

  // button
  button: COLOR.black[100],
  'button-text': COLOR.white,

  // font
  'text-primary': COLOR.black[100],
  'text-dark': COLOR.white,
  'text-secondary': COLOR.gray[90],
  'text-secondary-dark': COLOR.gray[15],
  'text-tertiary': COLOR.gray[60],
  'text-placeholder': COLOR.gray[55],
  'text-error': COLOR.red,

  // shadow
  'shadow-default': COLOR.black['100a'],
  'shadow-soft': COLOR.black['100b'],
  'shadow-dark': COLOR.black['100c'],

  transparent: COLOR.transparent,
} as const;

const defaultFontSize = 16;

const fontSizes = {
  // login
  'logo-main': `${66 / defaultFontSize}rem`,
  'logo-side': `${34 / defaultFontSize}rem`,
  'button-pw': `${18 / defaultFontSize}rem`,

  // main
  'greeting-message': `${36 / defaultFontSize}rem`,
  'card-title': `${32 / defaultFontSize}rem`,
  'header-logo': `${24 / defaultFontSize}rem`,

  // beacon & attendance
  'attendance-item': `${22 / defaultFontSize}rem`,

  // etc
  small: `${14 / defaultFontSize}rem`,
  medium: '1rem',
  large: `${20 / defaultFontSize}rem`,
} as const;

const MainTheme = {
  dark: {
    bgColor: COLOR.gray[100],
    color: COLOR.white,
    itemColor: COLOR.gray[90],
    bubble: COLOR.gray[75],
    bubbleTail: icons.MainPage.Dark.bubbleDark,

    button_bg: colors.white,
    button_color: colors.button,

    // Header
    themeHover: COLOR.gray[75],
    profileBorder: COLOR.white,
  },

  light: {
    bgColor: COLOR.white,
    color: COLOR.black[100],
    itemColor: COLOR.white,
    bubble: COLOR.gray[8],
    bubbleTail: icons.MainPage.Light.bubbleLight,

    button_bg: colors.button,
    button_color: colors['button-text'],

    // Header
    themeHover: COLOR.gray[8],
    profileBorder: COLOR.black[100],
  },
};

export { fontSizes, colors, MainTheme };
