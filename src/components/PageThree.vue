<script setup lang="ts">

</script>

<template>
  <section class="page page-three">
    <div class="page-main">
      <div class="main-title">DeMR HD Map</div>
      <div class="display-wrapper">
        <div class="row">
          <div class="card-item">
            <img class="card-img" src="../assets/mr4.png" />
            <div class="info">Scenic Era</div>
          </div>
          <div class="card-item">
            <img class="card-img" src="../assets/mr2.png" />
            <div class="info">Exhibition Hall</div>
          </div>
          <div class="card-item">
            <img class="card-img" src="../assets/mr6.png" />
            <div class="info">Museum</div>
          </div>
        </div>
        <div class="row">
          <div class="card-item">
            <img class="card-img" src="../assets/mr3.png" />
            <div class="info">Garden Era</div>
          </div>
          <div class="card-item">
            <img class="card-img" src="../assets/mr1.png" />
            <div class="info">Business Street</div>
          </div>
          <div class="card-item">
            <img class="card-img" src="../assets/mr5.png" />
            <div class="info">Shopping Mall</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-three {
  &.page {
    padding-top: 0;
  }

  .main-title {
    background-image: linear-gradient(45deg, #AD50FF, #6610F2);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    font-size: 32px;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 1.68px;
    margin: 48px 0;
  }

  .display-wrapper {
    padding: 0 24px;
  }

  .row {
    display: flex;
    margin-bottom: 16px;
    flex-direction: column;
  }

  .card-item {
    margin-bottom: 24px;
  }

  .card-img {
    width: 384px;
  }

  .info {
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding: 12px 0;
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .page-three {
    &.page {
      padding-top: 48PX;
    }

    .display-wrapper {
      padding: 0;
    }

    .page-main {
      max-width: 1200PX;
    }

    .card-img {
      width: 384PX;
    }

    .main-title {
      font-size: 56PX;
      margin: 48PX 0;
    }

    .row {
      flex-direction: row;
      margin-bottom: 16PX;
    }

    .card-item {
      margin-bottom: 0;

      &:not(:first-child) {
        margin-left: 24PX;
      }
    }

    .info {
      font-size: 16PX;
      padding: 12PX 0;
    }
  }
}
</style>
