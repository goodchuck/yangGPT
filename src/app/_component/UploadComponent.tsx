"use client"
import React, { useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Image, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { deleteOpenAIFile, uploadFileForOpenAI } from '../api/files/Files';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

type Props = {
    getUploadFile?: (file: any) => any;
    setAttachedFiles?: any;
}

/**
 * 테스트용으로만든 업로드용 코드
 * PDF만 받게 되어있다.
 * 일단은 OpenAI에 다이렉트로 파일업로드로 해놓을예정
 * @returns 
 */
export const UploadComponent = ({ getUploadFile }: Props) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploadedFileList, setUploadedFileList] = useState<any[]>([]);
    useEffect(() => {
        console.log('fileList', fileList);
    }, [fileList])

    useEffect(() => {
        console.log(previewImage);
    }, [previewImage])

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }


    }

    //@ts-ignore
    const handleChange: UploadProps['onchange'] = ({ fileList: newFileList }) => setFileList(newFileList);


    /**
     * 
     * @param e 
     * @returns 
     */
    const handleUpload = async (file: any) => {
        try {
            const formData = new FormData();

            //@ts-ignore
            formData.append('files[]', file as FileType)
            // fileList.forEach((file) => {
            //     formData.append('files[]', file as FileType);
            // })
            setUploading(true);
            let OpenAIFile = await uploadFileForOpenAI({ purpose: 'assistants', formData });
            if (OpenAIFile && OpenAIFile.status === 'processed') {
                setFileList([]);
                message.success('upload successfully.');
                setUploadedFileList([...uploadedFileList, OpenAIFile]);
                getUploadFile?.([...uploadedFileList, OpenAIFile]);
            }
            else {
                message.error('upload failed');
            }
            setUploading(false);
        }
        catch (e) {
            throw e;
        }

    }

    const props: UploadProps = {
        onRemove: async (file) => {
            const index = fileList.indexOf(file);
            try {
                await deleteOpenAIFile(uploadedFileList[index].id);
                const newFileList = fileList.slice();

                newFileList.splice(index, 1);
                setFileList(newFileList);
                setUploadedFileList([...uploadedFileList].splice(index, 1));
                getUploadFile?.([...uploadedFileList].splice(index, 1));
            }
            catch (e) {
                throw e;
            }



        },
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                message.error(`${file.name} is not a pdf file`)
            }

            return isPDF || Upload.LIST_IGNORE;
            // setFileList([...fileList, file]);
            return false;
        },
        fileList
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload {...props}
                //@ts-ignore
                action={handleUpload}
                onPreview={handlePreview}
                onChange={handleChange}
                listType='picture'
                maxCount={4}
            >
                {/* {fileList.length >= 3 ? null : uploadButton} */}
                <Button icon={<UploadOutlined />}>Upload PDF!</Button>
            </Upload>
            {/* <Button
                type='primary'
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
            // style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button> */}
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    )
}