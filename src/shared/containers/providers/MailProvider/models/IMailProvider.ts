export interface ISendMailData {
    subject: string;
    body: string;
    to: string;
  }
  
  export interface IMailProvider {
    sendMail: (data: ISendMailData) => Promise<void>;
  }
  