<script setup>
  const props = defineProps({
    sectionTitle: {type: String, required: true},
    sticky: { type: Boolean, required: false, default: false },
  });
</script>


<template>
  <div class="bar-divider"  :class="{ sticky: sticky }">{{sectionTitle}}</div>
  <div class="session-card">
    <slot />
  </div>
</template>

<style scoped>
  .bar-divider.sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  
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