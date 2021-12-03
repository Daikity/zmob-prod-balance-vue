import { createStore } from "vuex";
import axios from "axios";
import geodata from "./geodata.js";
import convert from "xml-js";

export default createStore({
  state: {
    geo: geodata,
  },
  getters: {
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
        if (typeof resp.data === "object") {
          context.commit("ADD_DATA", {
            [payload.url]: resp.data.results || resp.data.d.results,
          });
        } else {
          let xml = convert.xml2json(resp.data, { compact: true });
          context.commit("ADD_DATA", {
            [payload.url]: JSON.parse(xml),
          });
        }
      });
    },
  },
});
