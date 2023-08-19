import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../../App.vue';
import StudentsTest from '../StudentsTest.vue';

describe('App Component', () => {
    test('should contain header and main elements', () => {
        const wrapper = mount(App);
    
        const headerElement = wrapper.find('header');
        const mainElement = wrapper.find('main');
    
        expect(headerElement.exists()).toBe(true);
        expect(mainElement.exists()).toBe(true);
      });

      test('the StudentsTest component is present', () => {
        const wrapper = mount(App);
    
        const studentsTestComponent = wrapper.findComponent({ name: 'StudentsTest' });
        expect(studentsTestComponent.exists()).toBe(true);
      });

      test('the "class" attribute of the main element is correct', () => {
        const wrapper = mount(App);
      
        const mainElement = wrapper.find('main.app-main');
        const classAttribute = mainElement.attributes('class');
      
        expect(classAttribute).toContain('app-main');
      });

      test('the "class" attribute of the header element is correct', () => {
        const wrapper = mount(App);
    
        const headerElement = wrapper.find('header.app-header');
        const classAttribute = headerElement.attributes('class');
    
        expect(classAttribute).toContain('app-header');
      });

      test('the "id" attribute of the header element is correct', () => {
        const wrapper = mount(App);
    
        const headerElement = wrapper.find('header#app-header-id'); 
        expect(headerElement.exists()).toBe(true);
      });
    
      test('the "id" attribute of the main element is correct', () => {
        const wrapper = mount(App);
    
        const mainElement = wrapper.find('main#app-main-id');
        expect(mainElement.exists()).toBe(true);
      });
    });

    describe('StudentsTest Component', () => {
      const initialGrades = [
        { name: 'Doe, John', course: 'Math', subject: 'Algebra', score: 8.5 }
      ];
      
      test('the "class" attribute of the form element is correct', () => {
        const wrapper = mount(StudentsTest);
      
        const formElement = wrapper.find('div.form');
        const classList = formElement.classes();
      
        expect(classList).toContain('form');
      });
        
      test('the "class" attribute of the input elements is correct', () => {
        const wrapper = mount(StudentsTest);
    
        const inputElements = wrapper.findAll('input.input');
        inputElements.forEach((inputElement) => {
          const classAttribute = inputElement.attributes('class');
          expect(classAttribute).toContain('input');
        });
      });

      test('the "class" attribute of the table element is correct', () => {
        const wrapper = mount(StudentsTest);
    
        const tableElement = wrapper.find('table.table');
        const classAttribute = tableElement.attributes('class');
  
        expect(classAttribute).toContain('table');
      });

      test('the "id" attribute of the form element is correct', () => {
          const wrapper = mount(StudentsTest);
      
          const formElement = wrapper.find('div#students-form');
          expect(formElement.exists()).toBe(true);
        });
        
        test('the "id" attribute of the input elements is correct', () => {
          const wrapper = mount(StudentsTest);
      
          const inputNameElement = wrapper.find('input#student-name-input');
          expect(inputNameElement.exists()).toBe(true);
      
          const inputLastNameElement = wrapper.find('input#student-lastName-input');
          expect(inputLastNameElement.exists()).toBe(true);
      
          const inputCourseElement = wrapper.find('input#student-course-input');
          expect(inputCourseElement.exists()).toBe(true);
      
          const inputSubjectElement = wrapper.find('input#student-subject-input');
          expect(inputSubjectElement.exists()).toBe(true);
      
          const inputScoreElement = wrapper.find('input#student-score-input');
          expect(inputScoreElement.exists()).toBe(true);
        });
      
        test('the "id" attribute of the action buttons element is correct', () => {
          const wrapper = mount(StudentsTest);
      
          const actionButtonsElement = wrapper.find('div#action-buttons-id');
          expect(actionButtonsElement.exists()).toBe(true);
        });
      
        test('the "id" attribute of the table element is correct', () => {
          const wrapper = mount(StudentsTest);
      
          const tableElement = wrapper.find('table#students-table');
          expect(tableElement.exists()).toBe(true);
        });
      
        test('the "id" attribute of the filter elements is correct', () => {
          const wrapper = mount(StudentsTest);
      
          const lastNameFilterElement = wrapper.find('input#lastName-filter');
          expect(lastNameFilterElement.exists()).toBe(true);
      
          const courseFilterElement = wrapper.find('input#course-filter');
          expect(courseFilterElement.exists()).toBe(true);
      
          const subjectFilterElement = wrapper.find('input#subject-filter');
          expect(subjectFilterElement.exists()).toBe(true);
        });
        
        test('should receive and display initial grades data', async () => {
          const wrapper = mount(StudentsTest);
      
          await wrapper.vm.$nextTick();
      
          const studentNames = wrapper.findAll('.table-cell-student-name');
          const studentCourses = wrapper.findAll('.table-cell-student-course');
          const studentSubjects = wrapper.findAll('.table-cell-student-subject');
          const studentScores = wrapper.findAll('.table-cell-student-score');
      
          expect(studentNames[0].text()).toBe('Doe, John');
          expect(studentCourses[0].text()).toBe('Math');
          expect(studentSubjects[0].text()).toBe('Algebra');
          expect(studentScores[0].text()).toBe('8.5');
        });
        
          
      });