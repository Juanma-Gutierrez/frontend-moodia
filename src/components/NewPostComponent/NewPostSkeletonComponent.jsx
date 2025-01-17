import "./NewPostSkeletonComponent.scss";

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
