import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";
import fs from "fs";
import { ChattingRoomsTypes, User } from "@/types/user/types";

function generateDate() {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({
        from: lastWeek,
        to: Date.now(),
    });
}
const User: User[] = [
    { id: "yangTi", nickname: "YangTi", image: faker.image.avatar() },
    { id: "karina", nickname: "Karina", image: "/icons/user/카리나1.PNG" },
    { id: "zerohch0", nickname: "제로초", image: "/5Udwvqim.jpg" },
    { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];

const ChattingRooms: ChattingRoomsTypes[] = [
    {
        user: User[0],
        assistant: User[1],
        GPTTextRequest: {
            messages: [
                {
                    role: "system",
                    content: "넌 20대 여자친구야 말끝마다 냥을 붙여서 말해",
                },
                { role: "user", content: "넌 뭐하는 얘니?" },
                {
                    role: "assistant",
                    content:
                        "저는 여러분이 필요로 하는 정보나 도움을 제공하는 인공지능 비서입니다. 무엇을 도와드릴까요?",
                },
                { role: "user", content: "어? 내가 아까전에 무슨질문 했지?" },
                {
                    role: "assistant",
                    content:
                        "아뇨, 당신이 아까 질문한 내용은 넌 뭐하는 얘니? 였습니다. 또 다른 질문이 있으실까요?",
                },
            ],
            model: "gpt-3.5-turbo",
        },
    },
];
const Posts = [];

/**
 * X의 액션이벤트들을 연습하기위한 곳
 */
const testPost = {
    _count: {
        Hearts: 0,
        Reposts: 0,
        Comments: 0,
    },
};

export const handlers = [
    http.post("/api/login", async ({ request }) => {
        console.log("로그인");
        const body = await request.json();
        return HttpResponse.json(
            {
                id: body?.id,
                password: body?.password,
                image: faker.image.avatar(),
            },
            {
                headers: {
                    "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
                },
            }
        );
    }),
    http.post("/api/logout", () => {
        console.log("로그아웃");
        return new HttpResponse(null, {
            headers: {
                "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
            },
        });
    }),
    http.post("/api/users", async ({ request }) => {
        console.log("회원가입");
        // return HttpResponse.text(JSON.stringify('user_exists'), {
        //   status: 403,
        // })
        return HttpResponse.text(JSON.stringify("ok"), {
            headers: {
                "Set-Cookie":
                    "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
            },
        });
    }),
    // 유저 오브젝트를 얻어옴
    http.get("/api/getUser/:userId", ({ request, params }) => {
        // const url = new URL(request.url);
        // const userId = url.searchParams.get("userId") as string;
        const { userId } = params;
        let findObject = User.find((v) => v.id === userId);
        console.log("/api/getUser/user", userId);
        if (findObject) {
            return HttpResponse.json({
                isSuccess: true,
                results: [findObject],
            });
        } else {
            return HttpResponse.json({
                isSuccess: false,
                results: [],
            });
        }
    }),
    // 유저 오브젝트를 얻어옴
    http.get("/api/getChatRoom/:roomId", ({ request, params }) => {
        // const url = new URL(request.url);
        // const userId = url.searchParams.get("userId") as string;
        const { roomId } = params;
        let findObject = ChattingRooms[Number(roomId)];
        // console.log("/api/getUser/user", userId);
        if (findObject) {
            return HttpResponse.json({
                isSuccess: true,
                results: [findObject],
            });
        } else {
            return HttpResponse.json({
                isSuccess: false,
                results: [],
            });
        }
    }),
    http.get("/api/followingPosts", ({ request }) => {
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} Stop following me. I'm too famous.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} Stop following me. I'm too famous.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} Stop following me. I'm too famous.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} Stop following me. I'm too famous.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} Stop following me. I'm too famous.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get("/api/search/:tag", ({ request, params }) => {
        const { tag } = params;
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get("/api/users/:userId/posts", ({ request, params }) => {
        const { userId } = params;
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get(
        "/api/users/:userId",
        ({ request, params }): StrictResponse<any> => {
            const { userId } = params;
            const found = User.find((v) => v.id === userId);
            if (found) {
                return HttpResponse.json(found);
            }
            return HttpResponse.json(
                { message: "no_such_user" },
                {
                    status: 404,
                }
            );
        }
    ),
    // http.get(
    //     "/api/posts/:postId",
    //     ({ request, params }): StrictResponse<any> => {
    //         const { postId } = params;
    //         if (parseInt(postId as string) > 10) {
    //             return HttpResponse.json(
    //                 { message: "no_such_post" },
    //                 {
    //                     status: 404,
    //                 }
    //             );
    //         }
    //         return HttpResponse.json({
    //             postId,
    //             User: User[0],
    //             content: `${1} 게시글 아이디 ${postId}의 내용`,
    //             Images: [
    //                 { imageId: 1, link: faker.image.urlLoremFlickr() },
    //                 { imageId: 2, link: faker.image.urlLoremFlickr() },
    //                 { imageId: 3, link: faker.image.urlLoremFlickr() },
    //             ],
    //             createdAt: generateDate(),
    //         });
    //     }
    // ),
    http.get("/api/posts/:postId/comments", ({ request, params }) => {
        const { postId } = params;
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} 게시글 ${postId}의 답글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} 게시글 ${postId}의 답글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} 게시글 ${postId}의 답글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} 게시글 ${postId}의 답글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} 게시글 ${postId}의 답글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get("/api/followRecommends", ({ request }) => {
        return HttpResponse.json(User);
    }),
    http.get("/api/trends", ({ request }) => {
        return HttpResponse.json([
            { tagId: 1, title: "제로초", count: 1264 },
            { tagId: 2, title: "원초", count: 1264 },
            { tagId: 3, title: "투초", count: 1264 },
            { tagId: 4, title: "쓰리초", count: 1264 },
            { tagId: 5, title: "포초", count: 1264 },
            { tagId: 6, title: "파이브초", count: 1264 },
            { tagId: 7, title: "식스초", count: 1264 },
            { tagId: 8, title: "세븐초", count: 1264 },
            { tagId: 9, title: "나인초", count: 1264 },
        ]);
    }),
    // 하트
    http.post("/api/posts/heart", async ({ request }) => {
        console.log("heart연습");
        const body = await request.json();
        return HttpResponse.json((testPost._count.Hearts += 1));
    }),
    http.post("/api/posts/unheart", async ({ request }) => {
        console.log("unheart연습");
        const body = await request.json();
        return HttpResponse.json((testPost._count.Hearts -= 1));
    }),
    // 하트
    http.post("/api/posts/reposts", async ({ request }) => {
        console.log("reposts연습");
        const body = await request.json();
        return HttpResponse.json((testPost._count.Reposts += 1));
    }),
    http.post("/api/posts/unreposts", async ({ request }) => {
        console.log("unreposts연습");
        const body = await request.json();
        return HttpResponse.json((testPost._count.Reposts -= 1));
    }),
    // 모든 액션들
    http.get("/api/posts/actions", async ({ request }) => {
        let cursor = 30;
        return HttpResponse.json(
            {
                postId: cursor + 1,
                User: User[0],
                content: `액션들에 대한 연습용 섹션입니다!`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
                _count: {
                    Hearts: testPost._count.Hearts,
                    Reposts: testPost._count.Reposts,
                    Comments: testPost._count.Comments,
                },
            }
            // {
            //     headers: {
            //         "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
            //     },
            // }
        );
    }),
    // 서버액션 테스트용
    http.get("/api/serverActions", async ({ request }) => {
        return HttpResponse.json(User[1]);
    }),
    // User[1]을 바꿔서 줄 예정
    http.post("/api/serverActions", async ({ request }) => {
        const body = await request.json();
        // console.log({ body });

        if (body) {
            User[1].id = body.id;
            User[1].nickname = body.nickname;
        }

        return HttpResponse.json(User[1]);
    }),
];
