import "./IsLoadingComponent.scss";
import Lottie from "react-lottie";
import PropTypes from "prop-types";
import isLoadingLottie from "@assets/Lotties/isLoadingLottie.json";
import { CONSTANTS } from "@constants/Constants";

/**
 * IsLoadingComponent
 *
 * A wrapper component that displays a loading animation while content is being loaded.
 * If `isLoading` is true, it shows a Lottie animation; otherwise, it renders the children.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - Determines whether to show the loading animation.
 * @param {React.ReactNode} [props.children] - The content to display when not loading.
 * @returns {JSX.Element} - Returns a loading animation or the provided children.
 */
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
