import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "dark",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        lightTheme: (state) => {
            state.theme = "light";
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        },
        darkTheme: (state) => {
            state.theme = "dark";
            localStorage.removeItem("theme");
            document.documentElement.classList.add("dark");
        },
    },
});

export const { lightTheme, darkTheme } = themeSlice.actions;
export default themeSlice.reducer;
