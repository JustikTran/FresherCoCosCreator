"use client";

import LoginForm from "@/components/form/login.form";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function login() {
    const router = useRouter();

    const submitForm = async (username: string, password: string) => {
        // const user = await sendRequest<IResponse<any>>({
        //     url: `${process.env.BACKEND_API}/auth/login`,
        //     method: "POST",
        // });
        router.replace('/')
    }

    return (<LoginForm submit={submitForm} />);
}