import { CallConfig } from "../types";
import { isLoggedIn } from "../utils/CommonHelper";

const API_URL = process.env.REACT_APP_API_URL;

export const get = (endpoint: string, params = {}) => {
  return makeCall("GET", endpoint, { params });
};

export const post = (endpoint: string, payload: any, params = {}) => {
  return makeCall("POST", endpoint, { params, payload });
};

export const put = (endpoint: string, payload: any, params = {}) => {
  return makeCall("PUT", endpoint, { params, payload });
};

export const upload = (endpoint: string, files: FileList) => {
  return makeCall("PUT", endpoint, { files });
};

export const deleteRequest = (endpoint: string) => {
  return makeCall("DELETE", endpoint, {});
};

export const getUrl = (endpoint: string) =>
  new URL(API_URL + "/api/v1/" + endpoint);

const handleResponse = async (response: any) => {
  return new Promise((resolve) => {
    if (response) {
      response
        .json()
        .then((json: any) => resolve(json))
        .catch(() => resolve(null));
    } else {
      resolve(null);
    }
  });
};

const jsonHeader = {
  "Content-Type": "application/json",
};

const makeCall = async (
  method: string,
  endpoint: string,
  { params = {}, payload, files }: CallConfig
) => {
  let url = getUrl(endpoint);
  let headers: any = files ? {} : jsonHeader;
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken || isLoggedIn())
    headers.Authorization = "Bearer " + accessToken;

  let fetchConfig: RequestInit = {
    method,
    headers,
    body: null,
  };

  if (files) {
    const data = new FormData();
    for (const file of Array.from(files)) {
      data.append("file", file);
    }

    fetchConfig.body = data;
  }

  if (payload) {
    fetchConfig.body = JSON.stringify(payload);
  }

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        params[key].forEach((element: any) => {
          url.searchParams.append(key, element);
        });
      } else {
        url.searchParams.append(key, params[key]);
      }
    }
  });

  let response;

  try {
    response = await fetch(String(url), fetchConfig);
  } catch (error) {
    throw new Error("There is a problem connecting to the server.");
  }

  return handleResponse(response);
};
