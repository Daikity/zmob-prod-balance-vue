<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <span class="icon mdi mdi-light">
          <font-awesome-icon icon="border-all" size="xs" />
        </span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <h1 class="navbar-item">Приморье / ПрА ПО Степнянское / Воздвиженка</h1>
      </div>
      <div class="navbar-end">
        <h3 class="navbar-item">Лысогор Дмитрий Вадимович</h3>
        <div class="navbar-item">
          <DropDown position="right" :showHide="dropDownShow">
            <template v-slot:trigger>
              <button
                class="button is-small"
                aria-haspopup="true"
                aria-controls="dropdown-menu6"
                @click="showHideDropDown"
              >
                <span class="icon is-small">
                  <font-awesome-icon icon="object-group" />
                </span>
              </button>
            </template>
            <template v-slot:content>
              <div class="dropdown-item">
                <div class="select-box">
                  <p>Регион</p>
                  <div class="select">
                    <select
                      @change="regionAreaDepFilter('rpegion')"
                      v-model="rpegion"
                    >
                      <option value=""></option>
                      <option
                        v-for="(reg, i) in $store.getters.GET_STATE.RegionSet"
                        :key="i"
                        :value="reg.Id"
                      >
                        {{ reg.Name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="select-box">
                  <p>Департамент</p>
                  <div class="select">
                    <select
                      @change="regionAreaDepFilter('prodDepartment')"
                      v-model="prodDepartment"
                    >
                      <option value=""></option>
                      <option
                        v-for="(prodDepart, i) in prodDepartmentSet"
                        :key="i"
                        :value="prodDepart.Id"
                      >
                        {{ prodDepart.Name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="select-box">
                  <p>Область</p>
                  <div class="select">
                    <select
                      @change="regionAreaDepFilter('prodArea')"
                      v-model="prodArea"
                    >
                      <option value=""></option>
                      <option
                        v-for="(area, i) in prodAreaSet"
                        :key="i"
                        :value="area.Id"
                      >
                        {{ area.Name }}
                      </option>
                    </select>
                  </div>
                </div>
                <button @click="getCPI" class="button is-small is-dark">
                  Выбрать
                </button>
              </div>
            </template>
          </DropDown>
        </div>
        <div class="navbar-item">
          <button class="button is-small">Добавить операцию</button>
        </div>
        <DatePicker class="navbar-item" v-model="range" is-range color="teal">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="input is-small"
              :value="inputValue.start + ' - ' + inputValue.end"
              v-on="inputEvents.start"
            />
          </template>
        </DatePicker>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
.select-box {
  padding: 0.3rem 0;
  display: flex;
  flex-direction: column;
  width: 15rem;
}
.select-box > p {
  font-weight: 600;
}
.select-box .select select:not([multiple]) {
  width: 100%;
}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      dropDownShow: false,

      rpegion: this.getCookie("rpegion"),
      prodArea: this.getCookie("prodArea"),
      prodDepartment: this.getCookie("prodDepartment"),

      regionSet: this.$store.getters.GET_STATE.RegionSet,
      prodDepartmentSet: this.$store.getters.GET_STATE.ProdDepartmentSet,
      prodAreaSet: this.$store.getters.GET_STATE.ProdAreaSet,

      range: {
        start: new Date("2021.11.01"), //new Date().setDate(new Date().getDate() - 5),
        end: new Date("2021.11.12"), //new Date().setDate(new Date().getDate() + 5),
      },
      routs: this.$router.options.routes,
      backend: [
        { url: "RegionSet", params: undefined },
        { url: "ProdAreaSet", params: undefined },
        { url: "ProdDepartmentSet", params: undefined },
        { url: "CultureSet", params: undefined },
        { url: "CategorySet", params: undefined },
        { url: "EmployeeSet", params: undefined },
        { url: "FieldSet", params: undefined },
        // { url: "FieldGeoSet", params: undefined },
        { url: "OperationSet", params: undefined },
        { url: "MachineSet", params: undefined },
        { url: "$metadata", params: undefined },
        // { url: "MachineToOperationSet", params: undefined },
      ],
      isTest: true,
    };
  },
  created() {
    this.initDataSoures();
  },
  computed: {
    rangeToISOString() {
      return {
        start: new Date(this.range.start).toISOString().split("Z")[0],
        end: new Date(this.range.end).toISOString().split("Z")[0],
      };
    },
  },
  watch: {
    rpegion() {
      this.regionAreaDepFilter();
    },
    prodDepartment() {
      this.regionAreaDepFilter();
    },
    prodArea() {
      this.regionAreaDepFilter();
    },
    range() {
      this.$store.dispatch("CREATE_DATA", {
        url: "CapacityPlanItemSet",
        params: {
          "sap-client": "100",
          $expand: "Pul",
          $filter: `(PlanTs ge datetime'${this.rangeToISOString.start}' and PlanTs le datetime'${this.rangeToISOString.end}') and RegionId eq 'Z250' and ProdDepId eq '2503'`,
        },
      });
    },
  },
  methods: {
    showHideDropDown() {
      this.dropDownShow = !this.dropDownShow;
      this.regionAreaDepFilter();
    },
    regionAreaDepFilter(sel) {
      let areaSet = this.$store.getters.GET_STATE.ProdAreaSet;
      let regionSet = this.$store.getters.GET_STATE.RegionSet;
      let departmentSet = this.$store.getters.GET_STATE.ProdDepartmentSet;

      if (sel === "rpegion") {
        this.prodDepartment = "";
        this.prodArea = "";
      }

      if (sel === "prodDepartment") {
        this.prodArea = "";
      }

      if (sel === "prodArea") {
        // eslint-disable-next-line prettier/prettier
        const area = areaSet.find(el => this.prodArea === el.Id)
        if (area) {
          this.prodArea = area.Id;
          this.rpegion = area.RegionId;
          this.prodDepartment = area.ProdDepId;
        }
      }

      departmentSet = departmentSet.filter((el) => {
        if (this.rpegion && el.RegionId === this.rpegion) {
          return el;
        } else if (this.rpegion === "") return el;
      });

      areaSet = areaSet.filter((el) => {
        if (this.rpegion && el.RegionId === this.rpegion) {
          if (this.prodDepartment && el.ProdDepId === this.prodDepartment) {
            return el;
          } else if (this.prodDepartment === "") return el;
        } else if (this.rpegion === "") return el;
      });

      this.regionSet = regionSet;
      this.prodAreaSet = areaSet;
      this.prodDepartmentSet = departmentSet;

      // eslint-disable-next-line prettier/prettier
      document.cookie = `${encodeURIComponent("rpegion")}=${encodeURIComponent(this.rpegion)}`
      // eslint-disable-next-line prettier/prettier
      document.cookie = `${encodeURIComponent("prodArea")}=${encodeURIComponent(this.prodArea)}`
      // eslint-disable-next-line prettier/prettier
      document.cookie = `${encodeURIComponent("prodDepartment")}=${encodeURIComponent(this.prodDepartment)}`;
    },
    getCPI() {
      this.$store.dispatch("CREATE_DATA", {
        url: "CapacityPlanItemSet",
        params: {
          "sap-client": "100",
          $expand: "Pul",
          $filter: `(PlanTs ge datetime'${this.rangeToISOString.start}' and PlanTs le datetime'${this.rangeToISOString.end}') and RegionId eq '${this.rpegion}' and ProdDepId eq '${this.prodDepartment}'`,
        },
      });
    },
    getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            // eslint-disable-next-line no-useless-escape
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    initDataSoures() {
      this.backend.forEach((query) => {
        this.$store.dispatch("CREATE_DATA", query);
      });
    },
  },
};
</script>
