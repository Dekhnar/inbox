import { roboto } from "@theme-ui/presets";

const theme = {
  ...roboto,
  colors: {
    ...roboto.colors,
    primary: "#1432BE",
    secondary: "#1E91FF",
    background: "#F9F9F9",
    gray: "#D8D8D8",
  },
  containers: {
    navbar: {
      height: 60,
      px: "8px",
      backgroundColor: "white",
      boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "2px",
    },
    page: {
      backgroundColor: "background",
    },
    message: {
      default: {
        height: "110px",
        width: "375px",
        paddingX: 10,
        paddingY: 22,
        backgroundColor: "white",
      },
      read: {
        height: "110px",
        width: "375px",
        paddingX: 10,
        paddingY: 22,
        backgroundColor: "background",
      },
    },
    counter: {
      enabled: {
        backgroundColor: "primary",
        width: "61px",
        height: "31px",
        borderRadius: "8px",
      },
      disabled: {
        backgroundColor: "#757575",
        width: "61px",
        height: "31px",
        borderRadius: "8px",
      },
    },
  },
  icons: {
    enabled: { color: "primary" },
    disabled: { color: "gray" },
  },
  styles: {
    ...roboto.styles,
  },
};

export default theme;
