import PodcastCard from '../components/PodcastCard';
import usePodCasts from '../hooks/usePodcasts';

const Home = () => {
    const { podcasts } = usePodCasts();
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
export default Home;
