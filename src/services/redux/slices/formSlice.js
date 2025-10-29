import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formRepository } from "../../repositories/formRepository";
import { checkEmptyUseCase } from "../../usecases/application/checkEmptyUseCase";
import { applyUseCase } from "../../usecases/application/applyUseCase";
import AddressAPI from "../../api/AddressAPI";
import { applyRepository } from "../../repositories/applyRepository";

export const applyLoan = createAsyncThunk(
  "form/applyLoan",
  async (form, thunkAPI) => {
    try {
      return await applyUseCase(form);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const copyAddress = createAsyncThunk(
  "form/copyAddress",
  async (data, thunkAPI) => {
    try {
      const region = await AddressAPI.region(data.region);
      const province = await AddressAPI.province(data.province);
      const city = await AddressAPI.city(data.city);
      const barangay = await AddressAPI.barangay(data.barangay);

      return {
        region: region.name,
        province: province.name,
        city: city.name,
        barangay: barangay.name,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "form/fetchUserData",
  async (id, thunkAPI) => {
    try {
      return await applyRepository.fetchApplication({ id: id, by: "user_id" });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      createUnit: {},
      editUnit: {},
      unitStock: {},
      unit: {},
      applicant: {},
      address: {},
      createUser: { password: "password", status: "active" },
    },
    formType: "createUnit",
    formLoading: true,
    addressLoading: true,
    colors: [],
    colorIndex: null,
    error: null,
    disabled: null,
    selectDisable: {},
    pageComplete: null,
    isChecked: null,
  },
  reducers: {
    draftForm: (state) => {
      formRepository.saveForm(state.formData);
    },

    getDraft: (state) => {
      state.formData = formRepository.getForm();
    },

    setColorIndex: (state, action) => {
      state.colorIndex = action.payload;
    },

    setColors: (state, action) => {
      state.colors = action.payload;
    },

    removeColor: (state, action) => {
      const index = action.payload;

      if (state.colors[index]) {
        const current = state.colors.filter((_, i) => i !== index);

        state.colors = current;
      }
    },

    changeColor: (state, action) => {
      const updatedColors = [...state.colors];

      if (updatedColors[state.colorIndex] === action.payload)
        updatedColors[state.colorIndex] = null;
      else updatedColors[state.colorIndex] = action.payload;

      state.colors = updatedColors;
    },

    setType: (state, action) => {
      state.formType = action.payload;
    },

    resetInput: (state) => {
      state.formData = {
        createUnit: { quantity: [1], unit_type: "new" },
        editUnit: {},
        unitStock: {},
        unit: {},
        applicant: {},
        address: {},
        createUser: { password: "password", status: "active" },
      };
      state.pageComplete = null;
      state.colors = [];
      formRepository.clearForm();
    },

    handleChange: (state, action) => {
      const data = action.payload;

      state.formData[data.formType] = {
        ...state.formData[data.formType],
        [data.name]: data.value,
      };
    },

    handleQuantity: (state, action) => {
      const quantity = state.formData[state.formType].quantity;
      const data = action.payload;
      let quantState;

      switch (data.type) {
        case "application":
          quantState = data.num;
          break;
        default:
          quantState = quantity || [];
          quantState[data.index] = Number(data.num);
      }

      state.formData[state.formType] = {
        ...state.formData[state.formType],
        quantity: quantState,
      };
    },

    initialForm: (state, action) => {
      state.formData[state.formType] = action.payload;
    },

    setDisable: (state, action) => {
      state.disabled = action.payload;
    },

    disableAddress: (state, action) => {
      const regions = [
        state.formData.address.region,
        state.formData.address.p_region,
        state.formData.address.sp_region,
      ];
      const props = ["personal", "parent", "spouse"];

      regions.forEach((region, i) => {
        state.selectDisable[props[i]] =
          region === undefined || region === "__EMPTY__" ? true : false;
      });
    },

    formCheck: (state, action) => {
      const index = action.payload;

      const applicant = checkEmptyUseCase(
        index,
        state.formData[state.formType]
      );
      const address = checkEmptyUseCase(
        index,
        state.formData.address,
        "address"
      );

      state.isChecked = Date.now();
      state.formData[state.formType] = applicant.form;
      state.formData.address = address.form;
      state.pageComplete =
        index !== 0 && index !== 2 && index !== 4
          ? !(applicant.hasEmpty || address.hasEmpty)
          : !applicant.hasEmpty;
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Application
      .addCase(applyLoan.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(applyLoan.fulfilled, (state, action) => {
        state.formLoading = false;
        state.unit = action.payload;
      })
      .addCase(applyLoan.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      // ? Fetch user application
      .addCase(fetchUserData.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.formLoading = false;
        const data = action.payload;

        state.formData.applicant = Object.fromEntries(
          Object.entries(data)
            .filter(
              ([key]) =>
                key !== "address" ||
                key !== "created_at" ||
                key !== "updated_at" ||
                key !== "address_id" ||
                key !== "ci_id"
            )
            .map(([key, value]) => [key, value === null ? "" : value])
        );
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.formLoading = false;
        state.loan = {};
        state.error = action.payload;
      })

      // ? Copy address
      .addCase(copyAddress.pending, (state) => {
        state.addressLoading = true;
        state.error = null;
      })
      .addCase(copyAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        const data = action.payload;
        const address = state.formData.address;

        switch (action.meta.arg.addressType) {
          default:
            state.formData.address = {
              ...address,
              prev_region: data.region,
              prev_province: data.province,
              prev_city: data.city,
              prev_brgy: data.barangay,
              prev_purok: address.purok,
              prev_lot_num: address.lot_num,
            };
            break;
          case "parent":
            state.formData.address = {
              ...address,
              p_prev_region: data.region,
              p_prev_province: data.province,
              p_prev_city: data.city,
              p_prev_brgy: data.barangay,
              p_prev_purok: address.p_purok,
              p_prev_lot_num: address.p_lot_num,
            };
            break;
          case "spouse":
            state.formData.address = {
              ...address,
              sp_prev_region: data.region,
              sp_prev_province: data.province,
              sp_prev_city: data.city,
              sp_prev_brgy: data.barangay,
              sp_prev_purok: address.sp_purok,
              sp_prev_lot_num: address.sp_lot_num,
            };
            break;
        }
      })
      .addCase(copyAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setColors,
  changeColor,
  removeColor,
  setType,
  resetInput,
  handleChange,
  handleQuantity,
  setColorIndex,
  initialForm,
  // copyAddress,
  disableAddress,
  setDisable,
  draftForm,
  getDraft,
  formCheck,
} = formSlice.actions;
export default formSlice.reducer;
