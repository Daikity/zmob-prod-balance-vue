<template>
  <div class="dropdown is-active" :class="getPosition">
    <div class="dropdown-trigger">
      <div @click="show = !show">
        <slot name="trigger">
          <button
            class="button is-small"
            aria-haspopup="true"
            aria-controls="dropdown-menu6"
          >
            <span>Use <strong>trigger</strong> slot</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </slot>
      </div>
    </div>
    <div class="dropdown-menu" id="dropdown-menu6" role="menu" v-if="show">
      <div class="dropdown-content">
        <slot name="content">
          <div class="dropdown-item">
            <p>
              If you need update data here, use <strong>content</strong> slot
              and add all content in <strong>div.dropdown-item</strong>
            </p>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    getPosition() {
      let position_class;
      switch (this.position) {
        case "right":
          position_class = "is-right";
          break;
        case "up":
          position_class = "is-up";
          break;
        default:
          position_class = "";
          break;
      }
      return position_class;
    },
  },
};
</script>

<style>
.dropdown-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
