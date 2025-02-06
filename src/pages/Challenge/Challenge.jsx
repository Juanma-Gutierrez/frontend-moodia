import "./Challenge.scss";
import { ChallengeComponent } from "@components/ChallengeComponent/ChallengeComponent";
import { useEffect, useState } from "react";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";

export default function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [challenge, setChallenge] = useState();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await apiGenericRequest("challenge/get", null, HttpMethod.POST, null);
        if (response.success) {
          setChallenges(response.data.data);
        } else {
          console.error("Error al cargar los retos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    if (challenges.length > 0) {
      const index = Math.floor(Math.random() * challenges.length);
      setChallenge(challenges[index]);
    }
  }, [challenges]);

  return <div className="challenge-container">{challenge && <ChallengeComponent challenge={challenge} />}</div>;
}
