import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

// REACT
import { useEffect, useState } from "react";
// MATERIEL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// EXTERNAL LIBRARY
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    axios
      .get("/user?ID=12345")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba( 0 , 0 , 0 , 0.05)",
              }}
              dir="rtl"
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir="rtl"
                >
                  <Typography
                    style={{ marginRight: "20px", fontWeight: "600" }}
                    variant="h2"
                  >
                    الرياض
                  </Typography>
                  <Typography style={{ marginRight: "20px" }} variant="h5">
                    الإثنين 10/08/2024
                  </Typography>
                </div>
                {/* === CITY & TIME === */}

                <hr />
                {/* CONTAINER OF DEGREE & CLOUD ICON */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGREE & DESCRIPTIONS */}
                  <div>
                    {/* TEMP */}
                    <div>
                      <Typography
                        style={{ textAlign: "right" }}
                        variant="h1"
                        gutterBottom
                      >
                        38
                      </Typography>
                      {/* TODO: TEMP IMAGE */}
                    </div>
                    {/* === TEMP === */}

                    <Typography variant="h6" gutterBottom>
                      broken cloud
                    </Typography>
                    {/* MAI & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى: 34</h5>
                      <span style={{ margin: "0 5px" }}>|</span>
                      <h5>الكبرى: 40</h5>
                    </div>
                  </div>
                  {/* === DEGREE & DESCRIPTIONS === */}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* === CONTAINER OF DEGREE & CLOUD ICON === */}
              </div>
              {/* === CONTENT === */}
            </div>
            {/* === CARD === */}

            {/* TRANSITIONS CONTAINER */}
            <div
              style={{ width: "100%", textAlign: "left", marginTop: "20px" }}
            >
              <Button style={{ color: "white" }} variant="text">
                إنجليزي
              </Button>
            </div>
            {/* === TRANSITIONS CONTAINER === */}
          </div>
          {/* === CONTENT CONTAINER === */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
