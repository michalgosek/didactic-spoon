import express, { Express } from "express";
import morgan from "morgan";
import { UserRepository } from "../repositories/user";
import handlers from "./handlers";
import middleware from "./middlewares";

function CreateRouter(userService: UserRepository): Express {
    const router: Express = express();
    /** Logging */
    router.use(morgan('dev'));
    /** Parse the request */
    router.use(express.urlencoded({ extended: false }));
    /** Takes care of JSON data */
    router.use(express.json());
        
    /** Routes - it will be good to create some router group for common prefix endpoint */ 
    router.get('/v1/users', handlers.GetAllUsersHandler(userService));
    router.get('/v1/users/skills', handlers.GetAllKeySkill(userService));
    router.post('/v1/users/state', handlers.GetUsersByState(userService));
    router.post('/v1/users/city', handlers.GetUsersByCity(userService));

    /** Middlewares */
    router.use(middleware.NotFoundMiddleware);
    router.use(middleware.CorsMiddleware);
    return router;
}

export default {
    CreateRouter
}