"use client";

import { sendRequest } from '@/utils/api';
import { Avatar, List, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../../../../backend/src/modules/products/schemas/product.schema';

interface DataType {
    gender?: string;
    name?: string;
    email?: string;
    avatar?: string;
    loading: boolean;
}

export default function Products() {
    const [initLoading, setInitLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Product[]>([]);
    const [list, setList] = useState<DataType[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchList = async () => {
            let response: IResponse<Product>;
            try {
                response = await sendRequest<IResponse<Product>>({
                    url: 'products',
                    method: "GET"
                })

                if ((response.data as Product[]).length !== 0) {
                    setData(response.data as Product[]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchList();
    }, []);

    return (
        <List
            itemLayout="vertical"
            size="large"
            loading={loading}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
                hideOnSinglePage: true
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.thumbnail} />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}