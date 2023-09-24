import styled from "styled-components"
import { H2, Icon } from "../../../../components";

const PostContentContainer = ({ className, post }) => {
  const { id, title, imageUrl, content, publishedAt } = post;
  return (
    <div className={className}>
      <img src={imageUrl} />
      <H2>{title}</H2>
      <div className="special-panel">
        <div className="published-at">
          <Icon
            id='fa-calendar-o'
            size='16px'
            margin='0 7px 0 0'
            onClick={() => { }}
          />
          {publishedAt}
        </div>
        <div className="buttons">
          <Icon
            id='fa-pencil-square-o'
            size='21px'
            margin='0 10px 0 0'
            onClick={() => { }}
          />
          <Icon
            id='fa-trash-o'
            size='18px'
            onClick={() => { }}
          />
        </div>
      </div>
      <div className="post-text">{content}</div>
    </div>
  )
}

export const PostContent = styled(PostContentContainer)`
  & img {
    float:left;
    margin: 0 20px 10px 0;
  }

  & .special-panel {
    display: flex;
    justify-content: space-between;
    margin: -20px 0 20px;
  }

  & .published-at {
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    align-items: center;
  }

  & .post-text {
    font-size: 18px;
  }
`;