import { GPTTextRequest } from "../GPT/type";

/**
 * 카카오톡 유저의 object
 */
export interface UserTypes {
    id: string;
    nickname: string;
    image: string;
    statusMessage?: string;
}

export interface ChattingRoomsTypes {
    user: UserTypes;
    assistant: UserTypes;
    title: string;
    GPTTextRequest: GPTTextRequest;
}
