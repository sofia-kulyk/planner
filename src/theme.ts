// theme.ts
import { createTheme } from "@mui/material/styles";
import { grey, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: green[700], // Customize your primary color
    },
    secondary: {
      main: grey[500], // Customize your secondary color
    },
    // You can add more customizations here
  },
});

export default theme;
