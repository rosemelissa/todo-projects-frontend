function formatDate(inputDate: string): string{
    const utcDate = new Date(inputDate);
    const offset = utcDate.getTimezoneOffset();
    const localDate = new Date(utcDate.getTime() - offset*60*1000);
    return (localDate.toISOString().slice(0, 10));
}

export default formatDate;