import { useEffect } from "react";
import useStoreon from "storeon/react";

function useAuthState(user) {
  const { dispatch } = useStoreon("user");
  useEffect(() => {
    if (user) {
      const { admin } = user;
      dispatch("user/set_local_info", { authorized: true, admin });
    }
  }, []);
}

export default useAuthState;
