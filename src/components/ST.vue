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
const editIndex = ref(null);

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
    resetFields(fields);
  } else {
    alert('Invalid input. Please fill all fields.');
  }
};

const validateFields = (fields) => {
  return fields.every(field => field.value !== '');
};

const resetFields = (fields) => {
  fields.forEach(field => field.value = '');
};

//const nameFilter = ref('');
const lastNameFilter = ref('');
const courseFilter = ref('');
const subjectFilter = ref('');

const filteredStudents = computed(() => {
  return students.value.filter(student => {
    const studentLastName = student.name.split(' ')[1];
    const nameMatch = studentLastName.toLowerCase().startsWith(lastNameFilter.value.toLowerCase());
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

const editStudent = (index) => {
  const studentToEdit = filteredStudents.value[index];
  studentName.value = studentToEdit.name.split(' ')[0];
  lastName.value = studentToEdit.name.split(' ')[1];
  course.value = studentToEdit.course;
  subject.value = studentToEdit.subject;
  score.value = studentToEdit.score;
  editIndex.value = index;
};

const updateStudent = () => {
  if (editIndex.value !== null) {
    const numericScore = parseFloat(score.value);
    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      alert('Invalid score input. Please enter a number between 0 and 10.');
      return;
    }
    students.value.splice(editIndex.value, 1, {
      name: `${studentName.value} ${lastName.value}`,
      course: course.value,
      subject: subject.value,
      score: numericScore,
      grade: getGradeFromScore(numericScore),
    });
    resetFields([studentName, lastName, course, subject, score]);
    editIndex.value = null;
  }
};

const cancelEdit = () => {
  resetFields([studentName, lastName, course, subject, score]);
  editIndex.value = null;
};

const deleteStudent = (index) => {
  students.value.splice(index, 1);
};

const isEditing = computed(() => editIndex.value !== null);

const validateScore = () => {
  if (score.value < 0) {
    score.value = 0;
  } else if (score.value > 10) {
    score.value = 10;
  }
};

const clampScore = () => {
  if (score.value === '') {
    return;
  }

  validateScore();
};

onMounted(() => {
  if (props.initialGrades && Array.isArray(props.initialGrades)) {
    students.value = props.initialGrades;
  }
});
</script>


<template>
  <div class="form">
    <h2>Add Student's Grades</h2>
    <form @submit.prevent="addGrade">
      <input class="input" id="student-name-input" v-model="studentName" placeholder="Student First Name" autocomplete="off" />
      <input class="input" id="student-last-name-input" v-model="lastName" placeholder="Student Last Name" autocomplete="off" />
      <input class="input" id="course-input" v-model="course" placeholder="Course" autocomplete="off" />
      <input class="input" id="subject-input" v-model="subject" placeholder="Subject" autocomplete="off" />
      <input class="input" id="score-input" v-model.number="score" type="number" step="0.1" placeholder="Score" autocomplete="off"
        @input="validateScore" @blur="clampScore" />
        <div class="action-buttons" id="action-buttons-id">
          <button class="button" id="add-student-btn" type="submit" v-if="!isEditing">
            Add Student
          </button>
          <div v-if="isEditing">
            <button class="button" id="update-btn" type="button" @click="updateStudent">Update</button>
            <button class="button" id="cancel-btn" @click="cancelEdit">Cancel</button>
          </div>
        </div>
    </form>

    <form>
      <input class="input" v-model="lastNameFilter" placeholder="Filter by Student Last Name" />
      <input class="input" v-model="courseFilter" placeholder="Filter by Course" />
      <input class="input" v-model="subjectFilter" placeholder="Filter by Subject" /> 
    </form>

    <table class="table" id="students-table">
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
        <tr v-for="(studentData, index) in filteredStudents" :key="index">
          <td class="table-cell table-cell-student-name">{{ studentData.name.split(' ').reverse().join(', ') }}</td>
          <td class="table-cell table-cell-student-course">{{ studentData.course }}</td>
          <td class="table-cell table-cell-student-subject">{{ studentData.subject }}</td>
          <td class="table-cell table-cell-student-score">{{ studentData.score }}</td>
          <td class="table-cell table-cell-grade">{{ getGradeFromScore(studentData.score) }}</td>
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
  