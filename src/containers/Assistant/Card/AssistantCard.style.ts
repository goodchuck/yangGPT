import styled from 'styled-components';
import { Card } from 'antd';
import { motion } from 'framer-motion';

export const StyledCardContainer = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
  padding: 20px;
  margin: 10px;
`;

export const StyledMotionCard = styled(motion(Card))`
  margin: 10px;
`;
