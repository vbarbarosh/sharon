function now_ymd_his()
{
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const i = now.getMinutes();
    const s = now.getSeconds();
    return `${y}/${m}/${d} ${h}:${i}:${s}`.replace(/\d+/g, v => v.padStart(2, '0'));
}

export default now_ymd_his;
