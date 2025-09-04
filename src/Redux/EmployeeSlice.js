import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk(
  
  'employees/fetchEmployees',
  async () => {
    const response = await axios.get('http://localhost:8080/api/employees');
    return response.data;
  }
);

const EmployeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    editEmployee: (state, action) => {
      const idx = state.list.findIndex(emp => emp.empId === action.payload.empId);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(emp => emp.empId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addEmployee, editEmployee, deleteEmployee } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;