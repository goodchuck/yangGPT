export const getChatRoom = async ({
    queryKey,
}: {
    queryKey: [string, string];
}) => {
    const [_1, userId] = queryKey;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getChatRoom/${userId}`,
        {
            next: {
                tags: ["getChatRoom", userId],
            },
            // credentials: 'include'
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
