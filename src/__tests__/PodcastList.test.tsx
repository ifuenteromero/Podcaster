import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PodcastList from '../components/PodcastList';
import { FetchPodcastResponse } from '../hooks/usePodcasts';
import endpoints from '../services/endpoints';
import { podcastListResponseData } from '../tests/PodcastListResponseData';
import createServer from '../tests/createServer';

jest.mock('../services/routes', () => {
    return {
        podcastDetail: () => '',
    };
});

const cardTitle = podcastListResponseData.feed.entry[0]['im:name'].label;
const cardAuthor = podcastListResponseData.feed.entry[0]['im:artist'].label;

const endpoint = `${endpoints.baseUrl}${endpoints.topPodcasts}`;

createServer<FetchPodcastResponse>([
    {
        path: endpoint,
        response: () => {
            return podcastListResponseData;
        },
    },
]);

const renderComponent = async () => {
    render(
        <BrowserRouter>
            <PodcastList />
        </BrowserRouter>
    );
    const items = await screen.findAllByRole('listitem');
    return items;
};

test('shows a list of podcasts', async () => {
    const items = await renderComponent();
    expect(items).toHaveLength(1);
});

test('shows title', async () => {
    const [item] = await renderComponent();
    const title = within(item).getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(cardTitle);
});

test('shows author', async () => {
    const [item] = await renderComponent();
    const author = within(item).getByText(cardAuthor);
    expect(author).toBeInTheDocument();
});

test('shows an image', async () => {
    const [item] = await renderComponent();
    const image = within(item).getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', cardTitle);
});
