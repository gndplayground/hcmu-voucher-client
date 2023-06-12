import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { lighten, darken } from "polished";
export const buttonTheme = defineStyleConfig({
  variants: {
    primary: {
      bg: "primary",
      color: "textOnPrimary",
    },
  },
});

const primaryColor = "#CB0B2E";

const colors = {
  100: lighten(0.6, primaryColor),
  200: lighten(0.4, primaryColor),
  300: lighten(0.2, primaryColor),
  400: lighten(0.1, primaryColor),
  500: primaryColor,
  600: darken(0.1, primaryColor),
  700: darken(0.2, primaryColor),
  800: darken(0.4, primaryColor),
};

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        fontSize: "1rem",
        color: "text",
        backgroundColor: "#fafafa",
      },
    },
  },
  sizes: {
    container: {
      xl: 1400,
    },
  },
  colors: {
    text: "#333",
    error: "#b94a48",
    primary: "#CB0B2E",
    brand: colors,
    textOnPrimary: "#fff",
    bg: "#fafafa",
    border: "#AFAFAF",
    tagBg: "#ECF4FD",
    tagText: "#497CB2",
  },
  textStyles: {
    text: {
      fontWeight: "400",
      fontSize: {
        base: "1rem",
      },
      lineHeight: {
        base: "1.3rem",
      },
    },
  },
  components: { Button: buttonTheme },
});

export { theme };
