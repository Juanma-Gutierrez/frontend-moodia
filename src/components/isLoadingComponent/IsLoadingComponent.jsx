import "./IsLoadingComponent.scss";
import Lottie from "react-lottie";
import PropTypes from "prop-types";
import isLoadingLottie from "@assets/lotties/isLoadingLottie.json";
import { CONSTANTS } from "@constants/Constants";

export const IsLoadingComponent = ({ isLoading = false, children }) => {
  if (isLoading) {
    const lottieOptions = {
      loop: true,
      autoplay: true,
      animationData: isLoadingLottie,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="overlay">
        <Lottie
          options={lottieOptions}
          className="lottie"
          height={CONSTANTS.LOTTIE.MEDIUM.HEIGHT}
          width={CONSTANTS.LOTTIE.MEDIUM.WIDTH}
        />
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }
  return <>{children}</>;
};

IsLoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
};
