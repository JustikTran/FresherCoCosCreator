"use client";

import { Alert, Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

interface IForm {
    submit: (username: string, pass: string) => void;
}

export default function LoginForm({ submit }: IForm) {
    const [form] = Form.useForm();

    const onFinish = async () => {
        const username = form.getFieldValue('username');
        const password = form.getFieldValue('password');
        return await submit(username, password);
    }

    return (
        <div className='p-8 border rounded-lg shadow-lg bg-white'>
            <p className='uppercase font-black text-4xl text-center mb-10'>Login</p>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>


    );
}