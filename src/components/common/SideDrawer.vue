
<script setup>
  import {ref} from 'vue';

  const isOpen = ref(false);
</script>

<template>
  <button class="tog" v-if="!isOpen" @click="isOpen = !isOpen">📋 履歴 ›</button>
  <div class="drw"  :class="{ closed: !isOpen }">
    <button v-if="isOpen" class="close-btn" @click="isOpen = !isOpen">✕</button>
    <slot/>
  </div>

</template>

<style scoped>
  .drw {
    position: fixed;
    right: 0;
    top: 0;
    width: 262px;
    height: 100vh;
    background: #252525;
    border-left: 1px solid #555;
    overflow: hidden;
    transition: width 0.3s ease;
  }
  .drw.closed { width: 0; border: none; }
  .tog { 
    position: absolute; 
    top: 6px;
    right: 10px; 
    font-size: 0.78rem;      
    padding: 7px 14px;       
    cursor: pointer;
    z-index: 10;
    background: #444;
    border: 1px solid #666;
    color: #aaa;
    border-radius: 6px;      
  }
  .tog:hover { background: #4a4a4a; }

  .close-btn {
    position: absolute;
    top: 7px;
    right: 10px;
    z-index: 1;
    font-size: 0.65rem;
    background: #444;
    border: 1px solid #666;
    color: #aaa;
    border-radius: 2px;
    padding: 2px 7px;
    cursor: pointer;
    }
</style>