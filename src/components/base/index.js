import CPI from "../CPI/CPI.vue";
import Map from "../Map.vue";
import DropDown from "../UI/DropDown.vue";
import DatesCpi from "../CPI/DatesCpi.vue";
import { Calendar, DatePicker } from "v-calendar";

const regCompnents = [
  {
    name: "DatesCpi",
    component: DatesCpi,
  },
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
  {
    name: "DropDown",
    component: DropDown,
  },
];

export default regCompnents;
