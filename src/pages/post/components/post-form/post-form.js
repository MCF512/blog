import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Icon } from "../../../../components";
import { savePostAsync } from "../../../../actions";
import { sanitizeContent } from "./utils";
import { SpecialPanel } from "../special-panel/special-panel";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../hooks";
import styled from "styled-components"

const PostFormContainer = ({ className, post }) => {
  const { id, title, imageUrl, content, publishedAt } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
  const [titleValue, setTitleValue] = useState(title)
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl)
    setTitleValue(title)
  }, [imageUrl, title])

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent
      })
    ).then(({ id }) => navigate(`/post/${id}`))
  }

  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        onChange={({ target }) => setImageUrlValue(target.value)}
        placeholder="Изображение..."
      />
      <Input
        value={titleValue}
        onChange={({ target }) => setTitleValue(target.value)}
        placeholder="Заголовок..."
      />
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon
            id='fa-floppy-o'
            size='21px'
            onClick={onSave}
          />
        }
      />
      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text" >
        {content}
      </div>
    </div>
  )
}

export const PostForm = styled(PostFormContainer)`
  & img {
    float:left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
    border: 1px solid #000;
    min-height: 80px;
  }
`;