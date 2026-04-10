"use client";

import EmptyPage from "@/components/common/empty";
import Loading from "@/components/common/page.loading";
import { sendRequest } from "@/utils/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product | null>();

    useEffect(() => {
        const fetchData = async () => {
            let response: IResponse<Product>;
            try {
                response = await sendRequest<IResponse<Product>>({
                    url: `product/${id}`,
                    method: "GET"
                })

                if (!response.data) {
                    setProduct(response.data);
                }
            } catch {
                console.error(response!.error);

            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [id])

    if (!loading) {
        return (
            <Loading />
        )
    }

    if (!product) {
        return (
            <EmptyPage />
        );
    }

    return (
        <div>
            detail
        </div>
    )
}