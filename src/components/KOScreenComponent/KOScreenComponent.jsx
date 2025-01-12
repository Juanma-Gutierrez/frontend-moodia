import "./KOScreenComponent.scss";
import Lottie from "react-lottie";
import PropTypes from "prop-types";
import koScreenLottie from "../../assets/lotties/koScreenLottie.json";
import { CONSTANTS } from "../../constants/Constants";

export const KOScreen = () => {
  const defaultOptions = {
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
        options={defaultOptions}
        className="lottie"
        height={CONSTANTS.lottie_large.height}
        width={CONSTANTS.lottie_large.width}
      />
      <p className="loading-text">vaya, parece que hay algún problema</p>
    </div>
  );
};

KOScreen.propTypes = {
  koScreen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
