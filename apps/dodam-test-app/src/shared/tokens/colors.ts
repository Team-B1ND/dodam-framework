export interface ColorTokens {
  brand: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    placeholder: string;
    disabled: string;
    inverse: string;
  };
  background: {
    default: string;
    surface: string;
  };
  border: {
    normal: string;
    strong: string;
    subtle: string;
    disabled: string;
  };
  fill: {
    primary: string;
    secondary: string;
    hover: string;
    disabled: string;
  };
  status: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  overlay: {
    dim: string;
  };
  static: {
    white: string;
    black: string;
  };
}

export const lightColors: ColorTokens = {
  brand: {
    primary: "#0083F0",
    secondary: "#0083f0a6",
  },
  text: {
    primary: "#0F0F10",
    secondary: "#383A3B",
    tertiary: "#5D5F60",
    placeholder: "#747678",
    disabled: "#E6E6E7",
    inverse: "#F5F5F5",
  },
  background: {
    default: "#F5F5F5",
    surface: "#FFFFFF",
  },
  border: {
    normal: "#DCDDDE",
    strong: "#C4C5C6",
    subtle: "#E6E6E7",
    disabled: "#E6E6E7",
  },
  fill: {
    primary: "#F5F5F5",
    secondary: "#DCDDDE",
    hover: "#E0E1E2",
    disabled: "#f5f5f580",
  },
  status: {
    success: "#00BF40",
    error: "#FF4242",
    warning: "#FFC800",
    info: "#0083F0",
  },
  overlay: {
    dim: "#00000033",
  },
  static: {
    white: "#FFFFFF",
    black: "#121212",
  },
};

export const darkColors: ColorTokens = {
  brand: {
    primary: "#0083F0",
    secondary: "#0083f0a6",
  },
  text: {
    primary: "#F5F5F5",
    secondary: "#DCDDDE",
    tertiary: "#C4C5C6",
    placeholder: "#9B9D9F",
    disabled: "#48494A",
    inverse: "#0F0F01",
  },
  background: {
    default: "#191A1A",
    surface: "#232424",
  },
  border: {
    normal: "#48494A",
    strong: "#747678",
    subtle: "#383A3B",
    disabled: "#383A3B",
  },
  fill: {
    primary: "#2A2B2C",
    secondary: "#383A3B",
    hover: "#323435",
    disabled: "#2a2b2c80",
  },
  status: {
    success: "#00BF40",
    error: "#FF4242",
    warning: "#FFC800",
    info: "#0083F0",
  },
  overlay: {
    dim: "#00000033",
  },
  static: {
    white: "#FFFFFF",
    black: "#121212",
  },
};