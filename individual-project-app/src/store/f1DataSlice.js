import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = 'https://api.openf1.org/v1'

const getFilters = () => {
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth()-3)
    const now = new Date()

    return {
        start: threeMonthsAgo.toISOString().split('T')[0],
        end: now.toISOString()
    }
}

export const fetchSessions = createAsyncThunk(
  'f1Data/fetchSessions', 
  async (_, rejectWithValue) => {
    const {start,end} = getFilters()
    try {
      const response = await fetch(`${API}/sessions?date_start>=${start}&date_start<=${end}`)

      if(!response.ok) {
        return rejectWithValue(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if(data && data.length!=0) {
        return data.sort((a,b) => new Date(b.date_start) - new Date(a.date_start))
      } else {
        return rejectWithValue(`No sessions data`)
      }
    } catch (err) {
      return rejectWithValue(err.message ?? "Network error - could not reach API")
    }
  }
)

const f1DataSlice = createSlice({
    name: 'f1Data', 
    initialState: { sessions: [], status: 'idle', error: null},
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessions.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.sessions = action.payload
            })
            .addCase(fetchSessions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default f1DataSlice.reducer