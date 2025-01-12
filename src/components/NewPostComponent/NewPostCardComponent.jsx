import "./NewPostCardComponent.scss";
import PropTypes from "prop-types";
import { ChipComponent } from "../ChipComponent/ChipComponent";
import { InputComponent } from "../InputComponent/InputComponent";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { editIcon } from "../../assets/Icons/ButtonIcons/EditIcon";
import { useState } from "react";
import { useEffect } from "react";

export const NewPostCardComponent = ({ category }) => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  useEffect(() => {
    setIsButtonDisabled(!title.trim() || !entry.trim());
  }, [title, entry]);

  const handleClick = () => {
    console.log("Publicar");
  };

  return (
    <div className="newPostCardComponent">
      <h3>Nuevo post</h3>
      <InputComponent label="Título" value={title} placeholder="Introduce el título" onChange={handleTitleChange} />
      <InputComponent
        label="Entrada"
        placeholder="Introduce tu post diario"
        value={entry}
        type="message"
        onChange={handleEntryChange}
      />
      <div className="category-container">
        {category.map(
          (cat, index) => {
            return <ChipComponent key={index} text={cat.name} />;
          },
          [category]
        )}
      </div>
      <div className="publish-button-container">
        <ButtonComponent text="Publicar" icon={editIcon} onClick={handleClick} disabled={isButtonDisabled} colorClass="button-accept"/>
      </div>
    </div>
  );
};

NewPostCardComponent.propTypes = {
  category: PropTypes.array,
};
