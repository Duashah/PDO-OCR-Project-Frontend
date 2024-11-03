"use client";

import React, { useState, useEffect } from 'react';
import { Search, Settings, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import axios from 'axios';



const FileManagementUI = () => {
    const router = useRouter();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/jobs/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const jobs = response.data.map(job => ({
                    id: job.title,
                    days: job.days || [false, false, false, false, false, false, false],
                    from: job.at_from,
                    to: job.to,
                    every: job.every,
                    status: job.status,
                    selected: job.selected || false, // Set to false if `selected` is not in the response
                }));
                
                setFiles(jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const dayHeaders = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const handleNewFile = async () => {
        const newJob = {
            title: `JOB#${files.length + 1}`,
            status: 'Inactive',
            active_days: {
                "MON": false,
                "TUE": false,
                "WED": false,
                "THU": false,
                "FRI": false,
                "SAT": false,
                "SUN": false
            },
            at_from: '2024-11-01T00:00:00',
            to: '2024-11-01T23:59:00',
            every: '00:00',
        };
    
        const token = localStorage.getItem('access_token');
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/jobs/', newJob, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            // Create the new job object with the correct structure
            const newFile = {
                id: response.data.id,  // assuming the id is returned in the response
                days: Object.values(newJob.active_days),  // Directly use active_days
                from: newJob.at_from,
                to: newJob.to,
                every: newJob.every,
                status: newJob.status,
                selected: false // default to false
            };
    
            // Update the files state with the new job
            setFiles(prevFiles => [...prevFiles, newFile]);
            console.log('Job created successfully:', response.data);
        } catch (error) {
            console.error('Error creating job:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        }
    };
    
// Default to an empty array if undefined

const handleDelete = async () => {
    const token = localStorage.getItem('access_token');
    const deletePromises = files
        .filter(file => file.selected)
        .map(file => {
            return axios.delete(`http://127.0.0.1:8000/jobs/${file.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

    try {
        await Promise.all(deletePromises);
        const updatedFiles = files.filter(file => !file.selected);
        setFiles(updatedFiles);
        console.log('Selected jobs deleted successfully');
    } catch (error) {
        console.error('Error deleting jobs:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
    };
};

// Other code remains unchanged...

    const handleToggleStatus = () => {
        const updatedFiles = files.map(file => ({
            ...file,
            status: file.selected ? (file.status === 'Active' ? 'Inactive' : 'Active') : file.status
        }));
        setFiles(updatedFiles);
    };

    const handleCheckbox = (id) => {
        const updatedFiles = files.map(file => ({
            ...file,
            selected: file.id === id ? !file.selected : file.selected
        }));
        setFiles(updatedFiles);
    };

    const handleDayCheckbox = (id, dayIndex) => {
        const updatedFiles = files.map(file => {
            if (file.id === id) {
                const updatedDays = [...file.days];
                updatedDays[dayIndex] = !updatedDays[dayIndex];
                return { ...file, days: updatedDays };
            }
            return file;
        });
        setFiles(updatedFiles);
    };
    const handleJobClick = (id) => {
       // router.push(`/job/${id}`);
       router.push(`/dashboard/task`);
    };
    
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                    <h1 className="text-xl font-semibold">File IDs ({files.length})</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative z-1">
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                        <button onClick={handleNewFile} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            New
                        </button>
                        <button onClick={handleDelete} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Delete
                        </button>
                        <button onClick={handleToggleStatus} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Active/Inactive
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <FileText className="w-5 h-5" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="w-12 py-3 px-4"></th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Name</th>
                                {dayHeaders.map((day, index) => (
                                    <th key={index} className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{day}</th>
                                ))}
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">At/From</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Every</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {files.map((file) => (
                                <tr key={file.id} className={file.selected ? 'bg-blue-50 border-l-4 border-blue-600' : ''}>
                                    <td className="py-4 px-4">
                                        <input
                                            type="checkbox"
                                            checked={file.selected || false}
                                            onChange={() => handleCheckbox(file.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="py-4 px-4 font-medium text-blue-600 cursor-pointer" onClick={() => handleJobClick(file.id)}>{file.id}</td>
                                    {(file.days || []).map((day, index) => (
                                        <td key={`${file.id}-${index}`} className="py-4 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={day}
                                                onChange={() => handleDayCheckbox(file.id, index)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </td>
                                        ))}


                                    <td className="py-4 px-4 text-gray-500">{file.from}</td>
                                    <td className="py-4 px-4 text-gray-500">{file.to}</td>
                                    <td className="py-4 px-4 text-gray-500">{file.every}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${file.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {file.status}
                                        </span>
                                    </td>

                                    <td className="py-4 px-4" onClick={() => handleJobClick(file.id)}>
                                        <ChevronRight className='size-5' />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between mt-6">
                    <div className="flex items-center bg-blue-50 rounded-2xl px-3 py-1 border border-blue-400">
                        <span className="text-blue-50 font-bold mr-2 bg-blue-600 px-2.5 rounded-full">i</span>
                        <span className="text-gray-600">{files.length}</span>
                    </div>

                    <div className="space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Save
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileManagementUI;

