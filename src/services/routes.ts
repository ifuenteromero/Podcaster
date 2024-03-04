const baseUrl = import.meta.env.BASE_URL;
const root = '/';
const podcastDetail = (podcastId: string) => `/podcast/${podcastId}`;

export default {
    baseUrl,
    root,
    podcastDetail,
};
