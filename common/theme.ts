import { roboto } from "@theme-ui/presets";

const theme = {
  ...roboto,
  colors: {
    ...roboto.colors,
    primary: "#1432BE",
    secondary: "#1E91FF",
    background: "#F9F9F9",
    "black-400": "#333333",
    "gray-400": "#DADADA",
    gray: "#D8D8D8",
    "gray-700": "#777777",
    "gray-800": "#757575",
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
        minWidth: "375px",
        paddingX: 10,
        paddingY: 22,
        backgroundColor: "white",
      },
      read: {
        height: "110px",
        minWidth: "375px",
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
        backgroundColor: "gray-800",
        width: "61px",
        height: "31px",
        borderRadius: "8px",
      },
    },
  },
  icons: {
    enabled: { color: "primary" },
    disabled: { color: "gray-400" },
  },
  styles: {
    ...roboto.styles,
    p: {
      ...roboto.styles.p,
      fontSize: '14px',
    }
  },
  text: {
    headline: {
      ...roboto.styles.h6,
      fontSize: '18px',
    },
    subtitle: {
      ...roboto.styles.p,
      fontSize: '16px',
    },
    bodyText1: {
      ...roboto.styles.p,
      fontSize: '16px',
    },
    bodyText2: {
      ...roboto.styles.p,
      fontSize: '14px',
    }
  }
};

export default theme;
