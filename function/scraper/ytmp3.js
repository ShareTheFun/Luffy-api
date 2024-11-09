const ytdl = require('@distube/ytdl-core');

exports.config = {
    name: 'ytmp3',
    author: 'Jmlabaco',
    category: 'tools',
    description: 'Download audio version of the video using url of it',
    link: ['/ytcore?url=https://youtu.be/rtOvBOTyX00?si=TSrrSiGghPDjI5uz']
};

exports.initialize = async function ({ req, res }) {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        const info = await ytdl.getInfo(url);

        // Filter to get only audio formats (formats with audio but no video)
        const audioFormats = info.formats.filter(format => !format.hasVideo && format.hasAudio);

        // Return only audio formats
        res.setHeader('Content-Type', 'application/json');
        res.json(audioFormats);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
