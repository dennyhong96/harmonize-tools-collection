import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#431f85",
    },
    common: {
      blue: "#2462c7",
      lightPink: "#f9f2fc",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      // Heading
      fontFamily: "'Lora', sans-serif",
      fontSize: "2.375rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      // Card title
      fontFamily: "'Lora', sans-serif",
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#3f0458",
      marginBottom: "0.8rem",
    },
    h3: {
      // Navbar brand
      fontSize: "1.25rem",
      fontWeight: 700,
      // color: "#fff",
    },
    lead: {
      // Below heading
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    lead2: {
      // Above heading
      fontSize: "1.0625rem",
      fontWeight: 600,
      color: "#431f85",
    },
    body1: {
      // Card text
      fontSize: "0.9375rem",
      marginBottom: "0.8rem",
      fontWeight: 500,
    },
    body2: {
      // Footer text
      fontSize: "0.75rem",
      fontWeight: 500,
    },
    link1: {
      // Navbar link
      fontSize: "0.80rem",
      fontWeight: 600,
      textTransform: "uppercase",
      // color: "#fff",
    },
    link2: {
      // Menu link
      fontSize: "0.75rem",
      fontWeight: 600,
    },
    link3: {
      fontSize: "0.9375rem",
      fontWeight: 600,
      color: "#2462c7",
      textDecoration: "none",
    },
  },
});
