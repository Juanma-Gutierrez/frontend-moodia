import "./IsLoadingComponent.scss";
import Lottie from "react-lottie";
import PropTypes from "prop-types";
import isLoadingLottie from "../../assets/lotties/isLoadingLottie.json";
import { CONSTANTS } from "../../constants/constants";

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
          height={CONSTANTS.lottie_medium.height}
          width={CONSTANTS.lottie_medium.width}
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
