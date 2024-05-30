'use client';

import React, { useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Image, message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { deleteOpenAIFile, uploadFileForOpenAI } from '@/app/api/files/Files';

type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Props {
  getUploadFile?: (file: any) => any;
}

/**
 * 테스트용으로 만든 업로드 컴포넌트
 * PDF만 업로드 가능하도록 설정됨.
 * @returns React Component
 */
const UploadComponent: React.FC<Props> = ({ getUploadFile }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFileList, setUploadedFileList] = useState<any[]>([]);

  useEffect(() => {
    console.log('fileList', fileList);
  }, [fileList]);

  useEffect(() => {
    console.log(previewImage);
  }, [previewImage]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      const preview = await getBase64(file.originFileObj as FileType);
      const newFileList = fileList.map((f) => {
        if (f.uid === file.uid) {
          return { ...f, preview };
        }
        return f;
      });
      setFileList(newFileList);
      setPreviewImage(preview);
      setPreviewOpen(true);
    }
    // else {
    //   setPreviewImage(file.url || file.preview);
    //   setPreviewOpen(true);
    // }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleUpload = async (file: FileType) => {
    const formData = new FormData();
    formData.append('files[]', file);

    setUploading(true);
    try {
      const OpenAIFile = await uploadFileForOpenAI({
        purpose: 'assistants',
        formData,
      });
      if (OpenAIFile && OpenAIFile.status === 'processed') {
        setFileList([]);
        message.success('Upload successful.');
        const updatedFileList = [...uploadedFileList, OpenAIFile];
        setUploadedFileList(updatedFileList);
        getUploadFile?.(updatedFileList);
      } else {
        message.error('Upload failed');
      }
    } catch (error) {
      message.error('Upload error');
    }
    setUploading(false);
  };

  const onRemove = async (file: UploadFile) => {
    const index = fileList.indexOf(file);
    try {
      await deleteOpenAIFile(uploadedFileList[index].id);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      const updatedUploadedFileList = uploadedFileList.slice();
      updatedUploadedFileList.splice(index, 1);
      setUploadedFileList(updatedUploadedFileList);
      getUploadFile?.(updatedUploadedFileList);
    } catch (error) {
      message.error('Remove file error');
    }
  };

  const beforeUpload = async (file: FileType) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error(`${file.name} is not a PDF file`);
      return Upload.LIST_IGNORE;
    }

    await handleUpload(file);
    return false; // 업로드를 수동으로 처리하므로 false 반환
  };

  return (
    <>
      <Upload
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        listType="picture"
        maxCount={4}
      >
        <Button icon={<UploadOutlined />}>Upload PDF!</Button>
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadComponent;
