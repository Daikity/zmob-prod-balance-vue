import CPI from "../CPI.vue";
import Map from "../Map.vue";
import { Calendar, DatePicker } from "v-calendar";

const regCompnents = [
  {
    name: "CPI",
    component: CPI,
  },
  {
    name: "Map",
    component: Map,
  },
  {
    name: "Calendar",
    component: Calendar,
  },
  {
    name: "DatePicker",
    component: DatePicker,
  },
];

export default regCompnents;
