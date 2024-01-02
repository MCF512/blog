import { request } from "../utils";

export const removePostAsync = (id) => () => {
  return request(`/posts/${id}`, "DELETE")
};