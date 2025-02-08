import "./Challenge.scss";
import ChallengeAcceptedLottie from "@assets/lotties/ChallengeAcceptedLottie.json";
import Lottie from "react-lottie";
import ModalModel from "@components/ModalComponent/ModalModel";
import { CONSTANTS } from "@constants/Constants";
import { ChallengeComponent } from "@components/ChallengeComponent/ChallengeComponent";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export default function Challenge() {
  const [challenge, setChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [changeChallenge, setChangeChallenge] = useState(false);
  const [isChallengeAccepted, setIsChallengeAcepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setLogoIsLoading } = useEnvironmentContext();

  const modalModel = new ModalModel({
    title: "Aceptar el reto",
    message: "¿Seguro que te comprometes a realizar este reto?",
    button1: "¡Me atrevo!",
    button2: "Por ahora no",
    type: "confirm",
  });

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: ChallengeAcceptedLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLogoIsLoading(true);
        const response = await apiGenericRequest("challenge/get", null, HttpMethod.POST, null);
        if (response.success) {
          setChallenges(response.data.data);
        } else {
          console.error("Error loading challenges");
        }
        setLogoIsLoading(false);
      } catch (error) {
        console.error("Error in request:", error);
      }
    };
    fetchChallenges();
  }, []);

  useEffect(() => {
    if (challenges.length > 0) {
      const index = Math.floor(Math.random() * challenges.length);
      setChallenge(challenges[index]);
    }
  }, [changeChallenge, challenges]);

  // ChallengeComponent
  const handleAcceptChallenge = () => {
    setIsModalVisible(true);
  };

  const handleChangeChallenge = () => {
    setChangeChallenge(!changeChallenge);
  };

  // Modal
  const handleConfirmChallenge = () => {
    console.log("entra", isChallengeAccepted);
    handleCloseModal();
    setIsChallengeAcepted(true);
    setTimeout(() => {
      setIsChallengeAcepted(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="challenge-container">
      {challenge && (
        <ChallengeComponent
          challenge={challenge}
          onAccept={handleAcceptChallenge}
          onChangeChallenge={handleChangeChallenge}
        />
      )}
      <div className="lottie">
        {isChallengeAccepted && (
          <Lottie options={lottieOptions} height={CONSTANTS.LOTTIE.LARGE.HEIGHT} width={CONSTANTS.LOTTIE.LARGE.WIDTH} />
        )}
      </div>
      {isModalVisible && (
        <ModalComponent modalModel={modalModel} onConfirm={handleConfirmChallenge} onCancel={handleCloseModal} />
      )}{" "}
    </div>
  );
}
