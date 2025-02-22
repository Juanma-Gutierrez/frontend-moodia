import "./NewPostComponent.scss";
import PropTypes from "prop-types";
import { NewPostCardComponent } from "./NewPostCardComponent";
import { NewPostSkeletonComponent } from "./NewPostSkeletonComponent";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";

/**
 * NewPostComponent
 *
 * A component that displays the "New Post" form or a loading skeleton, depending on whether the category data is available.
 * If the category data exists and is not empty, it renders the `NewPostCardComponent` with the available categories.
 * Otherwise, it renders the `NewPostSkeletonComponent` as a loading placeholder.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onPostCreated - A callback function that is triggered after a post is created.
 *
 * @returns {JSX.Element} The rendered component.
 */
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
