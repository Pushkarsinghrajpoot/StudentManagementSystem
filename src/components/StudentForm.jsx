import React, { useState } from 'react';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [name, setName] = useState(student?.name || '');
  const [age, setAge] = useState(student?.age?.toString() || '');
  const [grade, setGrade] = useState(student?.grade || 'A');
  const [enrollmentStatus, setEnrollmentStatus] = useState(student?.enrollmentStatus || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || isNaN(Number(age)) || Number(age) <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }
    onSubmit({ name, age: Number(age), grade, enrollmentStatus });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age:</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="1"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade:</label>
        <select
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['A', 'B', 'C', 'D', 'F'].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={enrollmentStatus}
            onChange={() => setEnrollmentStatus(!enrollmentStatus)}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Active Enrollment</span>
        </label>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
          {student ? 'Update' : 'Add'} Student
        </button>
      </div>
    </form>
  );
};

export default StudentForm;