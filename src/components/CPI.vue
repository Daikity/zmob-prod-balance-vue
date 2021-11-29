<template>
  <div
    class="mashin-info-block"
    v-for="data in cpiData"
    :key="data.id"
    :class="data.OrderId ? 'mashin-info-assigned' : 'mashin-info-not-assigned'"
  >
    <div class="mashin-content">
      <div class="mashin-info">
        <font-awesome-icon size="s" icon="tractor" />
        <div class="edit-block" v-if="!data.OrderId && data.isTractorEdit">
          <input
            type="text"
            class="input is-info is-small"
            style="margin-left: 0.5em"
            v-model="editNaw.TractorModel"
          />
          <button
            class="button is-small"
            @click="confirm, (data.isTractorEdit = !data.isTractorEdit)"
          >
            <font-awesome-icon
              size="s"
              icon="check"
              style="color: lightgreen"
            />
          </button>
          <button
            class="button is-small"
            @click="cancel, (data.isTractorEdit = !data.isTractorEdit)"
          >
            <font-awesome-icon size="s" icon="ban" style="color: lightcoral" />
          </button>
        </div>
        <div
          class="info"
          v-else
          @dblclick="edit(data), (data.isTractorEdit = !data.isTractorEdit)"
        >
          <span
            class="tag is-success"
            :class="data.OrderId ? 'is-assigned' : 'is-not-assigned'"
          >
            {{ data.OrderId }}
          </span>
          <p class="title is-7">
            {{ data.TractorModel }}
          </p>
          <p class="subtitle is-7">
            {{ data.TractorId }}
          </p>
        </div>
      </div>
      <div class="mashin-info">
        <font-awesome-icon size="s" icon="trailer" />
        <div class="edit-block" v-if="!data.OrderId && data.isTrailerEdit">
          <input
            type="text"
            class="input is-info is-small"
            style="margin-left: 0.5em"
            v-model="editNaw.TraileModel"
          />
          <button
            class="button is-small"
            @click="confirm, (data.isTrailerEdit = !data.isTrailerEdit)"
          >
            <font-awesome-icon
              size="s"
              icon="check"
              style="color: lightgreen"
            />
          </button>
          <button
            class="button is-small"
            @click="cancel, (data.isTrailerEdit = !data.isTrailerEdit)"
          >
            <font-awesome-icon size="s" icon="ban" style="color: lightcoral" />
          </button>
        </div>
        <div
          class="info"
          v-else
          @dblclick="edit(data), (data.isTrailerEdit = !data.isTrailerEdit)"
        >
          <p class="title is-7">{{ data.TraileModel || "CHR7509M" }}</p>
          <p class="subtitle is-7">{{ data.TraileId || "10121494" }}</p>
        </div>
        <!-- <div class="info" v-else>
          <p class="title is-7">Без прицепа</p>
        </div> -->
      </div>
      <div class="mashin-info">
        <font-awesome-icon size="s" icon="male" />
        <div class="edit-block" v-if="!data.OrderId && data.isEmploeeEdit">
          <input
            type="text"
            class="input is-info is-small"
            style="margin-left: 0.5em"
            v-model="editNaw.emploeeName"
          />
          <button
            class="button is-small"
            @click="confirm, (data.isEmploeeEdit = !data.isEmploeeEdit)"
          >
            <font-awesome-icon
              size="s"
              icon="check"
              style="color: lightgreen"
            />
          </button>
          <button
            class="button is-small"
            @click="cancel, (data.isEmploeeEdit = !data.isEmploeeEdit)"
          >
            <font-awesome-icon size="s" icon="ban" style="color: lightcoral" />
          </button>
        </div>
        <div
          class="info"
          v-else
          @dblclick="edit(data), (data.isEmploeeEdit = !data.isEmploeeEdit)"
        >
          <p class="title is-7">Иванов Дмитрий Петрович</p>
          <p class="subtitle is-7">15647432</p>
        </div>
        <!-- <div class="info" v-else>
          <p class="title is-7">Без прицепа</p>
        </div> -->
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
  </div>
</template>

<style scoped>
.mashin-info-block {
  padding: 0.3em 0.5em;
  border-bottom: 1px solid #ededed;
}
.mashin-info-assigned {
  border-left: 3px solid #00ce52;
}
.mashin-info-not-assigned {
  border-left: 3px solid #ff5241;
}
.mashin-info-block:hover {
  background-color: #fdfdfd;
}
.mashin-content {
  display: flex;
  justify-content: space-between;
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
  padding: 0.2em;
  cursor: pointer;
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
export default {
  props: {
    cpiData: Array,
  },
  data() {
    return {
      CPI_Change: { Id: null },
      editNaw: {},
      editConfirm: {},
    };
  },
  methods: {
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
    edit(data) {
      this.editNaw = data;
    },
  },
};
</script>
