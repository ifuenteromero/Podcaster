import { Podcast } from '../hooks/usePodcasts';
import '../styles/podcastCard.scss';
import Icon from './Icon';

const PodcastCard = ({ title, imgUrl, author }: Podcast) => {
    return (
        <article className='podcast-card'>
            <img className='podcast-card__image' src={imgUrl} alt={title} />
            <div className='podcast-card__info'>
                <h2 className='podcast-card__title' title={title}>
                    {title}
                </h2>
                <p className='podcast-card__author' title={author}>
                    <Icon title='Author' iconName='FaRegUser' />
                    {author}
                </p>
            </div>
        </article>
    );
};

export default PodcastCard;
