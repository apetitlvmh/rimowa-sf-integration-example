import express from "express";
import { SF } from './utils/sf';

// port is now available to the Node.js runtime
// as if it were an environment variable
const port: number = 8085; // default port to listen

class App {
    public app: express.Application;
  
    public port: number;
  
    constructor(port: any) {
      // @ts-ignore
      const app: any = express();
      this.app = app;
      this.port = port;
    }
  
    public listen() {
      this.app.listen(this.port, async () => {
        const sf: SF = new SF();
        await sf.getToken();
        await sf.connect();
        sf.getCustomer();
        console.log(`App listening on the port ${this.port}`);
      });
    }
  }
  
const application: App = new App(port);

application.listen();
