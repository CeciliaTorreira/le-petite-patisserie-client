import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { loadProfileService } from "../services/profile.services";

function Profile() {
  const { activeUser, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const userData = await loadProfileService();
      authenticateUser(userData);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>{activeUser.username}'s profile</h1>
      {activeUser.role === "user" && (
        <p>Testeando renderizaciones de admin/user</p>
      )}

      <section><button>Favourite Recipes</button></section>
    </div>
  );
}

export default Profile;
