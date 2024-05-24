import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface UserState {
    userId: number,
    name: string,
    lastName: string,
}
const initialState: UserState = {
    userId: 0,
    name: '',
    lastName: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserInfo: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.name  = action.payload.name;
            state.lastName = action.payload.lastName;
        },
        logOut: (state) => {
            state.userId = 0;
            state.name = "";
            state.lastName = "";
            localStorage.removeItem('access_token');
        }
    },
})

// Action creators are generated for each case reducer function
export const { saveUserInfo, logOut } = userSlice.actions

export default userSlice.reducer