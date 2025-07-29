"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
}

const StudentCard: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get("http://localhost:8080/hello");
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!student) return <div className="p-4">Student not found</div>;

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className="max-w-sm bg-white rounded-lg shadow-md p-4 border">
        <div className="mb-3">
          <h3 className="font-bold text-lg">{student.name}</h3>
          <p className="text-gray-600">{student.subject}</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">ID:</span> {student.id}
          </div>
          <div>
            <span className="font-medium">Email:</span> {student.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {student.phone}
          </div>
          <div>
            <span className="font-medium">Address:</span> {student.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;