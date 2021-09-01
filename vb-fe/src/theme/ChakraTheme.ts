import { extendTheme, ThemeConfig, theme as ChakraTheme, ComponentDefaultProps } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const fonts = {
  ...ChakraTheme.fonts,
  body: "'Urbanist', sans-serif",
  heading: "'Poppins', sans-serif",
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "primaryDark",
    },
  },
};

const colors = {
  gray: {
    900: "#080808",
    800: "#1a1a1a",
    700: "#2a2a2a",
    600: "#3b3b3b",
    500: "#4d4d4d",
    400: "#5d5d5d",
    300: "#6e6e6e",
    200: "#808080",
    100: "#909090",
  },
  primary: {
    ...ChakraTheme.colors.teal,
  },
  primaryDark: "#080808",
  dark: "#2a2a2a",
};

const components: ComponentDefaultProps = {
  Button: {},
  Input: {
    baseStyle: {},
    defaultProps: {
      focusBorderColor: "primary.500",
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: "primary.400",
    },
  },
  Link: {
    variants: {
      primary: () => ({
        color: "white",
        _hover: {
          color: "white",
        },
      }),
      secondary: () => ({
        color: "gray.200",
        _hover: {
          color: "gray.50",
        },
      }),
    },
    defaultProps: {
      variant: "primary",
    },
  },
  Badge: {
    baseStyle: {
      textTransform: "none",
    },
  },
  Avatar: {
    variants: {
      square: () => {
        return {
          borderRadius: 0,
        };
      },
    },
  },
};

const shadows = {
  outline: "0 0 0 3px #49D9C6CC",
};

export const theme = extendTheme({ config, styles, colors, fonts, breakpoints, components, shadows });
