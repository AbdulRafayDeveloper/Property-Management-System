import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: {},
		isLogggedIn: false
	},
	reducers: {
		setUserDataR(state, action) {
			state.data = action.payload;
			state.isLogggedIn = true
		}
	}
});

export const { setUserDataR } = userSlice.actions;
export default userSlice.reducer;
