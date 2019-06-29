interface Breakpoints {
    [key: string]: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  }
  
  export const breakpoints: Breakpoints = {
    extraLarge: 1200,
    large: 992,
    medium: 768,
    small: 576,
  };