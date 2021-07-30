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
  body: "'Source Sans Pro', sans-serif",
  heading: "'Poppins', sans-serif",
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "gray.900",
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
};

const components: ComponentDefaultProps = {
  Button: {},
  Input: {
    baseStyle: {},
    defaultProps: {
      focusBorderColor: "teal.400",
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: "teal.400",
    },
  },
};

const shadows = {
  outline: `0 0 0 3px ${ChakraTheme.colors.teal[500]}CC`,
};

export const theme = extendTheme({ config, styles, colors, fonts, breakpoints, components, shadows });
