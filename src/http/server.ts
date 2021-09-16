import { MongoDB, DisconnectDataSource } from "../mongodb/service";
import http from 'http';
import { UserService } from "../users/service";
import router from '../api/router';
 
async function listen() {
    // Dependecies:
    const userService = UserService({ usersRepository: MongoDB })
    const serverRouter = router.CreateRouter(userService);
    /** Server */
    const httpServer = http.createServer(serverRouter);
    const PORT: any = process.env.PORT ?? 6060;
    httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
}

async function gracefulShutdown() {
    process.on('SIGINT', function () {
        console.log("Gracefull shutdown...")
        DisconnectDataSource().then(() => {
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        }).catch((err: Error) => {
            console.log('Mongoose disconnected on app termination failed');
            console.log('Reason:', err.message);
        });
    });
}

(async () => {
    await listen()
    await gracefulShutdown();
})()

