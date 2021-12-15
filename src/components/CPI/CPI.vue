<template>
  <div
    class="mashin-info-block"
    :class="
      clousedOperation ? 'mashin-info-assigned' : 'mashin-info-not-assigned'
    "
  >
    <div class="mashin-content">
      <div class="mashin-info">
        <font-awesome-icon size="s" icon="tractor" />
        <div
          class="edit-block"
          v-if="!getDataCpi(cpiId).OrderId && getDataCpi(cpiId).isTractorEdit"
        >
          <input
            type="text"
            class="input is-info is-small"
            style="margin-left: 0.5em"
            v-model="editNaw.TractorModel"
          />
          <button class="button is-small" @click="confirm">
            <font-awesome-icon
              size="s"
              icon="check"
              style="color: lightgreen"
            />
          </button>
          <button class="button is-small" @click="cancel">
            <font-awesome-icon size="s" icon="ban" style="color: lightcoral" />
          </button>
        </div>
        <div v-else @dblclick="edit(getDataCpi(cpiId), 'tractor')">
          <div class="info">
            <span
              class="tag is-success"
              :class="
                getDataCpi(cpiId).OrderId ? 'is-assigned' : 'is-not-assigned'
              "
            >
              {{ getDataCpi(cpiId).OrderId }}
            </span>
            <p class="title is-7">
              {{ getMashin(getDataCpi(cpiId).TractorId).Eqktx }}
            </p>
            <p class="subtitle is-7">{{ getDataCpi(cpiId).Invnr }}</p>
          </div>
        </div>
      </div>
      <div class="mashin-info">
        <font-awesome-icon size="s" icon="trailer" />
        <div
          class="edit-block"
          v-if="!getDataCpi(cpiId).OrderId && getDataCpi(cpiId).isTrailerEdit"
        >
          <input
            type="text"
            class="input is-info is-small"
            style="margin-left: 0.5em"
            v-model="editNaw.TraileModel"
          />
          <button class="button is-small" @click="confirm">
            <font-awesome-icon
              size="s"
              icon="check"
              style="color: lightgreen"
            />
          </button>
          <button class="button is-small" @click="cancel">
            <font-awesome-icon size="s" icon="ban" style="color: lightcoral" />
          </button>
        </div>
        <div
          class="info"
          @dblclick="edit(getDataCpi(cpiId), 'trailer')"
          v-if="getDataCpi(cpiId).TrailerId !== ''"
        >
          <p class="title is-7">
            {{ getMashin(getDataCpi(cpiId).TrailerId).Eqktx }}
          </p>
          <p class="subtitle is-7">{{ getDataCpi(cpiId).TrailerId }}</p>
        </div>
        <div class="info" v-else @dblclick="edit(getDataCpi(cpiId), 'trailer')">
          <p class="title is-7">Без прицепа</p>
        </div>
        <!-- <div class="info" v-else>
          <p class="title is-7">Без прицепа</p>
        </div> -->
      </div>
      <div class="mashin-info">
        <div
          v-if="!getDataCpi(cpiId).OrderId && getDataCpi(cpiId).isEmploeeEdit"
        >
          <font-awesome-icon size="s" icon="male" />
          <div class="edit-block">
            <input
              type="text"
              class="input is-info is-small"
              style="margin-left: 0.5em"
              v-model="editNaw.emploeeName"
            />
            <button class="button is-small" @click="confirm">
              <font-awesome-icon
                size="s"
                icon="check"
                style="color: lightgreen"
              />
            </button>
            <button class="button is-small" @click="cancel">
              <font-awesome-icon
                size="s"
                icon="ban"
                style="color: lightcoral"
              />
            </button>
          </div>
        </div>
        <div v-else>
          <font-awesome-icon size="s" icon="male" />
          <div class="info" @dblclick="edit(getDataCpi(cpiId), 'driver')">
            <p class="title is-7">
              {{ getEmploee(getDataCpi(cpiId).DriverId).Ename }}
            </p>
            <p class="subtitle is-7">{{ getDataCpi(cpiId).DriverId }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cpi-control">
      <font-awesome-icon
        style="color: orange"
        title="Дневная смена"
        size="s"
        icon="sun"
        v-if="Math.floor(Math.random() * 3) > 1"
      />
      <font-awesome-icon
        style="color: #004797"
        size="s"
        icon="moon"
        v-else
        title="Ночная смена"
      />
      <button class="button is-small" style="margin-left: 0.5em">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.cpi-control {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.mashin-info-block {
  padding: 0.3em 0.5em;
  border-bottom: 1px solid #ededed;
}
.mashin-info-assigned {
  border-left: 3px solid #00ce52;
  display: flex;
  justify-content: space-between;
}
.mashin-info-not-assigned {
  border-left: 3px solid #ff5241;
  display: flex;
  justify-content: space-between;
}
.mashin-info-block:hover {
  background-color: #fdfdfd;
}
.mashin-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.is-assigned {
  font-size: 0.6em;
  padding: 0em 0.5em;
}

.is-not-assigned {
  display: none;
}
.mashin-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.333%;
  padding: 0.2em;
  cursor: pointer;
}
.mashin-info:last-child,
.mashin-info:first-child {
  justify-content: flex-start;
}
.mashin-info > * {
  display: flex;
  align-items: center;
}
.info {
  margin: 0 0.4em;
}
.cpi {
  cursor: pointer;
}
.trailer_empty {
  color: lightgray;
  font-size: 12px;
  align-self: center;
  vertical-align: middle;
}
.edit-block {
  display: flex;
  align-items: center;
  padding: 0 0.5em;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    cpiId: String,
    clousedOperation: Boolean,
  },

  data() {
    return {
      CPI_Change: { Id: null },
      editNaw: {},
      editConfirm: {},
    };
  },
  computed: {
    ...mapGetters(["GET_STATE"]),
  },
  methods: {
    getDataCpi(id) {
      const CPIset = this.GET_STATE.CapacityPlanItemSet;
      return CPIset.find((el) => el.Id === id);
    },
    getEmploee(id) {
      const employeeSet = this.GET_STATE.EmployeeSet;
      const result = employeeSet ? employeeSet.find((el) => el.Id === id) : {};
      return result;
    },
    getMashin(id) {
      const machineSet = this.GET_STATE.MachineSet;
      const result = machineSet ? machineSet.find((el) => el.Id === id) : {};
      return result;
    },
    hendelRow(id) {
      this.CPI_Change = this.cpiData.filter((el) => el.Id === id)[0];
      this.$emit("cpiChange", this.CPI_Change);
    },
    confirm() {
      this.editConfirm.push(this.editNaw);
      this.editNaw = {};
    },
    cancel() {
      this.editNaw = {};
    },
    edit(data, editPlace) {
      this.editNaw.data = data;
      this.editNaw.editPlace = editPlace;
    },
  },
};
</script>
