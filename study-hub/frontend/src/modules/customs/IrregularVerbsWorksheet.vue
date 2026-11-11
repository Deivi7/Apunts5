<template>
  <div class="iv-worksheet">
    <div class="iv-ws-toolbar no-print">
      <div>
        <h4>🖨️ Ficha Imprimible de los 57 Verbos Irregulares por Familias</h4>
        <p>Elige qué columna dejar en blanco para practicar en papel o muestra la tabla completa.</p>
      </div>
      <div class="iv-ws-actions">
        <button
          type="button"
          class="iv-dir-btn"
          :class="{ active: blankMode === 'past' }"
          @click="blankMode = 'past'"
        >
          Hueco en PAST
        </button>
        <button
          type="button"
          class="iv-dir-btn"
          :class="{ active: blankMode === 'present' }"
          @click="blankMode = 'present'"
        >
          Hueco en PRESENT
        </button>
        <button
          type="button"
          class="iv-dir-btn"
          :class="{ active: blankMode === 'show' }"
          @click="blankMode = 'show'"
        >
          👁️ Ver Soluciones
        </button>
        <button type="button" class="iv-next-btn" @click="printSheet">
          🖨️ Imprimir
        </button>
      </div>
    </div>

    <div class="iv-ws-grid">
      <div v-for="fam in VERB_FAMILIES" :key="fam.id" class="iv-ws-card">
        <h5 :style="{ color: fam.color }">{{ fam.icon }} {{ fam.title }}</h5>
        <table class="du-table">
          <thead>
            <tr>
              <th>Present</th>
              <th>Past Simple</th>
              <th>Significado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in fam.verbs" :key="v.present">
              <td>
                <strong>{{ blankMode === 'present' ? '_____________' : v.present }}</strong>
              </td>
              <td>
                <strong>{{ blankMode === 'past' ? '_____________' : v.past }}</strong>
              </td>
              <td>{{ v.es }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VERB_FAMILIES } from '../amco/irregularVerbsData.js'

const blankMode = ref('past')

function printSheet() {
  window.print()
}
</script>

