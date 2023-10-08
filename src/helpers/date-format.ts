export const formatDate = (date: string): string => {
    const formattedDate = new Date(date);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return formattedDate.toLocaleDateString('en-US', options);
};
