export const getChatRoom = async ({
    queryKey,
}: {
    queryKey: [string, string];
}) => {
    const [_1, roomId] = queryKey;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getChatRoom/${roomId}`,
        {
            next: {
                tags: ["getChatRoom", roomId],
            },
            // credentials: 'include'
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
