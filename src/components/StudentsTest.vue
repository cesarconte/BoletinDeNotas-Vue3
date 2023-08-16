<template>
    <div class="form">
      <h2>Add Grades</h2>
      <form @submit.prevent="addOrUpdateStudent">
        <input class="input" v-model="student.name" placeholder="Student First Name" autocomplete="off" />
        <input class="input" v-model="student.lastName" placeholder="Student Last Name" autocomplete="off" />
        <input class="input" v-model="student.course" placeholder="Course" autocomplete="off" />
        <input class="input" v-model="student.subject" placeholder="Subject" autocomplete="off" />
        <input class="input" v-model.number="student.score" type="number" step="0.1" placeholder="Score" autocomplete="off" />
        <div class="action-buttons">
            <button class="button" id="add-grade-button" type="submit">
                {{ isEditing ? 'Update' : 'Add Student' }}
            </button>
            <button class="button" v-if="isEditing" @click="cancelEdit">Cancel</button>
        </div>
      </form>
  
      <form>
        <input class="input" v-model="filters.lastName" placeholder="Filter by Last Name" />
        <input class="input" v-model="filters.course" placeholder="Filter by Course" />
        <input class="input" v-model="filters.subject" placeholder="Filter by Subject" /> 
      </form>
  
      <table class="table" id="grade-table">
        <thead>
          <tr>
            <th class="table-header">Student</th>
            <th class="table-header">Course</th>
            <th class="table-header">Subject</th>
            <th class="table-header">Score</th>
            <th class="table-header">Grade</th>
            <th class="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="index">
              <td class="table-cell table-cell-student-name">{{ student.lastName }}, {{ student.name }}</td>
              <td class="table-cell table-cell-student-course">{{ student.course }}</td>
              <td class="table-cell table-cell-student-subject">{{ student.subject }}</td>
              <td class="table-cell table-cell-student-score">{{ student.score }}</td>
              <td class="table-cell table-cell-grade">{{ getGradeFromScore(student.score) }}</td>
              <td class="table-cell table-cell-actions">
                <div class="action-buttons">
                    <button class="button" @click="editStudent(index)">Edit</button>
                    <button class="button" @click="deleteStudent(index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const student = ref({
    name: '',
    lastName: '',
    course: '',
    subject: '',
    score: 0,
    editIndex: null,
  });
  
  const students = ref([]);
  const filters = ref({
    lastName: '',
    course: '',
    subject: '',
  });
  const isEditing = computed(() => student.value.editIndex !== null);
  
  const addOrUpdateStudent = () => {
    if (isStudentValid.value) {
      const newStudent = {
        ...student.value,
        grade: getGradeFromScore(student.value.score),
      };
  
      if (isEditing.value) {
        students.value.splice(student.value.editIndex, 1, newStudent);
        student.value.editIndex = null;
      } else {
        students.value.push(newStudent);
      }
  
      resetStudent();
    } else {
      alert('Invalid input. Please fill all fields.');
    }
  };
  
  const editStudent = (index) => {
    const studentToEdit = students.value[index];
    student.value = { ...studentToEdit, editIndex: index };
  };
  
  const deleteStudent = (index) => {
    students.value.splice(index, 1);
  };
  
  const resetStudent = () => {
    student.value = {
      name: '',
      lastName: '',
      course: '',
      subject: '',
      score: 0,
      editIndex: null,
    };
  };
  
  const isStudentValid = computed(() => {
    const { name, lastName, course, subject, score } = student.value;
    return (
      name.trim() !== '' &&
      lastName.trim() !== '' &&
      course.trim() !== '' &&
      subject.trim() !== '' &&
      score >= 0 && score <= 10
    );
  });
  
  const filteredStudents = computed(() => {
    return students.value.filter(student => {
      return Object.entries(filters.value).every(([key, filterValue]) =>
        student[key].toLowerCase().includes(filterValue.toLowerCase())
      );
    });
  });
  
  const getGradeFromScore = (score) => {
  switch (true) {
    case score >= 0 && score < 3:
      return 'F';
    case score >= 3 && score < 5:
      return 'D';
    case score >= 5 && score < 6:
      return 'C';
    case score >= 6 && score < 7:
      return 'B';
    case score >= 7 && score <= 10:
      return 'A';
    default:
      return 'Unknown';
  }
};
  </script>
  
  <style scoped>
  @import '../assets/base.css';
  @import '../assets/main.css';

  .form {
    margin-bottom: 20px;
  }

  .input {
    padding: 8px;
    margin: 10px 10px 10px 0;
  }

  .button {
    padding: 8px 12px;
    background-color: hsla(160, 100%, 37%, 1);
    color: var(--vt-c-white);
    border: none;
    cursor: pointer;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: min(20vh, 10vh);
  }

  .table-header,
  .table-cell {
    border: 1px solid var(--color-border);
    padding: 8px;
    text-align: left;
  }

  .table-header {
    background-color: var(--color-background-mute);
  }

  .table-cell {
    background-color: var(--color-background-soft);
  }
  .table-cell-actions {
    width: 1%;
    white-space: nowrap;
  }
</style>
  