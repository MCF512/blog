import { useDispatch } from "react-redux";
import { openModal, CLOSE_MODAL, removePostAsync } from "../../../../actions";
import { Icon } from "../../../../components";
import { useServerRequest } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const navigate = useNavigate()

  const onPostRemove = (id) => {
    dispatch(openModal({
      text: 'Удалить статью?',
      onConfirm: () => {
        dispatch(removePostAsync(requestServer, id)).then(() => {
          navigate('/')
        })
        dispatch(CLOSE_MODAL)
      },
      onCancel: () => dispatch(CLOSE_MODAL)
    }))
  }

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && <Icon
          id='fa-calendar-o'
          size='16px'
          margin='0 7px 0 0'
          inactive={true}
        />}
        {publishedAt}
      </div>
      <div className="buttons">
        {editButton}
        {publishedAt &&
          <Icon
            id='fa-trash-o'
            size='18px'
            margin='0 0 0 10px'
            onClick={() => onPostRemove(id)}
          />
        }
      </div>
    </div>
  )
}

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    align-items: center;
  }
`;