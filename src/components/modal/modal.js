import styled from "styled-components";
import { Button } from "../button/button";
import { useSelector } from "react-redux";
import { selectModalIsOpen, selectModalOnCancel, selectModalOnConfirm, selectModalText } from "../../selectors";

const ModalContainer = ({ className }) => {
  const isOpen = useSelector(selectModalIsOpen);
  const text = useSelector(selectModalText);
  const onConfirm = useSelector(selectModalOnConfirm);
  const onCancel = useSelector(selectModalOnCancel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay" />

      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button
            width="120px"
            onClick={onConfirm}>
            Да
          </Button>
          <Button
            width="120px"
            onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Modal = styled(ModalContainer)`
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: 0;
  left: 0;
  top:0;

  & .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
  }

  & .box {
    width: 400px;
    position: relative;
    margin: 0 auto;
    text-align: center;
    top: 50%;
    transform: translateY(0, -50%);
    padding: 0 20px 20px;
    background-color: #fff;
    border: 3px solid #000;
    z-index: 30;
  }

  & .buttons {
    display: flex;
    justify-content: center;
  }

  & .buttons button {
    margin: 0 5px;
  }
`;