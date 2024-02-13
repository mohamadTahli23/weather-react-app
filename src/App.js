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
import "./i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
  breakpoints: {
    values: {
      sm: 650,
    },
  },
});

let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();

  // =========== STATES ========== //

  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  const [locale, setLocale] = useState("ar");

  const directions = locale == "ar" ? "rtl" : "ltr";

  // =========== EVENT HANDLER ========== //

  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }

    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Medina,sa&APPID=bcf36eae960240db3dc2c573ba411286",
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
              dir={directions}
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
                  dir={directions}
                >
                  <Typography
                    style={{ marginRight: "20px", fontWeight: "600" }}
                    variant="h2"
                  >
                    {t("Medina")}
                  </Typography>
                  <Typography style={{ marginRight: "20px" }} variant="h5">
                    {dateAndTime}
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
                      {t(temp.description)}
                    </Typography>
                    {/* MAI & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <span style={{ margin: "0 5px" }}>|</span>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
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
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale == "en" ? "Arabic" : "انجليزي"}
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
