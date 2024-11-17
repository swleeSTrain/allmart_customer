import {AppDispatch, RootState} from "../store.ts";
import {createAsyncThunk, Thunkapi}

export interface ICustomer{
    name: string;
    phoneNumber: string;
    loyaltyPoints: number;
    social: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface ISignUpParam{
    phoneNumber: string;
}

export interface ICustomAsyncThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
    extra: {
        apiBaseUrl: string;
    };
    rejectValue: {
        message: string;
        statusCode: number;
    };



}

interface CustomThunkApiConfig extends ThunkApiConfig {
    rejectValue: string; // 오류 메시지의 타입
    serializedErrorType: Error; // 직렬화 가능한 오류 타입
}