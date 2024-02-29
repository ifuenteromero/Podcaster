import usePodcasts from '../hooks/usePodcasts';
import PodcastCard from './PodcastCard';

const PodcastList = () => {
    const { podcasts } = usePodcasts();
    return (
        <ul className='podcast-list'>
            {podcasts.map((podcast) => (
                <li key={podcast.id}>
                    <PodcastCard {...podcast} />
                </li>
            ))}
        </ul>
    );
};

export default PodcastList;
