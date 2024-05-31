'use client';

import React from 'react';
import useLoadingStore from '@/store/loadingStore';
import { StyledSpinner, StyledSpinnerOverlay } from './LoadingSpinner.styles';

const LoadingSpinner: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <StyledSpinnerOverlay>
      <StyledSpinner />
    </StyledSpinnerOverlay>
  );
};

export default LoadingSpinner;
