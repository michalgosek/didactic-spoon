import express, { Express } from "express";
import morgan from "morgan";
import { UserRepository } from "../repositories/user";
import { GetAllKeySkill, GetAllUsersHandler } from "./handlers";
import middleware from "./middlewares";

function CreateRouter(userService: UserRepository): Express {
    const router: Express = express();
    /** Logging */
    router.use(morgan('dev'));
    /** Parse the request */
    router.use(express.urlencoded({ extended: false }));
    /** Takes care of JSON data */
    router.use(express.json());

    /** Routes */
    router.use('/users', GetAllUsersHandler(userService));
    router.use('/skills', GetAllKeySkill(userService));

    /** Middlewares */
    router.use(middleware.NotFoundMiddleware);
    router.use(middleware.CorsMiddleware);
    return router;
}

export default {
    CreateRouter
}