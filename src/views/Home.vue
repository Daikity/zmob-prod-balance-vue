<template>
  <div class="columns is-mobile is-multiline" style="padding-top: 2em">
    <div class="map">
      <div
        class="map-btn"
        :class="{ 'is-open': showMap }"
        @click="showMap = !showMap"
      >
        <font-awesome-icon icon="map" size="xl" />
      </div>
      <div class="map-box" :class="{ 'map-hide': !showMap }">
        <Map />
      </div>
    </div>
    <div class="column is-6" v-for="(field, i) in fields" :key="i">
      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            <div class="media-content">
              <p class="title is-6">
                <font-awesome-icon icon="barcode" />
                Прямое комбайнирование
              </p>
              <p class="subtitle is-7">
                <font-awesome-icon icon="certificate" />
                {{ getCulture(field.cultureId) }}
              </p>
            </div>
          </div>
          <button
            class="card-header-icon"
            aria-label="more options"
            @click="field.isOpenContent = !field.isOpenContent"
          >
            <span class="tag is-light" title="Площадь">2000 га</span>
            <span class="tag is-danger is-light" title="План">
              <!-- <font-awesome-icon
                icon="user"
                style="margin-right: 0.3em"
                size="s"
              /> -->
              2000 га</span
            >
            <span class="tag is-success is-light" title="Факт">
              <!-- <font-awesome-icon
                icon="user"
                style="margin-right: 0.3em"
                size="s"
              /> -->
              300 га</span
            >

            <span class="icon"
              ><font-awesome-icon
                :icon="field.isOpenContent ? 'angle-up' : 'angle-down'"
            /></span>
          </button>
        </header>
        <div
          class="card-content"
          style="padding: 0em"
          :class="{ 'content-hide': !field.isOpenContent }"
        >
          <article class="panel" style="box-shadow: none">
            <div class="panel-heading cpi-info" style="height: 2.5em">
              <div>
                <span>{{ field.fieldId }} </span>
                <p style="font-size: 0.7em; font-weight: 600">
                  3154001 Большехаланский
                </p>
              </div>
              <div style="display: flex">
                <div style="margin-right: 0.5em">
                  <span class="tag is-light" title="Площадь">390 га</span>
                  <span class="tag is-danger is-light" title="План">
                    <!-- <font-awesome-icon
                      icon="user"
                      style="margin-right: 0.3em"
                      size="s"
                    /> -->
                    189 га</span
                  >
                  <span class="tag is-success is-light" title="Факт">
                    <!-- <font-awesome-icon
                      icon="user"
                      style="margin-right: 0.3em"
                      size="s"
                    /> -->
                    55 га</span
                  >
                </div>
                <button
                  @click="showMap = true"
                  class="button is-primary is-small"
                >
                  <font-awesome-icon icon="map" />
                </button>
                <button class="button is-small" style="margin-left: 0.5em">
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </div>

            <div class="panel-block">
              <p class="control has-icons-left">
                <input
                  class="input is-info is-small"
                  type="text"
                  placeholder="поиск..."
                />
                <span class="icon is-left">
                  <font-awesome-icon icon="search" />
                </span>
              </p>
            </div>

            <div class="cpi-dates" v-for="date in dates" :key="date.id">
              <a
                class="panel-block"
                style="justify-content: space-between"
                @dblclick="date.isOpen = !date.isOpen"
              >
                <div style="padding: 0 0.2em; width: 30%">
                  <div>
                    <span>
                      <font-awesome-icon icon="calendar-alt" />
                      {{ getDateWithString(date.date) }}
                    </span>
                  </div>
                  <font-awesome-icon icon="money-check-alt" />
                  {{ Math.floor(Math.random() * 100000) + " р." }}
                </div>
                <div style="width: 30%">
                  <button class="button is-small" title="Добавить">
                    <font-awesome-icon icon="plus" />
                  </button>
                  <button class="button is-small" title="Создать пул">
                    <font-awesome-icon icon="folder-plus" />
                  </button>
                  <button class="button is-small" title="Добавить отряд">
                    <font-awesome-icon icon="user-friends" />
                  </button>
                  <button class="button is-small" title="Пересчет">
                    <font-awesome-icon icon="calculator" />
                  </button>
                </div>
                <div
                  style="
                    width: 40%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <font-awesome-icon
                      icon="users"
                      size="xs"
                      style="margin-left: 5px; font-size: 0.8em"
                    />
                    <span style="margin-left: 5px">{{
                      Math.floor(Math.random() * 99)
                    }}</span>
                  </div>
                  <div>
                    <font-awesome-icon
                      style="margin-left: 5px; font-size: 0.8em"
                      :icon="
                        weather[Math.floor(Math.random() * weather.length)]
                      "
                    />
                    <strong style="margin-left: 2px"
                      >{{ Math.floor(Math.random() * 30) }}℃
                    </strong>
                  </div>
                  <div>
                    <font-awesome-icon
                      icon="tint"
                      style="margin-left: 5px; font-size: 0.8em"
                    />
                    {{ Math.floor(Math.random() * 120) + "мм." }}
                    <span class="tag is-light" title="Гектары">{{
                      Math.floor(Math.random() * 500) + " га."
                    }}</span>
                  </div>
                </div>
              </a>
              <div :class="{ 'cpi-hide cpi-box': !date.isOpen }">
                <CPI
                  :cpi-data="getDataCpi(field.fieldId)"
                  @cpi-change="cpiChange"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cpi-dates {
  border-bottom: 1px solid #ededed;
}
.cpi-info {
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cpi-info span {
  cursor: pointer;
}
.map {
  position: absolute;
  left: 0;
  top: 2em;
  z-index: 910;
  min-width: 10em;
}
.map-box {
  position: absolute;
  width: 50em;
  min-width: 10em;
  min-height: 4em;
  padding: 0.25em;
  box-shadow: 5px 5px 13px 0px #0000001f;
  margin-top: 2.5em;
  margin-left: 1em;
  border-radius: 5px;
}
.box-cpi {
  max-height: 20em;
  overflow-y: auto;
}
.cpi-hide,
.map-hide,
.content-hide {
  display: none;
}
.cpi-field,
.map-btn {
  padding: 0.5em 0.7em;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}
.map-btn {
  position: absolute;
  z-index: 10;
  left: 10px;
  top: 10px;
  border: 1px solid rgb(236, 236, 236);
  background-color: #fff;
}
.cpi-field:hover,
.map-btn:hover {
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(230, 230, 230);
}
.cpi-box {
  position: absolute;
}
.is-open {
  background-color: #00d1b2;
  border: 1px solid #00bb9f;
  color: #fff;
}
.is-open:hover {
  background-color: #00bb9f;
  border: 1px solid #00bb9f;
}
</style>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      showMap: false,
      fields: [],
      weather: [
        "cloud-moon-rain",
        "cloud-showers-heavy",
        "snowflake",
        "cloud-sun-rain",
        "cloud-rain",
        "cloud-sun",
        "sun",
        "smog",
        "cloud",
        // "temperature-low",
        // "temperature-high",
      ],
      dates: [
        {
          id: 1,
          date: "2021.11.10",
          isOpen: false,
        },
        {
          id: 2,
          date: "2021.11.11",
          isOpen: false,
        },
        {
          id: 3,
          date: "2021.11.12",
          isOpen: false,
        },
      ],
    };
  },
  created() {
    this.getFields();
  },
  methods: {
    getDateWithString(date) {
      const now = new Date(date);
      let dd = now.getDate();
      if (dd < 10) dd = "0" + dd;

      let mm = now.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      let yy = now.getFullYear();
      if (yy < 10) yy = "0" + yy;
      return dd + "." + mm + "." + yy;
    },
    getCulture(id) {
      if (!this.GET_STATE.CultureSet) return "";
      return (
        this.GET_STATE.CultureSet.find((el) => el.Id === id).CultureName || ""
      );
    },
    getOperation(id) {
      if (!this.GET_STATE.OperationSet) return "";
      return (
        this.GET_STATE.OperationSet.find((el) => el.SubId === id).Description ||
        ""
      );
    },
    cpiChange(callBack) {
      let fields = this.fields;
      let field = fields.find((el) => el.fieldId === callBack.FieldId);

      if (!field) return;

      field.CPI_change = callBack;
      this.fields = fields;
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    getDataCpi(fieldId) {
      const CPIset = this.CapacityPlanItemSet;
      return CPIset.filter((e) => e.FieldId === fieldId);
    },
    getFields() {
      const aFields = [];
      const operations = [];
      const fields = [];
      const dates = [];
      // получаем id операций
      let _operations = this.getUniqueListBy(
        this.CapacityPlanItemSet,
        "MaterialId"
      );
      _operations.forEach((el) => {
        operations.push(el.MaterialId);
      });
      // получаем поля
      let _fields = this.getUniqueListBy(this.CapacityPlanItemSet, "FieldId");
      _fields.forEach((el) => {
        fields.push(el.FieldId);
      });
      // получаем используемые даты
      let _planDates = this.getUniqueListBy(
        this.CapacityPlanItemSet,
        "PlanDate"
      );

      _planDates.forEach((el) => {
        let res = el.PlanDate.replace("/Date(", "").replace(")/", "");
        let date = new Date(Number(res));
        // eslint-disable-next-line prettier/prettier
        dates.push(this.formatDate(date))
      });

      console.log(dates);
      console.log(_operations);
      console.log(_fields);

      this.getUniqueListBy(this.CapacityPlanItemSet, "OperationId").forEach(
        (el) => {
          aFields.push({
            id: el.Id,
            cultureId: el.CultureId,
            subId: el.Suboperation,
            fieldId: el.FieldId,
            exempCord: [],
            CPI_change: {},
            isOpen: false,
            isOpenContent: false,
          });
        }
      );
      this.fields = aFields;
      return aFields;
    },
    formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      let yy = date.getFullYear();

      return dd + "." + mm + "." + yy;
    },
  },
  watch: {
    CapacityPlanItemSet() {
      this.getFields();
    },
    GET_STATE() {
      this.getFields();
    },
  },
  computed: {
    CapacityPlanItemSet() {
      return this.GET_STATE.CapacityPlanItemSet || [];
    },
    ...mapGetters(["GET_STATE"]),
  },
};
</script>
