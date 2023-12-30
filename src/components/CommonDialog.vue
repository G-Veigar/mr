<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: string,
  content: string,
  show: boolean,
  loading: boolean,
}>()

const emit = defineEmits(['cancel', 'confirm', 'update:show'])

const title = computed(() => {
  if (props.type == 'error') {
    return 'Error'
  }
  return 'Success'
})

function handleCancel() {
  emit('update:show', false)
  emit('cancel')
}
</script>

<template>
  <div class="common-dialog" v-if="show">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-if="!loading">
      <button class="close-btn" @click="$emit('update:show', false)"></button>
      <div class="title">
        <div class="type-icon" :class="{ error: type === 'error' }"></div>{{ title }}
      </div>
      <div class="dialog-content">{{ content }}</div>
      <div class="btn-group">
        <button class="cancel-btn" @click="handleCancel">Cancel</button>
        <button class="confirm-btn" @click="$emit('confirm')">Try again</button>
      </div>
    </div>
    <div class="dialog-box loading-content" v-else>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="loading-tip">Minting NFT</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.common-dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .dialog-box {
    padding: 40px;
    width: 200px;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 70PX;
    height: 70PX;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 50PX;
    height: 50PX;
    margin: 8PX;
    border: 2PX solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }


  .dialog-mask {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.72);
  }

  .dialog-box {
    z-index: 1;
    border-radius: 16PX;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: #000;
    position: relative;
  }

  .loading-content {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-btn {
    position: absolute;
  }

  .title {
    display: flex;
    align-items: center;
    color: #F33;

    .type-icon {
      background: url('../assets/error.svg') 100% / 100%;
    }
  }

  .dialog-content {
    color: #fff;
    text-align: center;
  }

  .btn-group {
    display: flex;
    justify-content: space-between;

    button {
      flex: none;
      color: #fff;
    }

    .cancel-btn {
      background-color: #1C1C1C;
    }

    .confirm-btn {
      background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%), linear-gradient(0deg, #1C1C1C 0%, #1C1C1C 100%), linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%);
    }
  }
}

@media (min-width: 1024px) {
  .common-dialog {
    .dialog-box {
      padding: 40PX;
      width: 480PX;
    }

    .lds-ring {
      margin-bottom: 12PX;
    }

    .close-btn {
      width: 24PX;
      height: 24PX;
      top: 40PX;
      right: 40PX;
      background: url('../assets/close.svg') 100% 100%;
    }

    .title {
      font-size: 16PX;

      .type-icon {
        width: 24PX;
        height: 24PX;
        margin-right: 8PX;

      }
    }

    .dialog-content {
      margin-top: 24PX;
      font-size: 16PX;
      margin-bottom: 16PX;
    }

    .btn-group {
      button {
        width: 194PX;
        height: 36PX;
        line-height: 36PX;
        font-size: 14PX;
        border-radius: 8PX;
      }
    }
  }
}</style>
