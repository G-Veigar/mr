<script setup lang="ts">
defineProps<{
  activeIndex: number,
}>()

defineEmits(['change'])

const tabList = ['Contributor', 'Computing Node', 'Landholder']
</script>

<template>
  <div class="tab-bar">
    <div
      class="tab-bar-item"
      :class="{active: activeIndex === index}"
      v-for="(item, index) in tabList"
      :key="item"
      @click="$emit('change', index)"
    >{{ item }}</div>
  </div>
</template>

<style scoped>
.tab-bar {
  flex: auto;
  display: flex;
  border-radius: 16px;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.20);
  padding: 8px;
  .tab-bar-item {
    max-width: 104px;
    flex: none;
    display: flex;
    align-items: center;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.40);
    text-align: center;
    font-size: 14px;
    padding: 0 10px;
    font-weight: 700;
    height: 48px;
    cursor: pointer;
    transition: all 0.3s;
    &.active {
      background: rgba(255, 255, 255, 0.20);
      color: #fff;
    }
  }
}

@media (min-width: 1024px) {
  .tab-bar {
    padding: 8PX;
    border-radius: 16PX;
    .tab-bar-item {
      border-radius: 12PX;
      max-width: initial;
      font-size: 20PX;
      padding: 0 16PX;
      height: 48PX;
      &:not(:first-child) {
        margin-left: 24PX;
      }
    }
  }
}
</style>
