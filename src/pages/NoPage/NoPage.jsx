import "./NoPage.scss";
import Lottie from "react-lottie";
import SearchLottie from "@assets/lotties/SearchLottie.json";
import { CONSTANTS } from "@constants/Constants";

/**
 * Displays a "Page Not Found" message with a Lottie animation.
 * @returns {JSX.Element} - Returns a component displaying a message and a Lottie animation.
 */
export default function NoPage() {
  /**
   * Defines the Lottie animation options for the "SearchLottie".
   * @returns {Object} - Returns an object with Lottie animation settings.
   */
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: SearchLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="noPage-container">
      <h1>La página que buscas no existe</h1>
      <Lottie
        options={lottieOptions}
        className="lottie"
        height={CONSTANTS.LOTTIE.LARGE.HEIGHT}
        width={CONSTANTS.LOTTIE.LARGE.WIDTH}
      />
    </div>
  );
}
