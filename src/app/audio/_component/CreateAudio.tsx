'use client';

import OpenAI from 'openai';
// import fs from 'fs';
// import path from 'path';
import { useEffect, useState } from 'react';

import { Flex, Input, Form, Button, Spin } from 'antd';

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { TextArea } = Input;

// const speechFile = path.resolve('./speech.mp3');

interface AudioPlayerProps {
  buffer: ArrayBuffer;
}

function AudioPlayer({ buffer }: AudioPlayerProps) {
  const [audio] = useState(
    new Audio(URL.createObjectURL(new Blob([buffer], { type: 'audio/mp3' }))),
  );

  const playAudio = () => {
    console.log({ audio });
    audio.play();
  };

  return (
    <div>
      <button onClick={playAudio}>Play</button>
    </div>
  );
}

export function CreateAudioGPT() {
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buffer, setBuffer] = useState<ArrayBuffer>();
  async function main(message: string) {
    setIsLoading(true);
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: message,
    });
    // console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    setBuffer(buffer);
    // await fs.promises.writeFile(speechFile, buffer);
    setIsLoading(false);
  }
  const onFinish = (values: any) => {
    main(values.message);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // console.log('change:', e.target.value);
  };

  return (
    <Flex gap="middle" vertical>
      <Form name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item name="message" label="message">
          <TextArea
            showCount
            maxLength={200}
            onChange={onChange}
            placeholder="can resize"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        {isLoading && <Spin />}
        {!isLoading && message}
        {buffer && <AudioPlayer buffer={buffer} />}
      </div>
    </Flex>
  );
}
