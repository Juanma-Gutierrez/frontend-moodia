import "./NewPostComponent.scss";
import PropTypes from "prop-types";
import { NewPostCardComponent } from "./NewPostCardComponent";
import { NewPostSkeletonComponent } from "./NewPostSkeletonComponent";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export const NewPostComponent = ({ onPostCreated }) => {
  const { category } = useEnvironmentContext();

  return (
    <div className="NewPostComponent">
      {Array.isArray(category) && category.length > 0 ? (
        <NewPostCardComponent onPostCreated={onPostCreated} category={category} />
      ) : (
        <NewPostSkeletonComponent />
      )}
    </div>
  );
};

NewPostComponent.propTypes = {
  text: PropTypes.string,
};
