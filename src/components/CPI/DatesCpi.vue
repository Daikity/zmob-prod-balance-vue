<template>
  <div class="cpi-dates">
    <a
      class="panel-block"
      style="justify-content: space-between"
      @dblclick="$emit('openDate')"
    >
      <div style="padding: 0 0.2em; width: 30%">
        <div>
          <span>
            <font-awesome-icon icon="calendar-alt" />
            {{ dates.date }}
          </span>
        </div>
        <font-awesome-icon icon="money-check-alt" />
        {{ Math.floor(Math.random() * 100000) + " р." }}
      </div>
      <slot name="controls">
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
      </slot>
      <slot name="supportingInfo">
        <div
          style="
            width: 40%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div v-if="users">
            <font-awesome-icon
              icon="users"
              size="xs"
              style="margin-left: 5px; font-size: 0.8em"
            />
            <span style="margin-left: 5px">{{ users }}</span>
          </div>
          <div v-if="temperature && weatherIcon">
            <font-awesome-icon
              style="margin-left: 5px; font-size: 0.8em"
              :icon="weatherIcon"
            />
            <strong style="margin-left: 2px">{{ temperature }}℃ </strong>
          </div>
          <div v-if="rain">
            <!-- eslint-disable-next-line prettier/prettier -->
          <font-awesome-icon icon="tint" style="margin-left: 5px; font-size: 0.8em" />
            {{ rain + "мм." }}
          </div>
          <div v-if="gt">
            <span class="tag is-light" title="Гектары">{{ gt }} га.</span>
          </div>
        </div>
      </slot>
    </a>
    <div :class="{ 'cpi-hide cpi-box': !dates.isOpen }">
      <slot name="dropDownContent">
        <p>this is template for slot</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gt: String,
    rain: String,
    temperature: String,
    weatherIcon: String,
    users: String,
    dates: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style>
.cpi-dates {
  border-bottom: 1px solid #ededed;
}
.cpi-hide {
  display: none;
}
.cpi-box {
  position: absolute;
}
</style>
