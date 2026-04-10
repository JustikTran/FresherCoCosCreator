interface Product {
    _id: string;
    name: string;
    thumbnail: string;
    price: number;
    description: string;
    brand: string;
    isOutStock: boolean;
    deletedAt?: Date;
    createAt: Date;
    updateAt: Date;
    productOptions: ProductOption[];
}

interface ProductOption {
    _id: string;
    productId: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
    deletedAt?: Date
}

interface ProductCost {
    _id: string;
    productId: string;
    optionId: string;
    importPrice: number;
    importDate: Date;
}