export const dateFormat = (date: string): string => {
    const monthNames: string[] = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

    return `${date.substring(8, 10)} ${monthNames[parseInt(date.substring(5, 7)) - 1]} ${date.substring(0, 4)}`;
}