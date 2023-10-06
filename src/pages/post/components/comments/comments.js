import PropTypes from 'prop-types';
import { useState } from "react";
import { Icon } from '../../../../components';
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks";
import { addCommentAsync } from "../../../../actions";
import { PROP_TYPE, ROLE } from "../../../../constants";
import styled from "styled-components";

const CommentsConteiner = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment('')
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <div className={className}>
      {!isGuest &&
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарий..."
            onChange={({ target }) => setNewComment(target.value)}></textarea>
          <Icon
            id='fa-paper-plane-o'
            margin="0 0 0 10px"
            size="18px"
            onClick={() => onNewCommentAdd(userId, postId, newComment)}
          />
        </div>
      }
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            id={id}
            postId={postId}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  )
}

export const Comments = styled(CommentsConteiner)`
width: 580px;
margin: 0 auto;

  & .new-comment {
    display: flex;
    width: 100%;
    margin: 20px 0 0;
  }

  & .new-comment textarea {
    width: 550px;
    height: 120px;
    font-size: 18px;
    resize: none;
  }
`;

Comment.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
  postId: PropTypes.string.isRequired
}