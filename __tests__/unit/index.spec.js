import {describe, it, beforeEach, afterEach} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import Home from '@/pages/index';

describe('homepage smoke test', () => {
    let server;

    beforeEach(() => {
        server = setupServer(
            rest.get('/api/images', (req, res, ctx) => {
                return res(
                    ctx.json({
                        images: [
                            {
                                id: 1,
                                name: 'foo',
                                tag: '1.0',
                                size: '100MB',
                                created: '2023-03-01 12:00:00',
                                vulnerabilities: 10,
                            },
                        ],
                    })
                );
            }));
        server.listen();
    });

    afterEach(() => {
        server.close();
    });

    it('should render without crashing', async () => {
        render(<Home />);
        await screen.findAllByText('foo');
    });
});
