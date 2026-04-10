import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading(message?: string) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spin description={message ?? 'Loading...'} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    )
}