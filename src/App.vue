<script setup>
import { ref, onMounted } from 'vue';
import TheStudents from './components/TheStudents.vue';

const grades = ref([]);

onMounted(() => {
  if (!Array.isArray(grades.value)) {
    throw new Error('Grades must be an array');
  }
});
</script>

<template>
  <div>
    <header class="app-header" id="app-header">
      <h1>School Report Card</h1>
    </header>
    <main class="app-main" id="app-main">
      <TheStudents :initialGrades="grades" />
    </main>
  </div>
</template>

<style>
/* Estilos globales desde base.css */
@import './assets/base.css';

/* Estilos específicos desde main.css */
@import './assets/main.css';

/* Margen inferior a h1 */
.app-header h1 {
  color: var(--vt-c-text-dark-1);;
  margin-bottom: min(5vh, 40px);
}
</style>
