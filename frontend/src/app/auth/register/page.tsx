"use client";

import { sendRequest } from "@/utils/api";

export default function RegisterPage() {
    const submitForm = async (payload: User) => {
        const user = await sendRequest<IResponse<User>>({
            url: `${process.env.BACKEND_URL}/auth/register`,
            method: "POST",
            body: payload
        });

        if (!user) {
            return;
        }
    }

    return (
        <div>Register</div>
    );
}