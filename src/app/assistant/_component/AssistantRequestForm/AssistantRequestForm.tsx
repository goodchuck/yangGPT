"use client"

import { Button, Collapse, CollapseProps, Divider, Flex, Input, Pagination, PaginationProps, Progress, Select, Spin } from "antd"
import { StyledAssistantRequestForm } from "./StyledAssistantRequestForm"
import { UploadComponent } from "@/app/_component/UploadComponent"
import useAssistant from "@/hooks/useAssistant";
import { useMutation } from "@tanstack/react-query";
import { addMesageToThread, checkRunStatus, getAssistantResponse, runAssistant } from "@/app/api/assistant/assistantAPI";
import { useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const useDailyReset = (key: string) => {
    const [value, setValue] = useState<string | null>(null);
    useEffect(() => {
        const lastResetDate = window.localStorage.getItem(`${key}_last_reset`);
        const today = new Date().toLocaleDateString();
        console.log({ lastResetDate, today })
        // 날짜가 다르면 기본값인 5
        if (lastResetDate !== today) {
            window.localStorage.setItem(key, '5');
            window.localStorage.setItem(`${key}_last_reset`, today);
            setValue('5')
        } else {
            const storedValue = window.localStorage.getItem(key);
            console.log({ storedValue })
            setValue(storedValue);
        }
    }, [key])

    useEffect(() => {
        if (value !== null) {
            window.localStorage.setItem(key, value);
        }
    }, [key, value])

    const updateValue = (newValue: string) => {
        setValue(newValue);
    }

    return { value, updateValue };
}

let testOutputs = [{
    "problem": "문제 : 네트워크 기술 면접에서 다음 중 Cast의 종류에 해당하지 않는 것은?",
    "answer": "정답: D) Directcast",
    "solution": "풀이: 네트워크 면접 질문에서 언급된 Cast의 종류로는 Unicast(1:1 통신), Multicast(1:N 통신), Broadcast(1:all 통신)가 있으며, Directcast는 언급되지 않은 옵션이므로 해당하지 않는 종류로 간주됩니다."
}, {
    "problem": "문제 : 네트워크 기술 면접에서 다음 중 Cast의 종류에 해당하지 않는 것은?2222",
    "answer": "정답: D) Directcast2222",
    "solution": `풀이: 네트워크 면접 질문에서 언급된 Cast의 종류로는 Unicast(1:1 통신), Multicast(1:N 통신), Broadcast(1:all 통신)가 있으며, Directcast는 언급되지 않은 옵션이므로 해당하지 않는 종류로 간주됩니다.
    aasd
    asd
    dddddddddd
    asddddd
    ffffffff
    
    `
}]

/**
 * 지금은 임시로 폼을 동적으로받지않고 PDF 문제 생성기를 위한걸로만 만들어져있음
 * @todo 
 * 1. 새로 응답요청을하면 해당 결과로 이동
 * 2. 정답과 풀이를 페이지가 이동할때 자동 끄기
 * @returns 
 */
export const AssistantRequestForm = () => {
    const KEY = 'testCost';
    const { value: initialValue, updateValue } = useDailyReset(KEY);
    const { message, setMessage,
        thread, assistant, isLoading, setIsLoading,
        attachedFiles, setAttachedFiles, conversations, setConversations } = useAssistant();

    let maxCost = 5;
    const [cost, setCost] = useState<number>(initialValue ? parseInt(initialValue) : 0);
    const [outputs, setOutputs] = useState<{ problem: string, answer: string, solution: string }[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [collapseItem, setCollapseItem] = useState<CollapseProps['items']>();
    const defaultActiveKey = ['1'];
    const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>(defaultActiveKey);
    const [selectedValue, setSelectedValue] = useState<string>('문제 유형 : 객관식');

    // useEffect(() => {
    //     console.log({ outputs });
    // }, [outputs])

    useEffect(() => {
        if (initialValue) {
            setCost(parseInt(initialValue));
        }
    }, [initialValue]);
    useEffect(() => {
        if (outputs.length === 0) return;
        let targetItem = outputs[pageIndex];
        let collItem = [
            {
                key: '1',
                label: '문제',
                children: <p>{targetItem.problem}</p>
            },
            {
                key: '2',
                label: '정답',
                children: <p>{targetItem.answer}</p>
            },
            {
                key: '3',
                label: '풀이',
                children: <p>{targetItem.solution}</p>
            }
        ]
        setCollapseItem(collItem);
    }, [outputs, pageIndex])

    useEffect(() => {
        setCollapseActiveKeys(defaultActiveKey);
    }, [pageIndex])

    const onChangeMessageEvent = async (e: any) => {
        setMessage(e.target.value);
    }

    const onChangeSelect = async (value: string) => {
        console.log({ message, value })
        setSelectedValue(value);
        let messageArray = message.split("\n");
        let isIncludes = false;
        let targetMessage = messageArray.map(v => {
            if (v.includes('문제 유형 : ')) {
                isIncludes = true;
                return `문제 유형 : ${value}`
            }
            else {
                return v
            }
        }
        );
        // console.log({ targetMessage }, targetMessage.join('\n'), isIncludes, targetMessage.join('\n') + !isIncludes ? `\n 문제 유형 : ${value}` : '')
        if (!isIncludes) {
            targetMessage = [...targetMessage, `문제 유형 : ${value}`];
        }
        setMessage(targetMessage.join("\n"))
    }


    const mutation = useMutation({
        mutationFn: async (message: string) => {
            try {
                if (thread && assistant) {
                    setIsLoading(true);
                    // setMessage('');
                    // setCost(cost - 1);
                    updateValue((cost - 1).toString());
                    setConversations([...conversations, { message, isMe: true }])
                    //쓰레드에 메시지 추가
                    let aMTTRes = await addMesageToThread({ threadId: thread, content: message, file_ids: attachedFiles.map(v => v.id) })
                    console.log({ aMTTRes })

                    //assistant에 쓰레드 추가
                    let runRes = await runAssistant({ threadId: thread, assistantId: assistant.id, instructions: assistant.instructions })
                    console.log({ runRes });
                    // 폴링 로직을 프로미스로 감싸서 반환
                    return new Promise(async (resolve, reject) => {
                        const pollStatus = async () => {
                            try {
                                let cRSRes = await checkRunStatus({ threadId: thread, runId: runRes.results.id });
                                console.log({ cRSRes });

                                if (!cRSRes.isSuccess) {
                                    reject(new Error("Polling failed"));
                                    return;
                                }
                                else if (cRSRes.results.status === 'failed') {
                                    reject(new Error(cRSRes.results.last_error));
                                    return;
                                }
                                else if (cRSRes.results.status === 'completed') {
                                    let res = await getAssistantResponse(thread);
                                    console.log({ res });
                                    if (res.isSuccess) {
                                        // resolve(res.results.data[0].content[0].text.value); // 성공적으로 완료된 경우
                                        resolve(res.results.data)
                                    } else {
                                        reject("Failed to get assistant response");
                                    }
                                } else {
                                    setTimeout(pollStatus, 5000); // 계속 폴링
                                }
                            } catch (error) {
                                console.error('Error during polling', error);
                                reject(error); // 폴링 중 에러 발생
                            }
                        };
                        pollStatus();
                    });
                    // return runRes.results.id;

                }
            }
            catch (e) {
                throw e;
            }
        },
        async onSuccess(data: any) {
            if (!thread) return;
            // 폴링 결과에 따라 성공 처리
            let messages = [];
            for (let row of data) {
                if (row.role === 'user') break;
                let message = row.content[0].text.value;
                if (message.includes('문제 :') || message.includes('문제:')) {

                    // 정규 표현식을 사용하여 각 부분을 분할
                    const pattern = /문제\s*:(.*?)정답\s*:(.*?)풀이\s*:(.*)/s;
                    const matches = message.match(pattern);

                    // 각 부분을 출력
                    const problem = matches[1].trim();
                    const answer = matches[2].trim();
                    const solution = matches[3].trim();
                    let newOutputs = [...outputs, { problem, answer, solution }]
                    setOutputs(newOutputs);
                    setPageIndex(newOutputs.length - 1);
                } else {
                    // setCost(cost + 1);
                    updateValue((cost + 1).toString());
                }
                messages.push({ message, isMe: false });
            }
            setConversations([...conversations, ...messages.reverse()])
            setIsLoading(false);
        },
        async onError(e) {
            setConversations([...conversations.slice(0, -1)])
            setIsLoading(false);
            // setCost(cost + 1);
            updateValue((cost + 1).toString());
        }
    })

    /**
     * 생성하기 버튼 클릭시
     */
    const handleSubmit = async () => {
        let endFix = ' 1 문제 만들어줘'
        if (message) {
            console.log({ message })
            mutation.mutate(message + endFix);
        } else if (selectedValue) {
            mutation.mutate(`문제 유형 : ${selectedValue}` + endFix)
        }
    }

    const onChangePage: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setPageIndex(page - 1);
    }


    const onChangeCollapse = (key: string | string[]) => {
        // console.log(key);
        setCollapseActiveKeys(key as string[]);
    }
    return (
        <StyledAssistantRequestForm>
            <Spin spinning={isLoading} tip='AI가 생각하는중...' size="large">

                <Flex vertical gap={'middle'} align="center" style={{ width: '100%', height: '90vh', backgroundColor: '#fafff7' }}>
                    <h1 className="title">PDF 문제 생성기</h1>
                    <h3 className="description">PDF파일을 업로드하여 문제를 만들고 풀어봐요!
                        PDF를 먼저 업로드를 하셔야합니다!</h3>
                    <Flex vertical={false} className="form" gap={'middle'} style={{ height: '90%' }}>
                        <Flex vertical style={{ minWidth: '600px' }}>
                            <Flex vertical gap={'middle'}>
                                <p>PDF 파일</p>
                                <UploadComponent getUploadFile={setAttachedFiles} />
                                <p>문제 유형</p>
                                <Select
                                    defaultValue="객관식"
                                    style={{ width: 120 }}
                                    onChange={onChangeSelect}
                                    options={[
                                        { value: '객관식', label: '객관식' },
                                        { value: '참/거짓', label: '참/거짓' },
                                        { value: '주관식', label: '주관식' },
                                        { value: '빈칸', label: '빈칸' },
                                    ]}
                                />
                                {/* <p>텍스트</p>
                    <TextArea value={message} onChange={onChangeMessageEvent} rows={5} /> */}
                            </Flex>
                            <Flex gap={'middle'} justify="end" align="center">
                                <Button style={{ width: '100px' }} onClick={handleSubmit} disabled={attachedFiles.length === 0 || cost === 0 ? true : false}>생성하기</Button>
                                {cost === 0 ? <p>가지고 있는 재화를 다 소진하셨습니다! 내일 다시 도전해주세요!</p> : undefined}
                                <p>{`남은 재화 : ${cost}`}</p>
                                <Progress
                                    type="circle"
                                    percent={(cost / maxCost) * 100}
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    size={30} />
                            </Flex>

                        </Flex>

                        {outputs[pageIndex] && outputs[pageIndex].problem && (
                            <>
                                <Divider type="vertical" />
                                <Flex vertical gap={'middle'} style={{ width: '50%' }}>
                                    {/* <Divider /> */}
                                    <Pagination
                                        total={outputs.length}
                                        current={pageIndex + 1}
                                        onChange={onChangePage}
                                        defaultPageSize={1}
                                    />
                                    <h3>AI의 대답</h3>
                                    <Collapse
                                        items={collapseItem}
                                        activeKey={collapseActiveKeys}
                                        // defaultActiveKey={['1']}
                                        onChange={onChangeCollapse}
                                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    />
                                    {/* <Flex vertical gap={'middle'} style={{ padding: 10 }}>
                                    <h3>AI의 대답</h3>
                                    <div style={{ height: 150, overflowY: 'scroll', backgroundColor: '#F2F7FF' }}>
                                        <p>{outputs[pageIndex].problem}</p>
                                    </div>

                                    <Button onClick={onToggleAnswer} style={{ width: 100 }}>{!showAnswer ? '정답 보기' : '정답 숨기기'}</Button>
                                    {showAnswer && (
                                        <div style={{ height: 100, overflowY: 'scroll', backgroundColor: '#F2F7FF' }}>
                                            <p>{outputs[pageIndex].answer}</p>
                                        </div>
                                    )}
                                    <Button onClick={onToggleSolution} style={{ width: 100 }}>{!showSolution ? '풀이 보기' : '풀이 숨기기'}</Button>
                                    {showSolution && (
                                        <div style={{ height: 150, overflowY: 'scroll', backgroundColor: '#F2F7FF' }}>
                                            <p>{outputs[pageIndex].solution}</p>
                                        </div>
                                    )}
                                </Flex> */}

                                </Flex>
                            </>

                        )}
                    </Flex>
                </Flex>
            </Spin>

        </StyledAssistantRequestForm >

    )
}