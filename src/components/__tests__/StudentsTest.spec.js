import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../../App.vue';
import TheStudents from '../TheStudents.vue';

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

      test('the "class" attribute of the header element is correct', () => {
        const wrapper = mount(App);
    
        const headerElement = wrapper.find('header.app-header');
        const classAttribute = headerElement.attributes('class');
    
        expect(classAttribute).toContain('app-header');
      });


    });