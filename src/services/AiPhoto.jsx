let pixelAPiKey = "OtPW41cGNSVlm7xswfckPUOiXK37bkBhSLHKTCBIF1D8vTBrmm4NUeds";

export async function AiPhoto(place) {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(place)}&per_page=1`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: pixelAPiKey
            }
        });

        const data = await response.json();

        const photoUrl = data?.photos?.[0]?.src?.original;

        // console.log(` ${place} → ${photoUrl}`);
        return photoUrl || null;
    } catch (err) {
        console.error(` Failed to fetch image for ${place}:`, err);
        return null;
    }
}
