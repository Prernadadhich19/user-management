import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userSlice';

interface AnalyticsState {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  inactiveUsers: 0,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<User[]>) => {
      const totalUsers = action.payload.length;
      const activeUsers = action.payload.filter(user => user.status === 'active').length;
      const inactiveUsers = totalUsers - activeUsers;

      state.totalUsers = totalUsers;
      state.activeUsers = activeUsers;
      state.inactiveUsers = inactiveUsers;
    },
  },
});

export const { setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;

export const loadAnalytics = (users: User[]) => (dispatch: any) => {
  dispatch(setAnalytics(users));
};
