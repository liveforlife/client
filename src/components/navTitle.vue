<template>
  <div class="title-content">
    <span><slot></slot></span>
  </div>
</template>
<style>
  .title-content{
      width: 100%;
      height: 20px;
      border-bottom: solid #d8d8d8 1px;
      margin-bottom: 50px;
      background: #ffffff;
  }
  .title-content span{
      display: block;
      width: 170px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #397cf1;
      margin: 0 auto;
      letter-spacing: 2px;
      background: #ffffff;
  }
</style>
