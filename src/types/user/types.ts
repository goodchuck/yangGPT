import { GPTTextRequest } from "../GPT/type";

/**
 * 카카오톡 유저의 object
 */
export interface User {
    id: string;
    nickname: string;
    image: string;
    statusMessage?: string;
}

export interface ChattingRoomsTypes {
    user: User;
    assistant: User;
    GPTTextRequest: GPTTextRequest;
}
