"use client"
import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload } from 'antd';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/app/api/user/userAPI";
import { PlusOutlined } from "@ant-design/icons";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    targetUser: number;
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

export const UserUpdateModal = ({ open, setOpen, targetUser }: Props) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const userUpdateMutation = useMutation({
        mutationFn: async (e: any) => {
            return updateUser(e)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['getFriends', 'test'] });
            queryClient.refetchQueries({ queryKey: ['getFriends', 'test'] });
            setOpen(prevState => !prevState);
            onReset();
        }
    })
    const handleOk = (values: any) => {
        console.log(values, targetUser);
        userUpdateMutation.mutate({ ...values, userId: targetUser })
    }
    const onReset = () => {
        form.resetFields();
    };

    const handleCancel = () => {
        setOpen(prevState => !prevState);
    }

    const normFile = (e: any) => {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    }


    return (
        <Modal
            title="유저 정보 변경"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <></>
            )}
        >
            <Form {...formItemLayout} form={form} variant="filled" onFinish={handleOk} style={{ maxWidth: 600 }}>
                <Form.Item
                    label="유저 Id"
                    name="Id"
                // rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="유저 이름"
                    name="Username"
                // rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="유저 이메일"
                    name="Email"
                // rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="상태메시지"
                    name="Status_message"
                // rules={[{ required: false, message: 'Please input!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Upload" name="profileImage" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload name="files" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}