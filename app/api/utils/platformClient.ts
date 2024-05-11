import axios from "axios";
export const BASE_URL = "https://api.dify.ai/v1";

export const routes = {
  apps: {
    method: "GET",
    url: (app_id: string) => `/apps/${app_id}`,
  },
  createChatMessage: {
    method: "POST",
    url: (app_id: string) => `/apps/${app_id}/chat-messages`,
  },
  // application: {
  //   method: "GET",
  //   url: () => `/parameters`,
  // },
  // feedback: {
  //   method: "POST",
  //   url: (message_id) => `/messages/${message_id}/feedbacks`,
  // },
  // createCompletionMessage: {
  //   method: "POST",
  //   url: () => `/completion-messages`,
  // },
  // createChatMessage: {
  //   method: "POST",
  //   url: () => `/chat-messages`,
  // },
  // getConversationMessages: {
  //   method: "GET",
  //   url: () => `/messages`,
  // },
  // getConversations: {
  //   method: "GET",
  //   url: () => `/conversations`,
  // },
  // renameConversation: {
  //   method: "POST",
  //   url: (conversation_id) => `/conversations/${conversation_id}/name`,
  // },
  // deleteConversation: {
  //   method: "DELETE",
  //   url: (conversation_id) => `/conversations/${conversation_id}`,
  // },
  // fileUpload: {
  //   method: "POST",
  //   url: () => `/files/upload`,
  // },
  // runWorkflow: {
  //   method: "POST",
  //   url: () => `/workflows/run`,
  // },
};

export type IPlatformProps = {
  token: string,
  baseUrl: string,
}

export class PlatformClient {
  // apiKey: string;
  token: string;
  baseUrl: string;

  constructor({ token, baseUrl}: IPlatformProps) {
    // this.apiKey = token;
    this.token = token;
    this.baseUrl = baseUrl;
  }


  async sendRequest(
    method: string,
    endpoint: string,
    data = null,
    params = null,
    stream = false,
    headerParams = {}
  ) {
    const headers = {
      ...{
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5OTgyNzAsImRhdGEiOnsiZW1haWwiOiJqYWNrbWFAZ2FtaWwuY29tIiwiaWQiOiIyMmE2NjQzZS00MGM3LTQ3MGItYTM4MS04NzA1ZWQzYzg2ZjMifSwiaWF0IjoxNzE1MzkzNDcwfQ.rS9_gGY7jhtoIlAaUiCwgjIwm1PRZFBgJffQWAjFhQE",
        "x-inspire-hub-token": `${this.token}`,
        "Content-Type": "application/json",
      },
      ...headerParams
    };

    const url = `${this.baseUrl}${endpoint}`;
    let response;
    if (stream) {
      response = await axios({
        method,
        url,
        data,
        params,
        headers,
        responseType: "stream",
      });
    } else {
      response = await axios({
        method,
        url,
        data,
        params,
        headers,
        responseType: "json",
      });
    }

    return response;
  }

  getAppById(appId: string) {
    return this.sendRequest(
      routes.apps.method,
      routes.apps.url(appId)
    );
  }

  createChatMessage(
    app_id: string,
    inputs: any,
    query: string,
    user: string,
    stream = false,
    conversation_id = null,
    files = null
  ) {
    const data = {
      inputs,
      query,
      user,
      response_mode: stream ? "streaming" : "blocking",
      files,
    };
    if (conversation_id) data.conversation_id = conversation_id;

    return this.sendRequest(
      routes.createChatMessage.method,
      routes.createChatMessage.url(app_id),
      data,
      null,
      stream
    );
  }
}
