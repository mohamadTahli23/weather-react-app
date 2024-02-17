import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

// REACT
import { useEffect, useState } from "react";
// MATERIEL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// REDUX Import
import { useDispatch, useSelector } from "react-redux";
import { changeResult } from "./weatherApiSlice";
import { fetchWether } from "./weatherApiSlice";

// EXTERNAL LIBRARY
import CloudIcon from "@mui/icons-material/Cloud";
import "./i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["IBM"],
  },
  breakpoints: {
    values: {
      sm: 650,
    },
  },
});

//let cancelAxios = null;

function App() {
  // REDUX
  const result = useSelector((state) => {
    return state.result;
  });

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });

  const temp = useSelector((state) => {
    return state.weather.weather;
  });
  const dispatch = useDispatch();

  // ========/ REDUX ========/ //

  const { t, i18n } = useTranslation();

  // =========== STATES ========== //

  const [dateAndTime, setDateAndTime] = useState("");

  const [locale, setLocale] = useState("ar");

  const directions = locale == "ar" ? "rtl" : "ltr";

  const [city, setCity] = useState("Riyadh");

  const handleChange = (event) => {
    const targetCity = event.target.value;
    dispatch(fetchWether({ targetCity }));
    setCity(targetCity);
  };

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
    // reducer
    dispatch(fetchWether({ city }));

    i18n.changeLanguage(locale);
  }, []);

  // ================== //
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
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
                    {t(city)}
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
                      {/* Loading  */}
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}

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

            {/* Translation AND SELECT CITY CONTAINER */}
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
              dir={directions}
            >
              <Button
                style={{ color: "white", height: "100%", margin: "0 5px" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale == "en" ? "Arabic" : "انجليزي"}
              </Button>

              {/* Select city */}
              <FormControl fullWidth>
                <InputLabel
                  style={{ color: "white" }}
                  id="demo-simple-select-label"
                >
                  {t("city")}
                </InputLabel>
                <Select
                  style={{ height: "50px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="city"
                  value={city}
                  onChange={handleChange}
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                >
                  <MenuItem value={"Riyadh"}>{t("Riyadh")}</MenuItem>
                  <MenuItem value={"Medina"}>{t("Medina")}</MenuItem>
                  <MenuItem value={"Jeddah"}>{t("Jeddah")}</MenuItem>
                  <MenuItem value={"Dammam"}>{t("Dammam")}</MenuItem>
                  <MenuItem value={"Tabuk"}>{t("Tabuk")}</MenuItem>
                </Select>
              </FormControl>
              {/* === Select city === */}
            </div>
            {/* === Translation AND SELECT CITY CONTAINER === */}
          </div>
          {/* === CONTENT CONTAINER === */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
