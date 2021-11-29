import { createStore } from "vuex";
import axios from "axios";
import geodata from "./geodata.js";

export default createStore({
  state: {
    geo: geodata,
  },
  getters: {
    /**
     * {
     *  payload.key: название ключа,
     *  payload.filter: {
     *    key: ключ по которому в массиве будет произведен фильтр записей,
     *    param: ===, >, <, >=, <=, !==,
     *    value: значение которое нужно фильтровать
     *  }
     * }
     */
    GET_STATE(state) {
      return state;
    },
  },
  mutations: {
    SET_STATE(state, payload) {
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
    ADD_DATA(state, payload) {
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
  },
  actions: {
    GISMETEO_DATA(context, payload) {
      const PARAMS = {
        url: "/cities",
        baseURL: "https://api.gismeteo.net/v2/search",
        headers: {
          "Accept-Encoding": "deflate",
          "X-Gismeteo-Token": "56b30cb255.3443075",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          latitude: payload.lat,
          longitude: payload.log,
          limit: 10,
        },
      };

      axios(PARAMS).then((resp) => {
        console.log(resp);
        context.commit("ADD_DATA", {
          GISMETEO: resp,
        });
      });
    },
    CREATE_DATA(context, payload) {
      let urlParams = "";
      if (payload.params) {
        let count = 1;
        for (const key in payload.params) {
          urlParams = urlParams + `${key}=${payload.params[key]}`;
          if (count !== Object.keys(payload.params).length) {
            urlParams = urlParams + "&";
          }
          count++;
        }
      }
      if (!payload.url) return;
      axios.get(`/${payload.url}?${urlParams}`).then((resp) => {
        context.commit("ADD_DATA", {
          [payload.url]: resp.data.results || resp.data.d.results,
        });
      });
    },
  },
});
