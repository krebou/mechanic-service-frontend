export function getAllByCreatedAt<T>(array: any, value: string | number) {
    return array.filter((obj: { createdAt: number }) => Number(obj.createdAt) >= value);
}
