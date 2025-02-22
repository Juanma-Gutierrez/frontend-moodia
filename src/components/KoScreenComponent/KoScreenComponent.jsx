import "./KoScreenComponent.scss";
import Lottie from "react-lottie";
import PropTypes from "prop-types";
import koScreenLottie from "@assets/lotties/KoScreenLottie.json";
import { CONSTANTS } from "@constants/Constants";

/**
 * KOScreen
 *
 * A full-screen overlay component that displays an error animation when an issue occurs.
 * It uses a Lottie animation to visually indicate a problem.
 *
 * @returns {JSX.Element} - Returns an overlay with an error animation and message.
 */
export const KOScreen = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: koScreenLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="overlay">
      <Lottie
        options={lottieOptions}
        className="lottie"
        height={CONSTANTS.LOTTIE.LARGE.HEIGHT}
        width={CONSTANTS.LOTTIE.LARGE.WIDTH}
      />
      <p className="loading-text">vaya, parece que hay algún problema</p>
    </div>
  );
};

KOScreen.propTypes = {
  koScreen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
