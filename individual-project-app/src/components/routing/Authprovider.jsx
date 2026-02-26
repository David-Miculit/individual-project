import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../config/supabase";
import { setSession, clearAuthFlags } from "../../store/authSlice";

export default function AuthProvider({children}) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const hydrateSession = async (session) => {
      if(!session?.user) {
        dispatch(clearAuthFlags())
        return
      }
      try {
        const {data: profileData, error} = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single()

        dispatch(
          setSession({
            user: session.user,
            isAdmin: !error && profileData ? profileData.is_admin : false
          })
        )
      } catch {
        dispatch(setSession({user: session.user, isAdmin:false}))
      }
    }

    supabase.auth.getSession().then(({data: {session}}) => {
      hydrateSession(session)
    })

    const {data: {subscription}} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        hydrateSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch])

  return children
}