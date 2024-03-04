"use client"
import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

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
    // getItem('audio', '1', <PieChartOutlined />),
    // getItem('image', '2', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),

    getItem('Audio', '/audio', <MailOutlined />, [
        getItem('create-speech', '/audio/create-speech'),
        // getItem('Option 6', '6'),
        // getItem('Option 7', '7'),
        // getItem('Option 8', '8'),
    ]),

    getItem('Image', '/image', <AppstoreOutlined />, [
        getItem('generator', '/image/generator'),
        getItem('edit', '/image/edit'),

        // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
    getItem('text', '/text', <AppstoreOutlined />, [
        getItem('gpt3_5', '/text/gpt3_5'),
    ]),
];

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const pathname = usePathname();
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        console.log(pathname);
        if (e.key === 'home') {
            router.replace('/')
        } else if (pathname === e.key) {

        }
        else {
            router.replace(e.key)
        }

    };
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ width: 256, height: '100dvh' }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                onClick={onClick}
                items={items}
            />
        </div>
    )
}