<script setup lang="ts">
const props = defineProps<{
  type: 'error' | 'success' | 'info',
  show: boolean,
  title: string,
  content: string,
}>()
</script>

<template>
  <Teleport to="body">
    <Transition mode="out-in">
      <div class="top-message" :class="{error: type === 'error', success: type ==='success', info: type === 'info'}" v-if="show">
        <div class="message-content">
          <div class="left-info">
            <div class="title">{{ title }}</div>
            <div class="content">{{ content }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes loading {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.top-message {
  color: #fff;
  position: fixed;
  top: calc(16px + 68px);
  left: 16px;
  right: 16px;
  max-width: 400px;
  padding: 16px;
  z-index: 100;
  border-radius: 16px;
  border: 1PX solid rgba(255, 255, 255, 0.16);
  transition: backgroundColor 0.5s;

  &.info {
    background-color: #000;
    display: flex;
    justify-content: space-between;
    /* position: relative; */
    &::after {
      display: block;
      content: '';
      width: 40px;
      height: 40px;
      background: url('../assets/loading.svg') 100%/100%;
      margin-right: 16px;
      animation: loading 1s linear infinite;
    }
  }

  &.error {
    background: url('../assets/msg-error.svg') no-repeat  40px/40px #F33;
    background-position: right 16px center;
  }

  &.success {
    background: url('../assets/msg-success.svg') no-repeat  40px/40px #3FC74D;
    background-position: right 16px center;
  }

  .title {
    font-size: 16px;
  }

  .content {
    font-size: 12px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
  transform: translateY(-120px);
}

@media (min-width: 1024px) {
  .top-message {
    top: calc(20PX + 68PX);
    left: initial;
    right: 20PX;
    max-width: initial;
    width: 320PX;
    border-radius: 16PX;
    padding: 16PX;

    &.info {
      /* position: relative; */
      &::after {
        width: 40PX;
        height: 40PX;
        margin-right: 16PX;
      }
    }

    &.error {
      background: url('../assets/msg-error.svg') no-repeat  40PX/40PX #F33;
      background-position: right 16PX center;
    }

    &.success {
      background: url('../assets/msg-success.svg') no-repeat  40PX/40PX #3FC74D;
      background-position: right 16PX center;
    }

    .title {
      font-size: 16PX;
    }

    .content {
      font-size: 12PX;
    }
  }
}
</style>
