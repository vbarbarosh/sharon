function array_extract(items, keys)
{
    return items.map(item => keys.map(key => item[key]));
}

export default array_extract;
