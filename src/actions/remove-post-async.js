export const removePostAsync = (requestServer, id) => (dispatch) => {
  return requestServer('removePost', id)
};