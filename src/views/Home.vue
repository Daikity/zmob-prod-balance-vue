<template>
  <!-- eslint-disable prettier/prettier -->
  <div style="padding-top: 2em">
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
    <div class="columns is-multiline" style="padding: 0 0.7em" v-if="CPI">
      <div class="column is-6" v-for="cpi in CPI" :key="cpi.Id">
        <div class="card">
          <header class="card-header">
            <div class="card-header-title">
              <div class="media-content">
                <p class="title is-6">
                  <font-awesome-icon icon="barcode" />
                  {{ operationName(cpi.materialId) }}
                </p>
                <p class="subtitle is-7">
                  <font-awesome-icon icon="certificate" />
                  {{ cultureName(cpi.cultureId) }}
                </p>
              </div>
            </div>
            <button
              class="card-header-icon"
              aria-label="more options"
              @click="cpi.isOpenContent = !cpi.isOpenContent"
            >
              <span class="tag is-light" title="Площадь">2000 га</span>
              <span class="tag is-danger is-light" title="План"> 2000 га</span>
              <span class="tag is-success is-light" title="Факт"> 300 га</span>

              <span class="icon"
                ><font-awesome-icon
                  :icon="cpi.isOpenContent ? 'angle-up' : 'angle-down'"
              /></span>
            </button>
          </header>
          <div
            class="card-content"
            style="padding: 0em"
            :class="{ 'content-hide': !cpi.isOpenContent }"
          >
            <div v-for="field in cpi.fields" :key="field.fieldData.Id">
              <article class="panel" style="box-shadow: none">
                <div class="panel-heading cpi-info">
                  <div>
                    <span>{{ field.fieldData.FieldId }}</span>
                    <p style="font-size: 0.7em; font-weight: 600">
                      {{ fieldName(field.fieldData.FieldId) }}
                    </p>
                  </div>
                  <div style="display: flex">
                    <div style="margin-right: 0.5em">
                      <span class="tag is-light" title="Площадь">390 га</span>
                      <span class="tag is-danger is-light" title="План">
                        189 га</span
                      >
                      <span class="tag is-success is-light" title="Факт">
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
                
                <DatesCpi 
                  v-for="date in field.fieldDates"
                  :key="date.id"
                  :dates="date"
                  :gt="Math.floor(Math.random() * 500)"
                  :rain="Math.floor(Math.random() * 120)"
                  :users="Math.floor(Math.random() * 99)"
                  :temperature="Math.floor(Math.random() * 30)"
                  :weatherIcon="weather[Math.floor(Math.random() * weather.length)]"
                  @openDate="date.isOpen = !date.isOpen">
                  <template v-slot:dropDownContent>
                    <CPI
                      v-for="dataCpi in date.dataCPI"
                      :key="dataCpi.Id"
                      :clousedOperation="dataCpi.OrderId !== ''"
                      :cpiId="dataCpi.Id"
                      @cpi-change="cpiChange"
                    />
                  </template>
                </DatesCpi>
              </article>
            </div>
          </div>
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
      CPI: [],
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
    };
  },
  created() {
    this.getCPI();
  },
  methods: {
    fieldIsEmpty(fields, dates) {
      let result = [];
      fields.forEach((fl) => {
        dates.forEach((dt) => {
          // eslint-disable-next-line prettier/prettier
          const check = this.formatDate(dt.PlanDate) === this.formatDate(fl.PlanDate) ? false : true;
          result.push({
            fieldID: fl.FieldId,
            date: this.formatDate(dt.PlanDate),
            isEmpty: !check,
          });
        });
      });
      return result;
    },
    cultureName(id) {
      const culture =
        this.GET_STATE.CultureSet.find((el) => el.Id === id) || [];
      return culture.CultureName || "";
    },
    operationName(id) {
      const operation =
        this.GET_STATE.OperationSet.find((el) => el.Id === id) || [];
      return operation.Description || "";
    },
    fieldName(id) {
      const fieldSet = this.GET_STATE.FieldSet;
      const result = fieldSet.find((el) => el.Id === id) || {};
      return `${result.ProdDepId} ${result.Name}` || {};
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
    getCPI() {
      const CPI = [];
      const operations = [];
      const fields = [];

      // получаем id операций
      let _operations = this.getUniqueListBy(
        this.CapacityPlanItemSet,
        "OperationId"
      );
      _operations.forEach((el) => {
        operations.push(el.MaterialId);
      });

      // удаляем дубликаты полей
      let _fields = this.getUniqueListBy(this.CapacityPlanItemSet, "FieldId");
      _fields.forEach((el) => {
        fields.push(el.FieldId);
      });

      // удаляем дубликаты культур (этот массив и будет списком операций)
      let _cultureId = this.getUniqueListBy(_fields, "CultureId");

      _cultureId.forEach((el) => {
        const fields = [];
        const dates = [];
        _fields.forEach((fl) => {
          let dataField = {};
          if (fl.Suboperation === el.Suboperation) {
            const allDataCpiForFields = this.getDataCpi(fl.FieldId);
            const dataCPI = [];
            const _datesStr = [];
            this.getUniqueListBy(allDataCpiForFields, "PlanDate").forEach(
              (alldatesstr) => {
                _datesStr.push(this.formatDate(alldatesstr.PlanDate));
              }
            );
            _datesStr.forEach((dstr) => {
              allDataCpiForFields.forEach((allCpi) => {
                // eslint-disable-next-line prettier/prettier
                if (dstr === this.formatDate(allCpi.PlanDate)) {
                  dataCPI.push(allCpi);
                }
              });
            });
            _datesStr.forEach((dstr) => {
              dates.push({
                // eslint-disable-next-line prettier/prettier
                id: `${Math.floor(Math.random() * 8956)}-${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 350)}`,
                date: dstr,
                // eslint-disable-next-line prettier/prettier
                dataCPI: dataCPI.filter(el => dstr === this.formatDate(el.PlanDate) && el.FieldId === fl.FieldId),
                isOpen: false,
              });
            });

            dataField.fieldId = fl.FieldId;
            dataField.fieldData = fl;
            dataField.fieldDates = dates;
            fields.push(dataField);
          }
        });

        CPI.push({
          id: el.Id,
          cultureId: el.CultureId,
          subId: el.Suboperation,
          fields: fields,
          materialId: el.MaterialId,
          planDate: el.PlanDate,
          exempCord: [],
          CPI_change: {},
          isOpen: false,
          isOpenContent: false,
          isOpenContField: false,
        });
      });
      this.CPI = CPI;
      console.log(CPI);
      return CPI;
    },
    formatDate(date) {
      if (!date) return "";
      let dateInit = date.replace("/Date(", "").replace(")/", "");
      let resDate = new Date(Number(dateInit));

      let dd = resDate.getDate();
      if (dd < 10) dd = "0" + dd;

      let mm = resDate.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      let yy = resDate.getFullYear();

      return dd + "." + mm + "." + yy;
    },
  },
  watch: {
    CapacityPlanItemSet() {
      this.getCPI();
    },
    GET_STATE() {
      this.getCPI();
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
