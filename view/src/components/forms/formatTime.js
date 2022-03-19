const formatTime = string => {
    const time = new RegExp('T\\d\\d:\\d\\d:\\d\\d.\\d\\d\\dZ', 'g'); // format time in update book instance: YYYY-MM-DDT04:14:28.000Z -> YYYY-MM-DD
    return string.replace(time, "");
}

module.exports = formatTime;