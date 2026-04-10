"use client";

import LoginForm from "@/components/form/auth/login.form";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const submitForm = async (username: string, password: string) => {
        const user = await sendRequest<IResponse<any>>({
            url: `${process.env.BACKEND_API}/auth/login`,
            method: "POST",
            body:{
                username: username,
                password: password
            }
        });
        router.replace('/')
    }

    return (<LoginForm submit={submitForm} />);
}