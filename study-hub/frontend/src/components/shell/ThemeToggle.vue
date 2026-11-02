<template>
  <button class="btn-icon-header" type="button" title="Modo Oscuro / Claro" @click="uiPrefs.toggleDark()">
    🌓
  </button>
</template>

<script setup>
import { useUiPrefsStore } from '@/stores/uiPrefs'
const uiPrefs = useUiPrefsStore()
</script>
