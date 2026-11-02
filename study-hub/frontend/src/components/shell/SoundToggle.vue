<template>
  <button class="btn-icon-header" type="button" title="Sonidos" @click="uiPrefs.toggleMute()">
    {{ uiPrefs.muted ? '🔇' : '🔊' }}
  </button>
</template>

<script setup>
import { useUiPrefsStore } from '@/stores/uiPrefs'
const uiPrefs = useUiPrefsStore()
</script>
