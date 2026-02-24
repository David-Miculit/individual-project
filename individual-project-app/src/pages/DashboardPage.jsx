import { useDispatch, useSelector } from "react-redux";
import { fetchSessions } from "../store/f1DataSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.f1Data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSessions());
    }
  }, [status, dispatch]);

  return(
    <div>
      {status === "loading" ? <Spinner /> : (
        <div>Dashboard page TODO</div>
      )}
    </div>
  )
}