import PropTypes from "prop-types";
import Lottie from "react-lottie";
import isLoadingLottie from "../../assets/lotties/isLoadingLottie.json";
import "./IsLoadingComponent.scss";
import { CONSTANTS } from "../../config/config";

export const IsLoading = ({ isLoading, children }) => {
  if (isLoading) {
    const defaultOptions = {
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
          options={defaultOptions}
          className="lottie"
          height={CONSTANTS.lottie.height}
          width={CONSTANTS.lottie.width}
        />
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }
  return <>{children}</>;
};

IsLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};