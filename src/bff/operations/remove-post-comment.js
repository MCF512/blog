import { deleteComment, getComments, getPost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removePostComment = async (hash, postId, id) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: 'Комментарии могут оставлять только авторизованные пользователи',
      res: null,
    }
  }

  await deleteComment(id);

  const post = await getPost(postId);

  const comments = await getComments(postId);

  return {
    error: null,
    res: {
      ...post,
      comments
    },
  }
}