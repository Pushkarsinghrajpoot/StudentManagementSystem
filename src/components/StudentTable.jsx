import React from 'react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-center">Age</th>
            <th className="py-3 px-6 text-center">Grade</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {students.map((student) => (
            <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{student.id}</td>
              <td className="py-3 px-6 text-left">{student.name}</td>
              <td className="py-3 px-6 text-center">{student.age}</td>
              <td className="py-3 px-6 text-center">{student.grade}</td>
              <td className="py-3 px-6 text-center">
                <span className={`${student.enrollmentStatus ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} py-1 px-3 rounded-full text-xs`}>
                  {student.enrollmentStatus ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button onClick={() => onEdit(student)} className="mr-2 transform hover:text-purple-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button onClick={() => onDelete(student.id)} className="transform hover:text-red-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;