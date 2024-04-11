const baseURL =
    process.env.NODE_ENV === "production"
        ? process.env.API_BASE_URL
        : "http://localhost:3000";

export const getAssistants = async ({ queryKey }: { queryKey: [string] }) => {
    const [_1] = queryKey;
    console.log("_1", _1);
    const res = await fetch(`${baseURL}/api/assistant/list`, {
        next: {
            tags: [_1],
        },
        cache: "no-store",
    });
    console.log("getAssistants 실행");
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
