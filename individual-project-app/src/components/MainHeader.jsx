import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

export default function MainHeader() {
  const { isAdmin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Contact", path: "/contact" },
  ];

  if (isAdmin) {
    navItems.pop()
    navItems.push({ label: "Admin Panel", path: "/admin" });
  }

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-900 tracking-widest">
      <NavLink to="/">
        <h2 className="text-2xl font-bold italic uppercase hover:text-f1red tracking-tightest">
          F1 HUB
        </h2>
      </NavLink>

      <nav className="flex gap-6 items-center max-[600px]:hidden group">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `relative cursor-pointer text-sm uppercase font-bold transition-all duration-300 ease-out
              group-hover:opacity-50 group-hover:scale-100
              hover:!opacity-100 hover:!scale-105

              after:content-['']
              after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-white
              after:transition-all after:duration-300
              ${isActive ? "after:w-full opacity-100" : "after:w-0"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {!user ? (
        <NavLink to="login" className="text-xs uppercase font-bold transition px-4 py-2 border border-zinc-900 rounded hover:text-f1red hover:border-f1red">
          Login
        </NavLink>
      ) : (
        <button
          onClick={handleLogout}
          className="text-xs uppercase font-bold  transition px-4 py-2  border border-zinc-900 rounded hover:text-f1red hover:border-f1red"
        >
          Logout
        </button>
      )}
    </header>
  );
}
