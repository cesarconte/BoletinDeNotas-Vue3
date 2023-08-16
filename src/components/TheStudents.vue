<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';

const props = defineProps({
  initialGrades: Array
});

const studentName = ref('');
const lastName = ref('');
const course = ref('');
const subject = ref('');
const score = ref('');
const students = ref([]);

const addGrade = () => {
  const fields = [studentName, lastName, course, subject, score];
  if (validateFields(fields)) {
    const numericScore = parseFloat(score.value);
    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      alert('Invalid score input. Please enter a number between 0 and 10.');
      return;
    }
    students.value.push({
      name: `${studentName.value} ${lastName.value}`,
      course: course.value,
      subject: subject.value,
      score: numericScore,
      grade: getGradeFromScore(numericScore),
    });
    [studentName, lastName, course, subject, score].forEach(field => field.value = '');
  } else {
    alert('Invalid input. Please fill all fields.');
  }
};

const validateFields = (fields) => {
  return fields.every(field => field.value !== '');
};

const nameFilter = ref('');
const courseFilter = ref('');
const subjectFilter = ref('');

const filteredStudents = computed(() => {
  return students.value.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(nameFilter.value.toLowerCase());
    const courseMatch = student.course.toLowerCase().includes(courseFilter.value.toLowerCase());
    const subjectMatch = student.subject.toLowerCase().includes(subjectFilter.value.toLowerCase());
    return nameMatch && courseMatch && subjectMatch;
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

onMounted(() => {
  if (props.initialGrades && Array.isArray(props.initialGrades)) {
    students.value = props.initialGrades;
  }
});
</script>

<template>
  <div class="form">
    <h2>Add Grades</h2>
    <form @submit.prevent="addGrade">
      <input class="input" id="student-name-input" v-model="studentName" placeholder="Student First Name" autocomplete="off" />
      <input class="input" id="student-last-name-input" v-model="lastName" placeholder="Student Last Name" autocomplete="off" />
      <input class="input" id="course-input" v-model="course" placeholder="Course" autocomplete="off" />
      <input class="input" id="subject-input" v-model="subject" placeholder="Subject" autocomplete="off" />
      <input class="input" id="score-input" v-model.number="score" type="number" step="0.1" placeholder="Score" autocomplete="off" />

      <button class="button" id="add-grade-button" type="submit">Add Grade</button>
    </form>

    <form>
      <input class="input" v-model="nameFilter" placeholder="Filter by Student Name" />
      <input class="input" v-model="courseFilter" placeholder="Filter by Course" />
      <input class="input" v-model="subjectFilter" placeholder="Filter by Subject" /> 
    </form>

    <table class="table" id="grade-table">
      <thead>
        <tr>
          <th class="table-header">Student</th>
          <th class="table-header">Course</th>
          <th class="table-header">Subject</th>
          <th class="table-header">Score</th>
          <th class="table-header">Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td class="table-cell table-cell-student-name">{{ student.name }}</td>
          <td class="table-cell table-cell-student-course">{{ student.course }}</td>
          <td class="table-cell table-cell-student-subject">{{ student.subject }}</td>
          <td class="table-cell table-cell-student-score">{{ student.score }}</td>
          <td class="table-cell table-cell-grade">{{ getGradeFromScore(student.score) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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
</style>