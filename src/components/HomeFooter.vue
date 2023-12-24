<script lang="ts" setup>
function goTwitter() {
  window.open('https://x.com/DeMR_official?s=20')
}

function goDiscord() {
  window.open('https://discord.gg/msjPncCnsJ')
}

function goMedium() {
  window.open('https://medium.com/@DeMR_official')
}
</script>

<template>
  <footer id="home-footer">
    <div class="btn-group">
      <button class="btn" @click="goTwitter"><img src="../assets/footer-btn1.png"></button>
      <button class="btn" @click="goDiscord"><img src="../assets/footer-btn2.png"></button>
      <button class="btn" @click="goMedium"><img src="../assets/footer-btn3.png"></button>
    </div>
  </footer>
</template>

<style scoped>
#home-footer {
  display: none;
}

@media (min-width: 1024px) {
  #home-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 16PX 0;
    background: rgba(0, 0, 0, 0.16);
    backdrop-filter: blur(4PX);
    z-index: 100;

    .btn-group {
      flex: auto;
      max-width: 1200PX;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .btn {
        width: 32PX;
        height: 32PX;
        margin-left: 32PX;
      }
    }
  }
}
</style>
