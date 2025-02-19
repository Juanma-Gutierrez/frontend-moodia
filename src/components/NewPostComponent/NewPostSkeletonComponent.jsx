import "./NewPostSkeletonComponent.scss";

/**
 * NewPostSkeletonComponent
 *
 * A skeleton loader component that provides a placeholder UI while the content is being fetched or loaded.
 * It simulates the structure of a new post card with skeleton elements for the title, text, chips, emojis, and buttons.
 * This component is typically displayed while the data required for rendering the `NewPostCardComponent` is still loading.
 *
 * @returns {JSX.Element} The rendered skeleton loader component.
 */
export const NewPostSkeletonComponent = () => {
  return (
    <div className="skeleton">
      <div className="skeleton-title"></div>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="skeleton-text"></div>
      ))}
      <div className="skeleton-chip">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="skeleton-chip-item"></div>
        ))}
      </div>
      <div className="skeleton-bottom-container">
        <div className="skeleton-emoji">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="skeleton-emoji-item"></div>
          ))}
        </div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};
