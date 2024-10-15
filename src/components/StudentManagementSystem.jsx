import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm.jsx';
import StudentTable from './StudentTable.jsx';
import { saveStudents, loadStudents } from '../utils/localStorage.js';

const StudentManagementSystem = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const storedStudents = loadStudents();
    setStudents(storedStudents || []);
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      saveStudents(students);
    }
  }, [students]);

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents([...students, newStudent]);
    setIsAddDialogOpen(false);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || 
                          (filterStatus === 'Active' && student.enrollmentStatus) || 
                          (filterStatus === 'Inactive' && !student.enrollmentStatus);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Student Record Management System</h1>

      <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow md:w-1/3 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="flex-grow md:w-1/3 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button 
          onClick={() => setIsAddDialogOpen(true)} 
          className="flex-grow md:w-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Add Student
        </button>
      </div>

      <StudentTable
        students={filteredStudents}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />

      {(isAddDialogOpen || editingStudent) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-6">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <StudentForm
              student={editingStudent}
              onSubmit={(student) => {
                if (editingStudent) {
                  updateStudent({ ...student, id: editingStudent.id });
                } else {
                  addStudent(student);
                }
              }}
              onCancel={() => {
                setEditingStudent(null);
                setIsAddDialogOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagementSystem;