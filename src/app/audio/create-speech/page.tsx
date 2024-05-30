import { Flex } from 'antd';
import { CreateAudioGPT } from '../_component/CreateAudio';

export default function Page() {
  return (
    <Flex gap="middle" vertical>
      <p>영어만 반응해요</p>
      <CreateAudioGPT />
    </Flex>
  );
}
