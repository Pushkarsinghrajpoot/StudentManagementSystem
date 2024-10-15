export const saveStudents = (students) => {
    localStorage.setItem('students', JSON.stringify(students));
  };
  
  export const loadStudents = () => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  };