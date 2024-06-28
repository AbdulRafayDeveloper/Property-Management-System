import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    rooms: [],
    roomId: null,
  },
  reducers: {
    setRoomData(state, action) {
      state.rooms = action.payload;
    },
    setReduxRoomId(state, action) {
      state.roomId = action.payload;
    },
  },
  

});

export const { setRoomData, setReduxRoomId} = chatSlice.actions;
export default chatSlice.reducer;
