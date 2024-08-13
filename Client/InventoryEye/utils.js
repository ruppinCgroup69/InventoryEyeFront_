export function formatDate(date) {

    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let d = date.getDate();

    return `${d}/${m}/${y} `;
}

export function formatTime(date) {
    let h = date.getHours();
    let m = date.getMinutes();
    return `${h}:${m}`;
}

export function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        return dist / 1000;
    }
}

export function generateCustomPassword(length) {
    const getRandomChar = () => {
        const charSets = [
            [48, 57],  // Numbers (0-9)
            [65, 90],  // Uppercase letters (A-Z)
            [97, 122], // Lowercase letters (a-z)
            [33, 47],  // Special characters (!"#$%&()*+,-./)
        ];
        // Select a random character set
        const charSet = charSets[Math.floor(Math.random() * charSets.length)];
        // Generate a random character code from the selected set
        const charCode = Math.floor(Math.random() *
            (charSet[1] - charSet[0] + 1)) + charSet[0];
        // Convert the character code to a character
        return String.fromCharCode(charCode);
    };
    let password = '';
    for (let i = 0; i < length; i++) {
        password += getRandomChar();
    }

    return password;
}