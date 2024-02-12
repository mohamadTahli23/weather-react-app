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

let cancelAxios = null;

function App() {
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Riyadh,sa&APPID=bcf36eae960240db3dc2c573ba411286",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responceIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          min,
          max,
          description,
          icon: `https://openweathermap.org/img/wn/${responceIcon}@2x.png`,
        });
        console.log(responceIcon);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        style={{ textAlign: "right" }}
                        variant="h1"
                        gutterBottom
                      >
                        {temp.number}
                      </Typography>
                      <img alt="" src={temp.icon} />
                    </div>
                    {/* === TEMP === */}

                    <Typography variant="h6" gutterBottom>
                      {temp.description}
                    </Typography>
                    {/* MAI & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى: {temp.min}</h5>
                      <span style={{ margin: "0 5px" }}>|</span>
                      <h5>الكبرى: {temp.max}</h5>
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
