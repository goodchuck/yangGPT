'use client';

import { SideBar } from '@/app/_component/SideBar';
import Footer from '@/components/Footer/Footer';
import { Flex } from 'antd';

import React from 'react';
import StyledDefaultLayout from './DefaultLayout.style';

interface DefaultLayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <StyledDefaultLayout>
      <SideBar />
      <div className="defaultlayout__container">
        {children}
        <Footer />
      </div>
    </StyledDefaultLayout>
  );
};

export default DefaultLayout;
