import axios from "axios";
import { notification } from "antd";
import AppConsts from "../../../constants/appconst";
import { getToken } from "../../utils/authorization";

const qs = require("qs");
function getCookieValue(key: string): string | null {
  var equalities = document.cookie.split("; ");
  for (var i = 0; i < equalities.length; i++) {
    if (!equalities[i]) {
      continue;
    }

    var splitted = equalities[i].split("=");
    if (splitted.length !== 2) {
      continue;
    }

    if (decodeURIComponent(splitted[0]) === key) {
      return decodeURIComponent(splitted[1] || "");
    }
  }

  return null;
}

class httpClientFactory {
  create(baseUrl: any) {
    const http = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      paramsSerializer: function (params) {
        return qs.stringify(params, { encode: false });
      },
    });

    http.interceptors.request.use(
      function (config) {
        if (getToken()) {
          config.headers.common["Authorization"] = "Bearer " + getToken();
          config.headers.common["Lang-Code"] = getCookieValue(
            AppConsts.defaultLanguage
          );
        }
        return config;
      },

      function (error) {
        return Promise.reject(error);
      }
    );

    http.interceptors.response.use(
      (response) => {
        return response;
      },

      (error) => {
        if (error?.response?.data?.message) {
          notification["error"]({
            duration: 15,
            message: error?.response?.data?.message,
          });
        }
        if (error?.response?.status === 401) {
          localStorage.clear();
          window.location.href = `${AppConsts.publicUrl}/user/login`;
        } else {
          notification["error"]({
            duration: 15,
            message: error?.message,
          });
        }
        return Promise.reject(error);
      }
    );
    return http;
  }
}

export default new httpClientFactory();
