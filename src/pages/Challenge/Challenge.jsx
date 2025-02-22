import "./Challenge.scss";
import ChallengeAcceptedLottie from "@assets/lotties/ChallengeAcceptedLottie.json";
import Lottie from "react-lottie";
import ModalModel from "@components/ModalComponent/ModalModel";
import { CONSTANTS } from "@constants/Constants";
import { ChallengeComponent } from "@components/ChallengeComponent/ChallengeComponent";
import { HttpMethod } from "@services/ApiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { apiGenericRequest } from "@services/ApiService/ApiGenericRequest";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";

/**
 * Challenge Component
 * @returns {JSX.Element} - Returns the Challenge component with the functionality to accept and change challenges.
 */
export default function Challenge() {
  const [challenge, setChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [changeChallenge, setChangeChallenge] = useState(false);
  const [isChallengeAccepted, setIsChallengeAcepted] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setLogoIsLoading } = useEnvironmentContext();

  /**
   * Modal Model
   * @returns {Object} - The modal configuration object used for the challenge acceptance confirmation.
   */
  const modalModel = new ModalModel({
    title: "Aceptar el reto",
    message: "¿Seguro que te comprometes a realizar este reto?",
    button1: "¡Me atrevo!",
    button2: "Por ahora no",
    type: "confirm",
  });

  /**
   * Lottie Animation Options
   * @returns {Object} - The options configuration for the Lottie animation.
   */
  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: ChallengeAcceptedLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  /**
   * Fetch Challenges from API
   * @returns {void} - Fetches challenges from the server and updates the state with the retrieved challenges.
   */
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

  /**
   * Set Random Challenge from List
   * @returns {void} - Sets a random challenge when the challenges are loaded or the challenge is changed.
   */
  useEffect(() => {
    if (challenges.length > 0) {
      const index = Math.floor(Math.random() * challenges.length);
      setChallenge(challenges[index]);
    }
  }, [changeChallenge, challenges]);

  /**
   * Handle Accept Challenge
   * @returns {void} - Shows the confirmation modal for accepting the challenge.
   */
  const handleAcceptChallenge = () => {
    setIsModalVisible(true);
  };

  /**
   * Handle Change Challenge
   * @returns {void} - Toggles the state for changing the challenge.
   */
  const handleChangeChallenge = () => {
    setChangeChallenge(!changeChallenge);
  };

  /**
   * Handle Confirm Challenge Acceptance
   * @returns {void} - Confirms the challenge acceptance and shows a snackbar with the message.
   */
  const handleConfirmChallenge = () => {
    handleCloseModal();
    setIsSnackbarVisible(true);
    setIsChallengeAcepted(true);
    setTimeout(() => {
      setIsChallengeAcepted(false);
    }, 3000);
  };

  /**
   * Handle Close Modal
   * @returns {void} - Closes the challenge acceptance modal.
   */
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  /**
   * Handle Snackbar Click
   * @returns {void} - Hides the snackbar when clicked.
   */
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
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
      )}
      {isSnackbarVisible && <SnackbarComponent message="¡¡Reto aceptado!!" type="info" onClick={handleClickSnackbar} />}
    </div>
  );
}
