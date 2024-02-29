import {
    DefaultBodyType,
    PathParams,
    ResponseComposition,
    RestContext,
    RestRequest,
    rest,
} from 'msw';
import { setupServer } from 'msw/node';

type HandlerConfig<TResponseData> = {
    path: string;
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';
    response: (
        req: RestRequest<never, PathParams<string>>,
        res: ResponseComposition<DefaultBodyType>,
        ctx: RestContext
    ) => TResponseData;
};

const createServer = <T extends DefaultBodyType>(
    handlerConfig: HandlerConfig<T>[]
) => {
    const handlers = handlerConfig.map((config) => {
        const { path, method = 'get', response } = config;
        return rest[method](
            path,
            (
                req: RestRequest<never, PathParams<string>>,
                res: ResponseComposition<DefaultBodyType>,
                ctx: RestContext
            ) => {
                return res(ctx.json(response(req, res, ctx)));
            }
        );
    });

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    afterAll(() => {
        server.close();
    });
};

export default createServer;
