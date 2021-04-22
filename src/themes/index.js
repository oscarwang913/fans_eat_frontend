import { createMuiTheme } from "@material-ui/core/styles";

const baseTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ff9100",
      light: "#ffc246",
      dark: "#c56200",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#cccccc",
      contrastText: "#2f2f2f",
    },
    background: {
      default: "#FAFAFA",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Pacifico", "sans-serif"],
  },
});

export default baseTheme;
