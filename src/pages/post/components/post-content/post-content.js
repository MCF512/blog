import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const PostContentContainer = ({ className, post }) => {
  const { id, title, imageUrl, content, publishedAt } = post;
  const navigate = useNavigate()
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="-20px 0 20px"
        editButton={
          <Icon
            id='fa-pencil-square-o'
            size='21px'
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        }
      />
      <div className="post-text">{content}</div>
    </div>
  )
}

export const PostContent = styled(PostContentContainer)`
  & img {
    float:left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;