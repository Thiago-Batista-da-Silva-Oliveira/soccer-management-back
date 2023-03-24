export interface ISendMailData {
    subject: string;
    body: string;
    to: string;
  }
  
  export interface ISendMailProvider {
    sendMail: (data: ISendMailData) => Promise<void>;
  }
  