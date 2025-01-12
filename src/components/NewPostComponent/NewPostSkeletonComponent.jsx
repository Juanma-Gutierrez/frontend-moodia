import "./NewPostSkeletonComponent.scss";

export const NewPostSkeletonComponent = () => {
  const chip = [1, 2, 3, 4, 5];
  return (
    <div className="skeleton">
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-chip">
        {Array.isArray(chip) &&
          chip.map(
            (c, index) => {
              return <div key={index} className="skeleton-chip-item"></div>;
            },
            [chip]
          )}
      </div>
    </div>
  );
};
