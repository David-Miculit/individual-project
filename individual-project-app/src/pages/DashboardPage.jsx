import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSessions } from "../store/f1DataSlice";
import { getState, saveState } from "../scripts/storage";

import Spinner from "../components/Spinner";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SessionsList from "../components/dashboard/SessionsList";

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { sessions, status } = useSelector((state) => state.f1Data)

  const [filterType, setFilterType] = useState(() => getState("dashboardFilter", "All"))
  const [sortOrder, setSortOrder] = useState(() => getState("dashboardSort", "desc"))

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSessions())
    }
  }, [status, dispatch])

  const handleFilterChange = (type) => {
    setFilterType(type)
    saveState("dashboardFilter", type)
  }

  const handleSortToggle = () => {
    const newSort = sortOrder === "desc" ? "asc" : "desc"
    setSortOrder(newSort)
    saveState("dashboardSort", newSort)
  }

  const groupedByWeekend = useMemo(() => {
    if (!Array.isArray(sessions) || sessions.length === 0) {
      return []
    }
    
    const grouped = sessions.reduce((accumulator, session) => {
      const key = session.meeting_key
      if (!accumulator[key]) {
        accumulator[key] = {
          id: key,
          circuitName: session.circuit_short_name,
          location: session.location,
          sessions: [],
        };
      }
      accumulator[key].sessions.push(session)
      return accumulator
    }, {})

    const result = Object.values(grouped)
    
    result.sort((a, b) => {
      const dateA = new Date(a.sessions?.[0]?.date_start || 0)
      const dateB = new Date(b.sessions?.[0]?.date_start || 0)
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })
    return result
  }, [sessions, sortOrder])

  if (status === "loading") {
    return <Spinner />
  }
  if (status === "failed") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center">
          <p className="text-f1red text-lg font-bold uppercase">Failed to load sessions</p>
          <p className="text-zinc-500 text-sm">{"An unexpected error occurred. Please try again."}</p>
          <button
            onClick={() => dispatch(fetchSessions())}
            className="mt-2 px-6 py-2 text-xs font-bold uppercase border border-zinc-700 rounded hover:bg-zinc-800 transition"
          >
            Retry
          </button>
        </div>
      </div>      
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      <DashboardHeader filterType={filterType} sortOrder={sortOrder} onSortToggle={handleSortToggle} onFilterChange={handleFilterChange}/>
      <SessionsList groupedByWeekend={groupedByWeekend} filterType={filterType} />
    </div>
  );
}