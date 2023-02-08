import React from "react";
import { auth, db } from "../db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DialogLoader from "../components/DialogLoader";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import ProfileCard from "./Dashboard/ProfileCard";
const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  if (loading) return <DialogLoader />;
  if (error)
    return (
      <ErrorMessage
        errorMessage="Възникна проблем. Моля опитайте се да се влезете отново."
        executable={() => {
          navigate("/");
        }}
      />
    );
  if (!user) {
    navigate("/");
  }

  if (user) {
    getData();
  }

  return (
    <div>
      <ProfileCard data={user} />
      <button
        onClick={() =>
          signOut(auth)
            .then(() => navigate("/"))
            .catch((error: any) => (
              <ErrorMessage errorMessage="Възникна проблем. Моля опитайте отново" />
            ))
        }
      >
        излез
      </button>
    </div>
  );
};

export default Dashboard;
