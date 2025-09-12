import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formRepository } from "../../repositories/formRepository";
import { checkEmptyUseCase } from "../../usecases/application/checkEmptyUseCase";
import { applyUseCase } from "../../usecases/application/applyUseCase";

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

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      createUnit: {},
      unit: {},
      applicant: {},
      address: {},
    },
    formType: "createUnit",
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
        createUnit: {},
        unit: {},
        applicant: {},
        address: {},
      };
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

    copyAddress: (state, action) => {
      const address = state.formData.address;

      switch (action.payload) {
        // case "personal":
        default:
          state.formData.address = {
            ...address,
            prev_region: address.region,
            prev_province: address.province,
            prev_city: address.city,
            prev_brgy: address.brgy,
            prev_purok: address.purok,
            prev_lot_num: address.lot_num,
          };
          break;
        case "parent":
          state.formData.address = {
            ...address,
            p_prev_region: address.p_region,
            p_prev_province: address.p_province,
            p_prev_city: address.p_city,
            p_prev_brgy: address.p_brgy,
            p_prev_purok: address.p_purok,
            p_prev_lot_num: address.p_lot_num,
          };
          break;
        case "spouse":
          state.formData.address = {
            ...address,
            sp_prev_region: address.sp_region,
            sp_prev_province: address.sp_province,
            sp_prev_city: address.sp_city,
            sp_prev_brgy: address.sp_brgy,
            sp_prev_purok: address.sp_purok,
            sp_prev_lot_num: address.sp_lot_num,
          };
          break;
      }
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
});

export const {
  changeColor,
  setType,
  resetInput,
  handleChange,
  handleQuantity,
  setColorIndex,
  initialForm,
  copyAddress,
  disableAddress,
  setDisable,
  draftForm,
  getDraft,
  formCheck,
  // goToStep,
} = formSlice.actions;
export default formSlice.reducer;
