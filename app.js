// Book Class: Represents a Book
class Student {
    constructor(fname, lname, emailid,city,contactno) {
      this.fname = fname;
      this.lname = lname;
      this.emailid = emailid;
      this.city = city;
      this.contactno = contactno;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayStudents() {
      const students = Store.getStudents();
  
      students.forEach((student) => UI.addStudentToList(student));
    }
  
    static addStudentToList(student) {
      const list = document.querySelector('#student-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${student.fname}</td>
        <td>${student.lname}</td>
        <td>${student.emailid}</td>
        <td>${student.city}</td>
        <td>${student.contactno}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteStudent(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#student-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#fname').value = '';
      document.querySelector('#lname').value = '';
      document.querySelector('#emailid').value = '';
      document.querySelector('#city').value = '';
      document.querySelector('#contactno').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getStudents() {
      let students;
      if(localStorage.getItem('students') === null) {
        students = [];
      } else {
        students = JSON.parse(localStorage.getItem('students'));
      }
  
      return students;
    }
  
    static addStudent(student) {
      const students= Store.getStudents();
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));
    }
  
    static removeStudent(contactno) {
      const students = Store.getStudents();
  
      students.forEach((student, index) => {
        if(student.contactno === contactno) {
          students.splice(index, 1);
        }
      });
  
      localStorage.setItem('students', JSON.stringify(students));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayStudents);
  
  // Event: Add a Book
  document.querySelector('#student-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const emailid = document.querySelector('#emailid').value;
    const city = document.querySelector('#city').value;
    const contactno = document.querySelector('#contactno').value;
  
    // Validate
    if(fname === '' || lname === '' || emailid === '' || city === '' || contactno === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const student = new Student(fname, lname, emailid, city, contactno);
  
      // Add Book to UI
      UI.addStudentToList(student);
  
      // Add book to store
      Store.addStudent(student);
  
      // Show success message
      UI.showAlert('Student Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#student-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteStudent(e.target);
  
    // Remove book from store
    Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Student Removed', 'success');
  });