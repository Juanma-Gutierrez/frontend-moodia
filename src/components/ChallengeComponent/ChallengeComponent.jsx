import "./ChallengeComponent.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { useState } from "react";

export const ChallengeComponent = ({ challenge }) => {
  const { title, message } = challenge;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalModel = new ModalModel({
    title: "Aceptar el reto",
    message: "¿Seguro que te comprometes a realizar este reto?",
    button1: "¡Me atrevo!",
    button2: "Por ahora no",
    type: "confirm",
  });

  const handleAcceptChallenge = () => {
    console.log("handleAcceptChallenge");
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const formatMessage = (message) => {
    let formattedMessage = message.replace(/<breakLine>/g, "<br />");

    formattedMessage = formattedMessage
      .split("<bulletPoint>")
      .map((item, index) => {
        if (index === 0) {
          return item;
        }
        return `<li>${item}</li>`;
      })
      .join("");

    formattedMessage = `<ul>${formattedMessage}</ul>`;

    return formattedMessage;
  };

  return (
    <div className="challenge-component-container">
      <h4 className="challenge-component-title">{title}</h4>
      <div dangerouslySetInnerHTML={{ __html: formatMessage(message) }} />
      <ButtonComponent type="info-accept" text="Aceptar reto" onClick={handleAcceptChallenge} />
      {isModalVisible && (
        <ModalComponent modalModel={modalModel} onConfirm={handleCloseModal} onCancel={handleCloseModal} />
      )}{" "}
    </div>
  );
};

ChallengeComponent.propTypes = {
  challenge: PropTypes.object.isRequired,
};
