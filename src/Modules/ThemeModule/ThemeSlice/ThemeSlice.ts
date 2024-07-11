import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {COLORS, FONTS} from '../Types/ThemeTypes';
import {DayTheme, NightTheme} from '../ThemeValues/ThemeValues';
import {RootState} from '../../../Store/Store';

export type ThemeState = {
  type: 'light' | 'dark';
  colors: COLORS;
  font: FONTS;
};

const initialState: ThemeState = {
  type: 'light',
  colors: DayTheme.colors,
  font: DayTheme.fonts,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.type = action.payload;
      state.font =
        action.payload === 'light' ? DayTheme.fonts : NightTheme.fonts;
      state.colors =
        action.payload === 'light' ? DayTheme.colors : NightTheme.colors;
    },
  },
});

export const {setTheme} = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.type;

export default themeSlice.reducer;
