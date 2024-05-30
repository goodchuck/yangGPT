import { IConversation } from '@/types/chatRoom/type';
import { create } from 'zustand';

interface userInfoType {
  profileUrl: string;
  nickname: string;
}

interface UserInfoState {
  userInfo: userInfoType;
  thread: string;
  assistant: any;
  message: string;
  attachedFiles: any[];
  conversations: IConversation[];
  isLoading: boolean;
}

interface UserInfoActions {
  setUserInfo: (userinfo: userInfoType) => void;
  deleteUserInfo: () => void;
  setThread: (thread: string) => void;
  setAssistant: (assistant: any) => void;
  setMessage: (message: string) => void;
  setAttachedFiles: (attachedFiles: any[]) => void;
  setConversations: (conversations: IConversation[]) => void;
  addConversations: (conversation: IConversation) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const defaultState = { profileUrl: '', nickname: '' };

const useAssistant = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  thread: '',
  assistant: '',
  message: '',
  attachedFiles: [],
  conversations: [],
  isLoading: false,
  setThread: (thread: string) => {
    set({ thread });
  },
  setAssistant: (assistant: any) => {
    set({ assistant });
  },
  setMessage: (message: string) => {
    set({ message });
  },
  setAttachedFiles: (attachedFiles: any[]) => {
    set({ attachedFiles });
  },
  setConversations: (conversations: IConversation[]) => {
    set({ conversations });
  },
  addConversations: (conversation: IConversation) => {
    set((state) => ({
      conversations: [...state.conversations, conversation],
    }));
  },
  setUserInfo: (userInfo: userInfoType) => {
    set({ userInfo });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  },
  setIsLoading: (setLoading: boolean) => {
    set({ isLoading: setLoading });
  },
}));

export default useAssistant;
