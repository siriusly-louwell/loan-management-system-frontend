import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AddressAPI from "../../api/AddressAPI";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (address, thunkAPI) => {
    try {
      switch (address.type) {
        default:
          return await AddressAPI.regions();
        case "provinces":
          return await AddressAPI.provinces(address.value);
        case "cities": //isahon nalang, gikapoy kog manual
          const cities = await AddressAPI.cities(address.value);
          const municipalities = await AddressAPI.municipalities(address.value);

          return [...cities, ...municipalities];
          // return await AddressAPI.cities(address.value);
        case "municipalities":
          return await AddressAPI.municipalities(address.value);
        case "barangays":
          return await AddressAPI.barangays(address.value);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    regions: [],
    provinces: [],
    cities: [],
    municipalities: [],
    barangays: [],
    addressLoading: false,
    addressError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ? Fetch address
      .addCase(fetchAddress.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.addressLoading = false;

        if (action.meta.arg.type === "regions") state.regions = action.payload;
        if (action.meta.arg.type === "cities") state.cities = action.payload;
        if (action.meta.arg.type === "provinces")
          state.provinces = action.payload;
        if (action.meta.arg.type === "municipalities")
          state.municipalities = action.payload;
        if (action.meta.arg.type === "barangays")
          state.barangays = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });
  },
});

export const { saveReport, getReportId } = addressSlice.actions;
export default addressSlice.reducer;
