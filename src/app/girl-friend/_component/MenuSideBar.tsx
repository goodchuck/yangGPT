"use client";
import React from "react";
import styled from "styled-components";
import {
    UserOutlined,
    CommentOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
type MenuItem = Required<MenuProps>['items'][number];
const StyledMenuSideBar = styled.div`
    /* width:256px; */
    height:100vh;
`


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('friends', '1', <UserOutlined />),
    getItem('chatting', '2', <CommentOutlined />),
    getItem('logout', '3', <LogoutOutlined />),
];


export const MenuSideBar = () => {

    return (
        <StyledMenuSideBar>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                // theme="dark"
                inlineCollapsed={true}
                items={items}
            />
        </StyledMenuSideBar>
    )

}