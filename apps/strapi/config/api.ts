import { type ApiConfig } from "./types";

const api: ApiConfig = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};

export default api;
