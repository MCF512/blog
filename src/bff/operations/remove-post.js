import { deletePost, deleteComment, getComments } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removePost = async (hash, id) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: 'Комментарии могут оставлять только авторизованные пользователи',
      res: null,
    }
  }

  await deletePost(id);

  const comments = await getComments(id);

  await Promise.all(comments.map(({ id: commentId }) => {
    return deleteComment(commentId)
  }))


  return {
    error: null,
    res: true,
  }
}