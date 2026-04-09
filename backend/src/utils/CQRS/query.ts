import aqp from "api-query-params";
import { Model } from "mongoose";

export async function Queries<T>(model: Model<T>, query: any, current: number, pageSize: number, select: string = ''): Promise<{ meta: any, data: T[] }> {
    const { filter, sort } = aqp(query);

    if (filter.current) {
        delete filter.current;
    }
    if (filter.pageSize) {
        delete filter.pageSize;
    }

    const total = (await model.find(filter)).length;
    const totalPages = Math.ceil(total / pageSize);

    const skip = (current - 1) * pageSize;

    const result = await model
        .find(filter)
        .limit(pageSize)
        .skip(skip)
        .select(select)
        .sort(sort as any);
    return {
        meta: {
            current: current,
            pageSize: pageSize,
            pages: totalPages,
            total: total,
        },
        data: result,
    };
}