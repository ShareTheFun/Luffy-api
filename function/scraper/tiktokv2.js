const { tikdown } = require("nayan-media-downloader");

exports.config = {
    name: 'tiktokv2',
    author: 'Jmlabaco',
    category: 'tools',
    description: 'Download Tiktok Video uisng url',
    link: ['/tiktokv2?url=https://www.tiktok.com/@bini_mikha/video/7303569463192931589']
};

exports.initialize = async function ({ req, res }) {
    // Get the TikTok URL from the request query parameters
    const tiktokUrl = req.query.url;

    try {
        // Fetch the TikTok video details using nayan-media-downloader
        const videoData = await tikdown(tiktokUrl);

        // Check if the data is available
        if (videoData && videoData.data) {
            // Send only the relevant video data
            return res.status(200).json(videoData.data);
        } else {
            return res.status(404).json({ error: 'No data found for the provided URL.' });
        }
    } catch (error) {
        // Handle errors, e.g., if the URL is not accessible or the video is unavailable
        return res.status(500).json({ error: 'Failed to fetch TikTok video data', details: error.message });
    }
};
