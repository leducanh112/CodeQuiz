import { get, post } from "../utils/request";

export const getListTopic = async () => {
  const result = await get(`topics`);
  return result;
};

export const getTopic = async (id) => {
  const result = await get(`topics/${id}`);
  return result;
};

export const createTopic = async (options) => {
  const result = await post(`topics`, options);
  return result;
};
