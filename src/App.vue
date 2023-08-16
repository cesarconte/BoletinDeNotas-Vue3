<template>
    <div>
      <header class="app-header" id="app-header">
        <h1>School Report Card</h1>
      </header>
      <main class="app-main" id="app-main">
        <StudentsTest :initialGrades="grades" />
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import StudentsTest from './components/StudentsTest.vue';
  
  const grades = ref([]);
  
  onMounted(() => {
    if (!Array.isArray(grades.value)) {
      throw new Error('Grades must be an array');
    }
  });
  </script>
  
  <style>
  /* Estilos globales desde base.css */
  @import './assets/base.css';
  
  /* Estilos específicos desde main.css */
  @import './assets/main.css';
  
  /* Margen inferior a h1 */
  .app-header h1 {
    color: var(--vt-c-text-dark-1);
    margin-bottom: min(5vh, 40px);
  }
  </style>
  