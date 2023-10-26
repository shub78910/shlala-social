import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMenu: 'Feed',
};

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { setSelectedMenu } = miscSlice.actions;

export default miscSlice.reducer;
