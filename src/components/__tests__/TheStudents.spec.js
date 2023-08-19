import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../../App.vue';
import TheStudents from '../TheStudents.vue';

describe('App.vue', () => {
  test('should contain header and main elements', () => {
    const wrapper = mount(App);

    const headerElement = wrapper.find('header');
    const mainElement = wrapper.find('main');

    expect(headerElement.exists()).toBe(true);
    expect(mainElement.exists()).toBe(true);
  });

  test('should contain TheStudents component', () => {
    const wrapper = mount(App);

    const theStudentsComponent = wrapper.findComponent(TheStudents);

    expect(theStudentsComponent.exists()).toBe(true);
  });
});

describe('TheStudents.vue', () => {
  test('should have "form" class', () => {
    const wrapper = mount(TheStudents);
    const formElement = wrapper.find('.form');
    expect(formElement.exists()).toBe(true);
  });

  test('should have "button" class for the "Add Grade" button', () => {
    const wrapper = mount(TheStudents);
    const addButton = wrapper.find('.button');
    expect(addButton.exists()).toBe(true);
  });

  test('should have "table" class for the table element', () => {
    const wrapper = mount(TheStudents);
    const tableElement = wrapper.find('.table');
    expect(tableElement.exists()).toBe(true);
  });

  test('should have correct id for input element', () => {
    const wrapper = mount(TheStudents);
    const inputElement = wrapper.find('#student-name-input');
    expect(inputElement.exists()).toBe(true);
  });

  test('should have correct id for button element', () => {
    const wrapper = mount(TheStudents);
    const buttonElement = wrapper.find('#add-student-btn');
    expect(buttonElement.exists()).toBe(true);
  });

  test('should have correct id for table element', () => {
    const wrapper = mount(TheStudents);
    const tableElement = wrapper.find('#students-table');
    expect(tableElement.exists()).toBe(true);
  });

  test('should receive and display initial grades data', async () => {
    const initialGrades = [
      { name: 'Bob Johnson', course: 'A', subject: 'Science', score: 7 }
    ];
  
    const wrapper = mount(TheStudents, { props: { initialGrades } });
  
    await wrapper.vm.$nextTick();
  
    const studentNames = wrapper.findAll('.table-cell-student-name');
    const studentCourses = wrapper.findAll('.table-cell-student-course');
    const studentSubjects = wrapper.findAll('.table-cell-student-subject');
    const studentScores = wrapper.findAll('.table-cell-student-score');
  
    expect(studentNames[0].text()).toBe('Johnson, Bob');
    expect(studentCourses[0].text()).toBe('A');
    expect(studentSubjects[0].text()).toBe('Science');
    expect(studentScores[0].text()).toBe('7');
  });
  
  test('should filter students by last name', async () => {
    const initialGrades = [
      { name: 'Alice Smith', course: 'A', subject: 'Math', score: 8 },
      { name: 'Bob Johnson', course: 'A', subject: 'Science', score: 7 },
      { name: 'Carol White', course: 'B', subject: 'History', score: 6 },
    ];
    const wrapper = mount(TheStudents, { props: { initialGrades } });
  
    const lastNameFilterInput = wrapper.find('.input[placeholder="Filter by Student Last Name"]');
    await wrapper.vm.$nextTick();
    await lastNameFilterInput.setValue('Johnson');
  
    await wrapper.vm.$nextTick();
  
    const filteredStudents = wrapper.findAll('.table-cell-student-name');
    expect(filteredStudents).toHaveLength(1);
  
    expect(filteredStudents[0].text()).toBe('Johnson, Bob');
  });
  
  test('should filter students by subject', async () => {
    const initialGrades = [
      { name: 'Smith, Alice ', course: 'A', subject: 'Math',  score: 8 },
      { name: 'Johnson, Bob', course: 'B', subject: 'Science', score: 7 },
    ];
    
    const wrapper = mount(TheStudents, { props: { initialGrades } });
  
    const subjectFilterInput = wrapper.find('.input[placeholder="Filter by Subject"]');
    await subjectFilterInput.setValue('Science');
  
    await wrapper.vm.$nextTick();
  
    const studentRows = wrapper.findAll('.table-cell-student-name').length;
    const filteredStudentRows = wrapper.findAll('.table-cell-student-subject').filter(subject => subject.text() === 'Science').length;
  
    expect(filteredStudentRows).toBe(studentRows);
  });
  

  test('filters students by course', async () => {
    const initialGrades = [
      { name: 'Alice Smith', subject: 'Math', course: 'A', score: 8 },
      { name: 'Bob Johnson', subject: 'Science', course: 'B', score: 7 },
      { name: 'Carol White', subject: 'History', course: 'A', score: 6 },
    ];
    const wrapper = mount(TheStudents, { props: { initialGrades } });

    const courseFilterInput = wrapper.find('.input[placeholder="Filter by Course"]');
    await courseFilterInput.setValue('A');

    await wrapper.vm.$nextTick();

    const filteredStudents = wrapper.findAll('.table-cell-student-name');
    expect(filteredStudents).toHaveLength(2);

    expect(filteredStudents[0].text()).toBe('Smith, Alice');
    expect(filteredStudents[1].text()).toBe('White, Carol');
  });
  
});