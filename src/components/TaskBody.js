"use client";
import React, { useState } from 'react';
import { Search, Settings, FileText, ChevronDown, ChevronRight, ChevronUp, LinkIcon, Clipboard, Pin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdvancedTaskManagementUI = () => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(true);
    const [tasks, setTasks] = useState([
        {
            id: 'POD-3389235697',
            blNumber: '232058679452165',
            shipTo: 'BBY',
            carrier: 'UPS',
            stampType: 'BBY',
            podDate: '02/28/2024',
            signature: 'Mario0000',
            issuedQty: 100,
            receivedQty: 100,
            none: 100,
            dama: 0,
            short: 0,
            overa: 0,
            refus: 0,
            sealI: 0,
            recognitionStatus: 'Invalid',
            reviewStatus: 'Confirmed',
            reviewedBy: 'Alex',
            selected: false
        },
        {
            id: 'POD-2256789012',
            blNumber: '789012345678901',
            shipTo: 'TGT',
            carrier: 'FedEx',
            stampType: 'TGT',
            podDate: '03/01/2024',
            signature: 'Luigi',
            issuedQty: 150,
            receivedQty: 148,
            none: 148,
            dama: 2,
            short: 0,
            overa: 0,
            refus: 0,
            sealI: 0,
            recognitionStatus: 'Valid',
            reviewStatus: 'Pending',
            reviewedBy: '',
            selected: false
        },
        {
            id: 'POD-1123456789',
            blNumber: '345678901234567',
            shipTo: 'WMT',
            carrier: 'DHL',
            stampType: 'WMT',
            podDate: '03/02/2024',
            signature: 'Peach',
            issuedQty: 200,
            receivedQty: 195,
            none: 195,
            dama: 0,
            short: 5,
            overa: 0,
            refus: 0,
            sealI: 0,
            recognitionStatus: 'Valid',
            reviewStatus: 'Denied',
            reviewedBy: 'Bowser',
            selected: false
        },
        {
            id: 'POD-4490123456',
            blNumber: '901234567890123',
            shipTo: 'AMZ',
            carrier: 'USPS',
            stampType: 'AMZ',
            podDate: '03/03/2024',
            signature: 'Toad',
            issuedQty: 75,
            receivedQty: 76,
            none: 75,
            dama: 0,
            short: 0,
            overa: 1,
            refus: 0,
            sealI: 0,
            recognitionStatus: 'Invalid',
            reviewStatus: 'Confirmed',
            reviewedBy: 'Yoshi',
            selected: false
        },
        {
            id: 'POD-5578901234',
            blNumber: '567890123456789',
            shipTo: 'COS',
            carrier: 'OnTrac',
            stampType: 'COS',
            podDate: '03/04/2024',
            signature: 'Daisy',
            issuedQty: 120,
            receivedQty: 120,
            none: 118,
            dama: 1,
            short: 0,
            overa: 0,
            refus: 1,
            sealI: 0,
            recognitionStatus: 'Valid',
            reviewStatus: 'Pending',
            reviewedBy: '',
            selected: false
        }
        // ... (other task objects)
    ]);

    const handleNewTask = () => {
        // ... (implementation as before)
    };

    const handleDelete = () => {
        // ... (implementation as before)
    };

    const handleSend = () => {
        // ... (implementation as before)
    };

    const handleChange = () => {
        // ... (implementation as before)
    };

    const handleCheckbox = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, selected: !task.selected } : task
        ));
    };

    const handleTaskClick = (id) => {
        router.push(`/task/${id}`);
    };

    const toggleFilterExpansion = () => {
        setIsFilterExpanded(!isFilterExpanded);
    };

    return (
        <div className="p-4 max-w-full mx-auto bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
                <div className="mb-4 flex justify-between items-center">
                    <div className="relative">
                        <button
                            className="flex items-center text-2xl font-extrabold text-blue-600"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Standard
                            <ChevronDown className="size-5 ml-1 mt-1 text-blue-600" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute z-10 top-full left-16 mt-1 w-32 bg-white shadow-lg rounded-md py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
                            </div>
                        )}
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                        <LinkIcon className="w-5 h-5 mr-1" />
                    </button>
                </div>

                {isFilterExpanded && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">B/L Number</label>
                                <div className="relative">
                                    <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File ID</label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500">
                                        <option>All</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                                <div className="relative">
                                    <input type="text" className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                    <Clipboard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Recognition Status</label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500">
                                        <option>Select status</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review Status</label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500">
                                        <option>Select status</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Changed On</label>
                                <div className="relative">
                                    <input type="date" defaultValue="2024-02-28" className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ship-to</label>
                                <div className="relative">
                                    <input type="text" defaultValue="3 Items" className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                    <Clipboard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                                <div className="relative">
                                    <input type="text" className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                    <Clipboard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Created On</label>
                                <div className="flex items-center">
                                    <input type="date" defaultValue="2024-02-28" className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="space-x-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Go</button>
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">Adapt Filters (5)</button>
                            </div>
                        </div>
                    </>
                )}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
                    <button
                        onClick={toggleFilterExpansion}
                        className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors transform translate-y-1/2 shadow-md"
                    >
                        {isFilterExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors transform translate-y-1/2 shadow-md">
                        <Pin className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className='mt-1 px-0 pt-8 max-w-full mx-auto rounded-lg bg-white/10 min-h-screen'>
                <div className='bg-white p-4'>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 ">
                        <h1 className="text-xl font-semibold">File IDs ({tasks.length})</h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative z-1">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            </div>
                            <button onClick={handleSend} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Send
                            </button>
                            <button onClick={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Change
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Delete
                            </button>
                            <button onClick={handleNewTask} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                History
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
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead>
                                <tr>
                                    <th className="w-12 py-3 px-4"></th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File ID</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">B/L Number</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ship-to</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stamp Type</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POD Date</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signature</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Qty</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received Qty</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">None</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dama</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overa</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refus</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seal I</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recognition Status</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Status</th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewed By</th>
                                    <th className="w-12 py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                {tasks.map((task) => (
                                    <tr key={task.id} className={task.selected ? 'bg-blue-50 border-l-4 border-blue-600' : ''}>
                                        <td className="py-4 px-4">
                                            <input
                                                type="checkbox"
                                                checked={task.selected || false}
                                                onChange={() => handleCheckbox(task.id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-4 font-medium text-blue-600 cursor-pointer" onClick={() => handleTaskClick(task.id)}>{task.id}</td>
                                        <td className="py-4 px-4">{task.blNumber}</td>
                                        <td className="py-4 px-4">{task.shipTo}</td>
                                        <td className="py-4 px-4">{task.carrier}</td>
                                        <td className="py-4 px-4">{task.stampType}</td>
                                        <td className="py-4 px-4">{task.podDate}</td>
                                        <td className="py-4 px-4">{task.signature}</td>
                                        <td className="py-4 px-4">{task.issuedQty}</td>
                                        <td className="py-4 px-4">{task.receivedQty}</td>
                                        <td className="py-4 px-4">{task.none}</td>
                                        <td className="py-4 px-4">{task.dama}</td>
                                        <td className="py-4 px-4">{task.short}</td>
                                        <td className="py-4 px-4">{task.overa}</td>
                                        <td className="py-4 px-4">{task.refus}</td>
                                        <td className="py-4 px-4">{task.sealI}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${task.recognitionStatus === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {task.recognitionStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${task.reviewStatus === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                                task.reviewStatus === 'Denied' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {task.reviewStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">{task.reviewedBy}</td>
                                        <td className="py-4 px-4">
                                            <ChevronRight className="w-5 h-5 cursor-pointer" onClick={() => handleTaskClick(task.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between mt-6">
                        <div className="flex items-center bg-blue-50 rounded-2xl px-3 py-1 border border-blue-400">
                            <span className="text-blue-50 font-bold mr-2 bg-blue-600 px-2.5 rounded-full">i</span>
                            <span className="text-gray-600">{tasks.length} records matching the criteria have been found.</span>
                        </div>

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedTaskManagementUI;