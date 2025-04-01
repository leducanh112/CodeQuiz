import { get, post, patch } from "../utils/request";

export const getListQuestion = async (topicId) => {
  const result = await get(`questions?topicId=${topicId}`);
  return result;
};

export const createQuestion = async (options) => {
  const result = await post(`questions`, options);
  return result;
};

export const editQuestion = async (id, options) => {
  const result = await patch(`questions/${id}`, options);
  return result;
};
