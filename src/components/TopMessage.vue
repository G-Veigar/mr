<script setup lang="ts">
const props = defineProps<{
  type: 'error' | 'success',
  show: boolean,
  title: string,
  content: string,
}>()
</script>

<template>
  <Teleport to="body">
    <Transition mode="out-in">
      <div class="top-message" :class="{error: type === 'error', success: type ==='success'}" v-if="show">
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
  border: 1px solid rgba(255, 255, 255, 0.16);

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
</style>
