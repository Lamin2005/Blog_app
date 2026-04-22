import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async () => {
  const { data } = await axios(`${API_URL}/api/posts`);
  return data.data;
};
