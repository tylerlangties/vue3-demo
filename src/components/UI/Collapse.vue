<template>
  <div class="accordion-item">
    <dt class="accordion-item-title">
      <button
        @click="toggle"
        class="flex justify-between w-full accordion-item-trigger"
      >
        <h4 class="accordion-item-title-text"><slot name="title"></slot></h4>
        <i class="fas fa-angle-down"></i>
      </button>
    </dt>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <dd v-show="open" class="accordion-item-details">
        <div class="accordion-item-details-inner">
          <slot name="body"></slot>
        </div>
      </dd>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  props: {
    openDefault: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.openDefault) this.open = true
  },
  methods: {
    toggle(event) {
      this.open = !this.open
    },

    startTransition(el) {
      el.style.height = el.scrollHeight + 'px'
    },

    endTransition(el) {
      el.style.height = ''
    }
  }
}
</script>

<style>
.box {
  background-color: white;
  border-radius: 5px;

  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

.accordion {
  padding: 0;
}
.accordion div:not(:last-child) {
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);
}
.accordion div:last-child .accordion-item-details {
  border-radius: 5px;
}
.accordion dd {
  margin-left: 0;
}

.accordion-item-trigger,
.accordion-item-details-inner {
  padding: 0.75rem 1.25rem;
}

.accordion-item-trigger-icon {
  display: block;
  position: absolute;
  top: 0;
  right: 1.25rem;
  bottom: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid #363636;
  border-bottom: 2px solid #363636;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 0.2s ease;
}
.is-active .accordion-item-trigger-icon {
  transform: translateY(2px) rotate(225deg);
}

.accordion-item-details {
  overflow: hidden;
  background-color: whitesmoke;
}

.accordion-item-enter-active,
.accordion-item-leave-active {
  transition: height 0.2s ease;
}

.accordion-item-enter,
.accordion-item-leave-to {
  height: 0 !important;
}
</style>
