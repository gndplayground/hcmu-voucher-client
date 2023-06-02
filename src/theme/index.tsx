import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  variants: {
    primary: {
      bg: "primary",
      color: "textOnPrimary",
    },
  },
});

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
