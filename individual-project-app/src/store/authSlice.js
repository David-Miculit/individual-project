import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../config/supabase";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (authError) {
        return rejectWithValue(authError.message);
      }

      const { data: profileData, error: profileError } = await supabase.from("profiles").select("is_admin").eq("id", authData.user.id).single();
      if (profileError) {
        throw profileError;
      }

      return {
        user: authData.user,
        isAdmin: profileData.is_admin,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      if (error) throw error;

      let isAdmin = false;
      if (data.user && data.session) {
        const { data: profileData, error: profileError } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).single();
        if (!profileError && profileData) {
          isAdmin = !!profileData.is_admin;
        }
      }

      return {
        user: data.user,
        isAdmin,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAdmin: false, status: "idle", error: null },
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.status = action.payload.user ? "succeeded": "idle"
    },
    clearAuthFlags: (state) => {
      state.user = null
      state.isAdmin = false
      state.status = "idle"
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user ?? null;
        state.isAdmin = action.payload.isAdmin ?? false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAdmin = false;
        state.status = "idle";
      });
  },
});

export const { setSession, clearAuthFlags } = authSlice.actions;
export default authSlice.reducer;
