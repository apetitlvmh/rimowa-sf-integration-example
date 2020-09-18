const sf = require('node-salesforce');
var jsforce = require('jsforce');
require('dotenv').config()

class SF {

  public client_id: any = process.env.CLIENT_ID;

  public client_secret: any = process.env.CLIENT_SECRET;

  public user_name: any = process.env.SF_USER_NAME;

  public password: any = process.env.SF_PASSWORD;

  public sf_url: any = process.env.SF_HOST;

  public sf_callback_url: any = process.env.CALLBACK_URL;

  public token?: string;

  public connection?: any;

  constructor() {
    console.log(this.client_id);
    console.log(this.sf_url);
  }

  public getToken(): void {
    var conn = new jsforce.Connection({
      oauth2 : {
        loginUrl: this.sf_url,
        clientId: this.client_id,
        clientSecret: this.client_secret,
        redirectUri: this.sf_callback_url
      }
    });
    conn.login(this.user_name, this.password, function(err: any, userInfo: any) {
      if (err) { 
        return console.error(err); 
      }
      console.log(userInfo);
      // @ts-ignore
      this.token = conn.accessToken;
    });
  }

  public connect(): void {
    this.connection = new jsforce.Connection({
      instanceUrl: this.sf_url,
      accessToken: this.token
    })
  }

  public getCustomer(): any {
    this.connection.query("SELECT Id, Name FROM Account", (err: any, result: any) => {
      if (err) { return console.error(err); }
      console.log("total : " + result.totalSize);
      console.log("fetched : " + result.records.length);
    });
  }
}

export { SF };