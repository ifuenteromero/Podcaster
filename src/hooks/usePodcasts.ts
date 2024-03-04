import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import endpoints from '../services/endpoints';
import { CanceledError } from 'axios';
import imagePlaceholder from '../images/no-image-placeholder.webp';

export interface Podcast {
    id: string;
    author: string;
    title: string;
    imgUrl: string;
}

interface PodcastResponse {
    'im:name': {
        label: string;
    };
    id: {
        attributes: {
            'im:id': string;
        };
    };
    'im:artist': {
        label: string;
    };
    'im:image': {
        label: string;
        attributes: {
            height: string;
        };
    }[];
}

export interface FetchPodcastResponse {
    feed: {
        entry: PodcastResponse[];
    };
}

const mapPodcastResponseToPodcast = (podcast: PodcastResponse): Podcast => ({
    id: podcast.id.attributes['im:id'],
    title: podcast['im:name'].label,
    author: podcast['im:artist'].label,
    imgUrl:
        podcast['im:image'].find((img) => img.attributes.height === '170')
            ?.label || imagePlaceholder,
});

const usePodcasts = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        apiClient
            .get<FetchPodcastResponse>(endpoints.topPodcasts, {
                signal: controller.signal,
            })
            .then((res) => {
                const fetchedPodcasts = res.data.feed.entry.map(
                    mapPodcastResponseToPodcast
                );
                setPodcasts(fetchedPodcasts);
            })
            .catch((error) => {
                if (error instanceof CanceledError) return;
                setError(error.message);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return { podcasts, error, isLoading };
};

export default usePodcasts;
