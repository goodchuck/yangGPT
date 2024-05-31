// import createRandomUser from '@/dummyData/faker-data';
import axios from 'axios';

const API_URL = 'https://api.example.com';

export const fetchUser = async (userId: string) => {
  const { data } = await axios.get(`${API_URL}/users/${userId}`);
  // const data = createRandomUser();
  return data;
};

export const fetchPosts = async () => {
  const { data } = await axios.get(`${API_URL}/posts`);
  return data;
};

export const createPost = async (post: { title: string; content: string }) => {
  const { data } = await axios.post(`${API_URL}/posts`, post);
  return data;
};
