export function formatDate(date) {

    let m = date.getMonth()+1;
    let y = date.getFullYear();
    let d = date.getDate();

    return `${d}/${m}/${y} `;
}

export function formatTime(date){
    let h = date.getHours();
    let m = date.getMinutes();
    return `${h}:${m}`;
}