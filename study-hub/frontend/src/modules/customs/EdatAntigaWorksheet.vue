<template>
  <div class="ea-worksheet">
    <div class="ea-ws-toolbar">
      <div>
        <h4>🖨️ Fitxa d'Estudi i Pràctica: L'Edat Antiga</h4>
        <p>Pots imprimir aquesta fitxa o mostrar-ne el solucionari per repassar abans de l'examen.</p>
      </div>
      <div class="ea-ws-actions">
        <button type="button" class="ea-mode-btn" @click="showSolutions = !showSolutions">
          {{ showSolutions ? '🙈 Amagar solucions' : '👁️ Mostrar solucions' }}
        </button>
        <button type="button" class="ea-next-btn" @click="printSheet">
          🖨️ Imprimir fitxa
        </button>
      </div>
    </div>

    <div class="ea-ws-paper">
      <div class="ea-ws-block">
        <h5>1. Relaciona cada civilització fluvial amb el seu riu i aportació:</h5>
        <ul>
          <li><strong>Egipte:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Riu Nil (piràmides i faraons)' : '_______________________________' }}</span></li>
          <li><strong>Mesopotàmia:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Rius Tigris i Eufrates (primera escriptura)' : '_______________________________' }}</span></li>
          <li><strong>Civilització Índia:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Riu Indus (ciutats planificades de rajola i clavegueram)' : '_______________________________' }}</span></li>
          <li><strong>Civilització Xina:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Riu Groc (arròs, seda i tinta)' : '_______________________________' }}</span></li>
        </ul>
      </div>

      <div class="ea-ws-block">
        <h5>2. Compara els pobles preromans i colonitzadors de la Península Ibèrica:</h5>
        <ul>
          <li><strong>Ibers (zona, cases i escriptura):</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Costa mediterrània (est i sud), cases rectangulars, sí tenien moneda i escriptura ibèrica.' : '________________________________________________' }}</span></li>
          <li><strong>Celtes (zona, poblats i economia):</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Nord, oest i Messeta, castres amb cases circulars, ramaderia i metalls (sense escriptura ni moneda).' : '________________________________________________' }}</span></li>
          <li><strong>Ordre i ciutats dels 3 pobles colonitzadors:</strong> <span class="ea-ws-blank">{{ showSolutions ? '1r Fenicis (Gades/Cadis), 2n Grecs (Empòrion/Empúries i Rhode/Roses), 3r Cartaginesos (Cartago Nova i Eivissa).' : '________________________________________________' }}</span></li>
        </ul>
      </div>

      <div class="ea-ws-block">
        <h5>3. La Romanització d'Hispània, Ciutats Catalanes i Edificis Romans:</h5>
        <ul>
          <li><strong>Inici i final de la conquesta romana:</strong> <span class="ea-ws-blank">{{ showSolutions ? '218 aC (desembarcament a Empúries) fins al 19 aC (emperador August) — més de 200 anys.' : '________________________________________________' }}</span></li>
          <li><strong>Noms romans de Tarragona, Barcelona, Girona i Lleida:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Tàrraco, Barcino, Gerunda i Ilerda.' : '________________________________________________' }}</span></li>
          <li><strong>Diferència entre Domus, Insulae i Vil·la:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Domus (casa rica unifamiliar), Insulae (edifici de pisos humil), Vil·la (gran casa de camp agrícola).' : '________________________________________________' }}</span></li>
          <li><strong>Diferència entre Teatre, Amfiteatre i Circ:</strong> <span class="ea-ws-blank">{{ showSolutions ? 'Teatre (comèdies i tragèdies), Amfiteatre (lluites de gladiadors), Circ (curses de carros / quadrigues).' : '________________________________________________' }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showSolutions = ref(false)

function printSheet() {
  window.print()
}
</script>

