
// The objective of this test is to ensure that the table component renders with the correct headers and cell data.
const { shallowMount } = require('@vue/test-utils');
const TableComponent = require('./TableComponent.vue');

describe('TableComponent', () => {
  it('should render table with correct headers and cell data', () => {
    const wrapper = shallowMount(TableComponent);

    // Assert the presence of table headers
    const headers = wrapper.findAll('.table-header');
    expect(headers.length).toBe(6);
    expect(headers[0].text()).toBe('Student');
    expect(headers[1].text()).toBe('Course');
    expect(headers[2].text()).toBe('Subject');
    expect(headers[3].text()).toBe('Score');
    expect(headers[4].text()).toBe('Grade');
    expect(headers[5].text()).toBe('Actions');

    // Assert the presence of table cell data
    const cells = wrapper.findAll('.table-cell');
    expect(cells.length).toBe(6);
    expect(cells[0].text()).toBe('Doe, John');
    expect(cells[1].text()).toBe('Math');
    expect(cells[2].text()).toBe('Algebra');
    expect(cells[3].text()).toBe('8.5');
    expect(cells[4].text()).toBe('B');
    expect(cells[5].text()).toBe('Edit Delete');
  });
});

// Test that the '.table-cell' class renders with the default styles and properties
function testDefaultStylesAndProperties() {
  // Arrange
  const tableCell = document.createElement('div');
  tableCell.classList.add('table-cell');

  // Act

  // Assert
  expect(tableCell.style.backgroundColor).toBe('var(--color-background-soft)');
}


// Test that students can be added to the table when valid input is provided
function testAddingStudentsToTable() {
  // Arrange
  const table = document.querySelector('.table');
  const initialRowCount = table.rows.length;
  const student = {
    name: 'John',
    lastName: 'Doe',
    course: 'Math',
    subject: 'Algebra',
    score: 8.5
  };
  
  // Act
  addOrUpdateStudent();
  
  // Assert
  assert.equal(table.rows.length, initialRowCount + 1, 'The number of rows in the table should increase by 1');
  assert.equal(table.rows[initialRowCount].cells[0].textContent, 'Doe, John', 'The student name should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[1].textContent, 'Math', 'The course should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[2].textContent, 'Algebra', 'The subject should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[3].textContent, '8.5', 'The score should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[4].textContent, 'A', 'The grade should be displayed correctly in the table');
}


// Test that students can be added to the table when valid input is provided
function testAddingStudentsToTable() {
  // Arrange
  const table = document.querySelector('.table');
  const initialRowCount = table.rows.length;
  const student = {
    name: 'John',
    lastName: 'Doe',
    course: 'Math',
    subject: 'Algebra',
    score: 8.5
  };
  
  // Act
  addOrUpdateStudent();
  
  // Assert
  assert.equal(table.rows.length, initialRowCount + 1, 'The number of rows in the table should increase by 1');
  assert.equal(table.rows[initialRowCount].cells[0].textContent, 'Doe, John', 'The student name should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[1].textContent, 'Math', 'The course should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[2].textContent, 'Algebra', 'The subject should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[3].textContent, '8.5', 'The score should be displayed correctly in the table');
  assert.equal(table.rows[initialRowCount].cells[4].textContent, 'A', 'The grade should be displayed correctly in the table');
}


