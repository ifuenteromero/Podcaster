import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PodcastDetailPage from '../pages/PodcastDetailPage';
import routes from './routes';

const router = createBrowserRouter(
    [
        {
            path: routes.root,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: routes.podcastDetail(':podcastId'),
                    element: <PodcastDetailPage />,
                },
            ],
        },
    ],
    { basename: routes.baseUrl }
);

export default router;
