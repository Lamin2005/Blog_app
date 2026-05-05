import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

export const getPosts = async () => {
  const { data } = await axios.get(`${API_URL}/api/posts`);
  return data.data;
};

export const getPostDetail = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/api/posts/post-detail/${id}`);

  return data.data;
};

export const createPosts = async (formData: FormData) => {
  const { data } = await axios.post(`${API_URL}/api/posts/create`, formData);

  return data.data;
};

export const deletePosts = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/api/posts/delete/${id}`);
  return data.message;
};

export const updatePosts = async (id: string, formData: FormData) => {
  const { data } = await axios.patch(
    `${API_URL}/api/posts/edit/${id}`,
    formData,
  );
  
  return data.data;
};

export const onlyUserPosts = async () => {
  const { data } = await axios.get(`${API_URL}/api/posts/my-posts`);

  return data.data;
};
