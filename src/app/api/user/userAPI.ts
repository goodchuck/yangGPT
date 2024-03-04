export const getUserObject = async ({
    queryKey,
}: {
    queryKey: [string, string];
}) => {
    const [_1, userId] = queryKey;
    console.log("getUserObject", userId);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUser/${userId}`,
        {
            next: {
                tags: ["getUser", userId],
            },
            // credentials: 'include'
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
