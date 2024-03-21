const baseURL = process.env.API_BASE_URL || "http://localhost:3000";
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
    const res = await fetch(`${baseURL}/api/postgres/user`, {
        next: {
            tags: ["getFriends", userId],
        },
        cache: "no-store",
        // credentials: 'include'
    });
    console.log("getFriends", userId, res.ok);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export const getUser = async ({ queryKey }: { queryKey: [string, string] }) => {
    const [_1, userId] = queryKey;
    const res = await fetch(`/api/postgres/user?userId=${userId}`, {
        next: {
            tags: ["getUser", userId],
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

export const getFriends = getFriendsForBack;

/**
 * 유저 생성 및 수정 할때 사용하는 타입
 */
type createUserType = {
    userId: string;
    userName: string;
    eMail: string;
    passWord: string;
    profileImage?: File[];
};
export const createUser = async (data: createUserType) => {
    let { userId, userName, eMail, passWord } = data;
    console.log({ data });
    const res = await fetch("/api/postgres/user/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
export const updateUser = async (data: createUserType) => {
    // let { userId, userName, eMail, passWord } = data;
    const { profileImage, ...rest } = data;
    let profileurl = null;
    if (profileImage) {
        let newFormData: FormData = new FormData();

        //@ts-ignore
        newFormData.append("profileImage", profileImage[0].originFileObj);
        newFormData.append("userId", rest.userId);
        const res2 = await fetch(`${baseURL}/api/user`, {
            method: "POST",
            body: newFormData,
        });
        if (!res2.ok) {
            throw new Error("Failed to upload ProfileImage");
        }
        let res2JSON = await res2.json();
        if (res2JSON.isSuccess) {
            profileurl = res2JSON.result;
        } else {
            throw new Error("이미지 저장 실패");
        }
    }

    const res = await fetch("/api/postgres/user/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...rest, profileURL: profileurl }),
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export const deleteUser = async (userId: number) => {
    const res = await fetch("/api/postgres/user/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.message);
    }

    return res.json();
};
