import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDetail } from "../api/pointAPI.ts";
import { IPoint } from "../types/point";

// 초기 상태 타입 정의
interface PointState {
    point: IPoint | null;
    loading: boolean;
    error: string | null;
}

// 초기 상태
const initialState: PointState = {
    point: null,
    loading: false,
    error: null,
};

// 비동기 Thunk 액션
export const fetchPointAsync = createAsyncThunk(
    "points/fetchPoint",
    async (customerID: number, { rejectWithValue }) => {
        try {
            const pointData = await getDetail(customerID);
            return pointData;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch points");
        }
    }
);

// Slice 생성
const pointSlice = createSlice({
    name: "points",
    initialState,
    reducers: {
        // 필요하면 추가 로직 작성
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPointAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.point = null;
            })
            .addCase(fetchPointAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.point = action.payload;
            })
            .addCase(fetchPointAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default pointSlice.reducer;
