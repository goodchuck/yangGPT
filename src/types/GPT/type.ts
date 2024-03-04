export interface SystemMessage {
    content: string;
    role: string;
    name?: string;
}

export interface UserMessage {
    content: string;
    role: string;
    name?: string;
}

export interface AssistantMessage {
    content?: string | null;
    role: string;
    name?: string;
}

export interface GPTTextRequest {
    messages: (SystemMessage | UserMessage | AssistantMessage)[];
    model: string;
}
