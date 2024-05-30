export interface chatRoomTypes {
  room_id: number;
  room_name: string;
  created_at: string;
  user_id: number;
  messages: {
    role: string;
    content: string;
    timestamp: string;
  }[];
}

export interface IConversation {
  message: string;
  audioData?: any;
  isMe?: boolean;
}
