import { Link } from 'react-router-dom';
import usePodcasts from '../hooks/usePodcasts';
import PodcastCard from './PodcastCard';
import routes from '../services/routes';

const PodcastList = () => {
    const { podcasts } = usePodcasts();
    return (
        <ul className='podcast-list'>
            {podcasts.map((podcast) => (
                <li key={podcast.id}>
                    <Link to={routes.podcastDetail(podcast.id)}>
                        <PodcastCard {...podcast} />
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default PodcastList;
