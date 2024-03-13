export const getAssistants = async () => {
    const res = await fetch("/api/assistant/list");
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};

export const getThread = async () => {
    const res = await fetch("/api/assistant/thread/create");
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};

export const addMesageToThread = async (body: any) => {
    const res = await fetch("/api/assistant/thread/message/create", {
        method: "POST",
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};

export const runAssistant = async (body: any) => {
    const res = await fetch("/api/assistant/thread/runs/create", {
        method: "POST",
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};

export const checkRunStatus = async (body: {
    threadId: string;
    runId: string;
}) => {
    const res = await fetch("/api/assistant/thread/runs/retrieve", {
        method: "POST",
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};

export const getAssistantResponse = async (threadId: string) => {
    const res = await fetch(
        `/api/assistant/thread/message/list?threadId=${threadId}`
    );
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};
