export const formatDate = (date: string): string => {
    const formattedDate: Date = new Date(date);
    const localeDate = formattedDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return localeDate;
}
