const escapeReg = string => {
    let apostrophe = new RegExp('&#x27;', 'g');
    let quote = new RegExp('&quot;', 'g');
    let and = new RegExp('&amp;', 'g');
    
    return string.replace(apostrophe, "\'")
                .replace(quote, "\"")
                .replace(and, "\&");
}

module.exports = escapeReg;