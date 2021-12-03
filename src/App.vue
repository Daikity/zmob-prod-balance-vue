<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <span class="icon mdi mdi-light">
          <font-awesome-icon icon="border-all" size="xs" />
        </span>
      </a>

      <!-- <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a> -->
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <!-- <router-link
          class="navbar-item"
          v-for="rout in routs"
          :key="rout.name"
          :to="rout.path"
          >{{ rout.name }}</router-link
        > -->
        <h1 class="navbar-item">Приморье / ПрА ПО Степнянское / Воздвиженка</h1>
      </div>
      <div class="navbar-end">
        <h3 class="navbar-item">Лысогор Дмитрий Вадимович</h3>
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

<style></style>

<script>
export default {
  components: {},
  data() {
    return {
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
        { url: "FieldGeoSet", params: undefined },
        { url: "OperationSet", params: undefined },
        { url: "MachineSet", params: undefined },
        { url: "$metadata", params: undefined },
        // { url: "MachineToOperationSet", params: undefined },
      ],
      isTest: true,
    };
  },
  created() {
    this.backend.push({
      url: "CapacityPlanItemSet",
      params: {
        "sap-client": "100",
        $expand: "Pul",
        $filter: `(PlanTs ge datetime'${this.rangeToISOString.start}' and PlanTs le datetime'${this.rangeToISOString.end}') and RegionId eq 'Z250' and ProdDepId eq '2503'`,
      },
    });
    this.initDataSoures();
  },
  watch: {
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
    initDataSoures() {
      this.backend.forEach((query) => {
        this.$store.dispatch("CREATE_DATA", query);
      });
    },
  },
};
</script>
