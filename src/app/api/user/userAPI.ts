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

/**
 * mock버전 api
 * @param param0
 * @returns
 */
export const getFriendsForMock = async ({
    queryKey,
}: {
    queryKey: [string, string];
}) => {
    const [_1, userId] = queryKey;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getFriends/${userId}`,
        {
            next: {
                tags: ["getFriends", userId],
            },
            // credentials: 'include'
        }
    );
    console.log("getFriends", userId, res.ok);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export const getFriendsForBack = async ({
    queryKey,
}: {
    queryKey: [string, string];
}) => {
    const [_1, userId] = queryKey;
    const res = await fetch(`/api/postgres/user`, {
        next: {
            tags: ["getFriends", userId],
        },
        // credentials: 'include'
    });
    console.log("getFriends", userId, res.ok);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export const getFriends = getFriendsForBack;
