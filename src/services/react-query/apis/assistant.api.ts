// libraries
import AxiosInstanceCreator from '@/services/api';
import axios from 'axios';
import qs from 'qs';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_BASE_URL
    : 'http://localhost:3000';

const assistantInstance = new AxiosInstanceCreator({
  baseURL: API_URL,
}).create();

export const assistantApi = {
  getAssistants: async (tag?: string) => {
    try {
      const response = await assistantInstance.get('/api/assistant/list', {
        params: tag ? { tag } : {},
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch assistants');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching assistants:', error);
      throw error;
    }
  },
  getThread: async (tag?: string) => {
    try {
      const response = await assistantInstance.get(
        '/api/assistant/thread/create',
        {
          params: tag ? { tag } : {},
        },
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch assistants');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching assistants:', error);
      throw error;
    }
  },
  addMessageToThread: async (body: any) => {
    try {
      console.log('addMessageToThread', body);
      const response = await assistantInstance.post(
        '/api/assistant/thread/message/create',
        body,
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch addMessageToThread');
      }
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  },
  runAssistant: async (body: any) => {
    try {
      const response = await assistantInstance.post(
        '/api/assistant/thread/runs/create',
        body,
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch runAssistant');
      }
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  },
  checkRunStatus: async (body: { threadId: string; runId: string }) => {
    try {
      const response = await assistantInstance.post(
        '/api/assistant/thread/runs/retrieve',
        body,
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch checkRunStatus');
      }
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  },
  getAssistantResponse: async (threadId: string) => {
    try {
      const response = await assistantInstance.get(
        `/api/assistant/thread/message/list?threadId=${threadId}`,
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch getAssistantResponse');
      }
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  },
};

export const fetchUser = async (userId: string) => {
  const { data } = await axios.get(`${API_URL}/users/${userId}`);
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
