<script setup>
  const props = defineProps({
    sectionTitle: {type: String, required: true},
  });
</script>


<template>
  <div class="bar-divider">{{sectionTitle}}</div>
  <div class="session-card">
    <slot />
  </div>
</template>

<style scoped>
  .bar-divider {
    background: #2e2e2e;
    border-top: 1px solid #444;
    border-bottom: 1px solid #444;
    padding: 5px 12px;
    font-size: 0.6rem;
    color: #888;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  
  .session-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px 12px;
  }
</style>