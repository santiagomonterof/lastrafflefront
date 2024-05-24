import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";
import { logOut, saveUserInfo } from "../slices/userSlice";
import { AuthService } from "../services/AuthService";

const useUserInfo = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.user.name);
    const lastName = useAppSelector((state) => state.user.lastName);
    const userId = useAppSelector((state) => state.user.userId);

    const getUserInfo = () => {
        AuthService.getUserInfo().then((response) => {
            dispatch(saveUserInfo({
                userId: response.id, name: response.first_name, lastName: response.last_name}))
        });
    }

    const userLogOut = () => {
        dispatch(logOut());
    }

    useEffect(() => {
        if (name === '') {
            if (localStorage.getItem('access_token') === null) {
                if (window.location.pathname === Routes.AUTH.REGISTER) return;
                navigate(Routes.AUTH.LOGIN);
                return;
            } else {
                getUserInfo();
            }
        }
    }, [name])

    return {
        userId,
        name,
        lastName,
        getUserInfo,
        userLogOut
    }
}
export default useUserInfo;