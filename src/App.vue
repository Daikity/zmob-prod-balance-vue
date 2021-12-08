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
          <DropDown position="right">
            <template v-slot:trigger>
              <button
                class="button is-small"
                aria-haspopup="true"
                aria-controls="dropdown-menu6"
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
                    <select v-model="rpegion">
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
                    <select v-model="prodDepartment">
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
                    <select v-model="prodArea">
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
      rpegion: "",
      prodArea: "",
      prodDepartment: "",
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
    // this.backend.push({
    //   url: "CapacityPlanItemSet",
    //   params: {
    //     "sap-client": "100",
    //     $expand: "Pul",
    //     $filter: `(PlanTs ge datetime'${this.rangeToISOString.start}' and PlanTs le datetime'${this.rangeToISOString.end}') and RegionId eq '${this.rpegion}' and ProdDepId eq '${this.prodDepartment}'`,
    //   },
    // });
    this.initDataSoures();
  },
  mounted() {
    this.rpegion = this.getCookie("rpegion");
    this.prodArea = this.getCookie("prodArea");
    this.prodDepartment = this.getCookie("prodDepartment");
  },
  watch: {
    rpegion() {
      // eslint-disable-next-line prettier/prettier
      document.cookie = `${encodeURIComponent("rpegion")}=${encodeURIComponent(this.rpegion)}`
      this.prodDepartmentSet = this.$store.getters.GET_STATE.ProdDepartmentSet;
      this.prodAreaSet = this.$store.getters.GET_STATE.ProdAreaSet;

      if (this.rpegion === "") {
        this.prodArea = "";
        this.prodDepartment = "";
      } else if (this.prodDepartmentSet && this.rpegion !== "") {
        this.prodDepartmentSet = this.prodDepartmentSet.filter(
          (el) => el.RegionId === this.rpegion
        );
        this.prodAreaSet = this.prodAreaSet.filter(
          (el) => el.RegionId === this.rpegion
        );
        if (this.prodDepartment !== "" && this.rpegion !== "") {
          this.prodAreaSet = this.prodAreaSet.filter(
            (el) => el.ProdDepId === this.prodDepartment
          );
        }
      }
    },
    prodDepartment() {
      // eslint-disable-next-line prettier/prettier
      document.cookie = `${encodeURIComponent("prodDepartment")}=${encodeURIComponent(this.prodDepartment)}`;
      this.prodDepartmentSet = this.$store.getters.GET_STATE.ProdDepartmentSet;
      this.prodAreaSet = this.$store.getters.GET_STATE.ProdAreaSet;

      if (this.prodDepartmentSet && this.prodDepartment !== "") {
        const prodDepartment = this.prodDepartmentSet.find(
          (el) => el.Id === this.prodDepartment
        );
        this.rpegion = prodDepartment.RegionId;
        this.prodAreaSet = this.prodAreaSet.filter(
          (el) => el.ProdDepId === this.prodDepartment
        );
      } else {
        this.prodArea = "";
      }
    },
    prodArea() {
      // eslint-disable-next-line prettier/prettier
      document.cookie = `${encodeURIComponent("prodArea")}=${encodeURIComponent(this.prodArea)}`
      if (this.prodAreaSet && this.prodArea !== "") {
        const prodArea = this.prodAreaSet.find((el) => el.Id === this.prodArea);
        this.prodDepartment = prodArea.ProdDepId ? prodArea.ProdDepId : "";
        this.rpegion = prodArea.RegionId;
        if (this.prodDepartment !== "" && this.rpegion !== "") {
          this.prodAreaSet = this.prodAreaSet.filter(
            (el) => el.ProdDepId === this.prodDepartment
          );
        }
      }
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
  computed: {
    rangeToISOString() {
      return {
        start: new Date(this.range.start).toISOString().split("Z")[0],
        end: new Date(this.range.end).toISOString().split("Z")[0],
      };
    },
  },
  methods: {
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
