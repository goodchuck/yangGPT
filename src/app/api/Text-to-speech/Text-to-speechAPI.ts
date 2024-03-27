const baseURL = process.env.API_BASE_URL || "http://localhost:3000";

/**
 * voice = 'alloy','echo','fable','onyx','nova','shimmer',
 */
type TTSProps = {
    message: string;
    voice?: string;
};

export const getTTS = async (body: TTSProps) => {
    const res = await fetch(`${baseURL}/api/Text-to-speech`, {
        method: "POST",
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error("error");
    }
    return res.json();
};
