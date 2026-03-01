import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
    onRequest: async (event) => {
        const { pathname } = new URL(event.request.url);
        event.locals.path = pathname;
        
    }
});