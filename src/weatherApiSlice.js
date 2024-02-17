import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWether = createAsyncThunk(
  "wetherApi/fetchWether",
  async ({ targetCity = "Riyadh" }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${targetCity},sa&APPID=bcf36eae960240db3dc2c573ba411286`
    );
    // handle success
    const responseTemp = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const responceIcon = response.data.weather[0].icon;

    return {
      number: responseTemp,
      min,
      max,
      description,
      icon: `https://openweathermap.org/img/wn/${responceIcon}@2x.png`,
    };
  }
);

const weatherApiSlice = createSlice({
  name: "wetherAPI",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },

  reducers: {
    changeResult: (state, action) => {
      state.result = "change";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWether.pending, (state, action) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(fetchWether.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("fulfilled");
        state.weather = action.payload;
      })
      .addCase(fetchWether.rejected, (state, action) => {
        console.log("rejected");
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
