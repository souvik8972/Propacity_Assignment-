const { extname } = require("path")


function getContentType(filename) {
    const ext = extname(filename).toLowerCase();

    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.bmp':
            return 'image/bmp';
        case '.webp':
            return 'image/webp';
        case '.svg':
            return 'image/svg+xml';
        case '.mp4':
            return 'video/mp4';
        case '.webm':
            return 'video/webm';
        case '.ogg':
            return 'video/ogg';
        case '.mp3':
            return 'audio/mp3';
        case '.wav':
            return 'audio/wav';
        case '.aac':
            return 'audio/aac';
        case '.pdf':
            return 'application/pdf';
        case '.doc':
        case '.docx':
            return 'application/msword';
        case '.xls':
        case '.xlsx':
            return 'application/vnd.ms-excel';
        case '.ppt':
        case '.pptx':
            return 'application/vnd.ms-powerpoint';


        default:
            return 'application/octet-stream';
    }
}

module.exports = getContentType;