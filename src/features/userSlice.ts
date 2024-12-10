import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import userData from '../users.json';

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  region: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: userData as User[],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, deleteUser } = userSlice.actions;
export default userSlice.reducer;

export const loadUsers = () => (dispatch: any) => {
  dispatch(setUsers(userData as User[]));
};
