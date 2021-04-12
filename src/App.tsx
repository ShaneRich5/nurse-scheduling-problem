import React, { useEffect, useState } from 'react';
import './index.css';

interface Employee {
  name: string,
  grade: string,
}

const availableGrades = ['FNP', 'CNM', 'CN', 'CEN', 'RGN']

const employees: Employee[] = [];

for (let i = 0; i < 10; i++) {
  const name = `Nurse ${i + 1}`
  const grade = availableGrades[Math.floor(Math.random() * availableGrades.length)];
  employees.push({ name, grade })
}

const initializeGrid = () => {
  let grid: any = [];

  for (let col = 0; col < employees.length; col++) {
    grid.push(['', '', '', '', '', '', ''])
  }

  return grid;
}


const App = () => {
  const [schedule, setSchedule] = useState<any>(null)

  useEffect(() => {
    let grid = initializeGrid()
    setSchedule(grid)
  }, [employees, initializeGrid])

  const generateSchedule = () => {
    let grid = initializeGrid()
    
    grid = grid.sort(() => Math.random() - 0.5)

    // useful to track, helps when manual 'days-off' are set
    // not correnb
    const daysOffCount = [0, 0, 0, 0, 0, 0, 0]
    const morningShiftCount = [0, 0, 0, 0, 0, 0, 0]
    const nightShiftCount = [0, 0, 0, 0, 0, 0, 0]

    let startingDayOff = 0

    for (let i = 0; i < employees.length; i++) {
      grid[i][startingDayOff] = 'D'
      daysOffCount[startingDayOff] += 1

      if (startingDayOff >= 6) {
        startingDayOff = 0
      } else {
        startingDayOff++
      }
    }

    grid = grid.sort(() => Math.random() - 0.5)

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const daysOff = daysOffCount[dayOfWeek]
      const workingEmployeeCount = employees.length - daysOff

      const morningShift = Math.floor(workingEmployeeCount / 2)
      const nightShift = workingEmployeeCount - morningShift

      let shifts = []

      for (let i = 0; i < morningShift; i++) shifts.push('AM')
      for (let i = 0; i < nightShift; i++) shifts.push('PM')

      shifts = shifts.sort(() => Math.random() - 0.5)

      let index = 0;

      while (shifts.length > 0 && index < employees.length) {
        const currentEmployeeShift = grid[index][dayOfWeek]

        if (currentEmployeeShift !== 'D') {
          grid[index][dayOfWeek] = shifts.pop()
        }

        index++
      }
    }

    console.log('generated:', grid, 'daysOffCount:', daysOffCount)

    setSchedule(grid)
  }

  return (
  <div>
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employees</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                {/* <!-- Heroicon name: outline/bell --> */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* <!-- Mobile menu button --> */}
            <button type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {/* <!--
                Heroicon name: outline/menu

                Menu open: "hidden", Menu closed: "block"
              --> */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* <!--
                Heroicon name: outline/x

                Menu open: "block", Menu closed: "hidden"
              --> */}
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Employees</a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">Demo App</div>
            </div>
            <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        
<div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monday
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tuesday
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wednesday
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thursday
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Friday
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saturday
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sunday
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt=""/>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Jane Cooper
                    </div>
                    <div className="text-sm text-gray-500">
                      jane.cooper@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
                <div className="text-sm text-gray-500">Optimization</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        {/* <!-- Replace with your content --> */}
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
        </div>
        {/* <!-- /End replace --> */}
        {schedule ?
        
      <table className='border-collapse border border-green-800'>
        <thead>
          <tr>
            <th className='border border-green-600'>Name</th>
            <th className='border border-green-600'>Grade</th>
            <th className='border border-green-600'>Monday</th>
            <th className='border border-green-600'>Tuesday</th>
            <th className='border border-green-600'>Wednesday</th>
            <th className='border border-green-600'>Thursday</th>
            <th className='border border-green-600'>Friday</th>
            <th className='border border-green-600'>Saturday</th>
            <th className='border border-green-600'>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: Employee, rowIndex: number) =>
            <tr key={rowIndex}>
              <td className='border border-green-600'>{employee.name}</td>
              <td className='border border-green-600'>{employee.grade}</td>
              {[0, 1, 2, 3, 4, 5, 6].map((columnIndex: number) => 
                <>
                  <td
                    key={rowIndex + '_' + columnIndex}
                    className='border border-green-600'
                  >{schedule[rowIndex][columnIndex]}</td>
                </>
              )}
            </tr>
          )}
        </tbody>
      </table>
      : <>Loading..</>}
      <button
        className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
        onClick={() => generateSchedule()}
      >Go</button>
      </div>
    </main>
  </div>
    
  )
}

export default App;

// <>
    //   {schedule ?
    //   <table className='border-collapse border border-green-800'>
    //     <thead>
    //       <tr>
    //         <th className='border border-green-600'>Name</th>
    //         <th className='border border-green-600'>Grade</th>
    //         <th className='border border-green-600'>Monday</th>
    //         <th className='border border-green-600'>Tuesday</th>
    //         <th className='border border-green-600'>Wednesday</th>
    //         <th className='border border-green-600'>Thursday</th>
    //         <th className='border border-green-600'>Friday</th>
    //         <th className='border border-green-600'>Saturday</th>
    //         <th className='border border-green-600'>Sunday</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {employees.map((employee: Employee, rowIndex: number) =>
    //         <tr key={rowIndex}>
    //           <td className='border border-green-600'>{employee.name}</td>
    //           <td className='border border-green-600'>{employee.grade}</td>
    //           {[0, 1, 2, 3, 4, 5, 6].map((columnIndex: number) => 
    //             <>
    //               <td
    //                 key={rowIndex + '_' + columnIndex}
    //                 className='border border-green-600'
    //               >{schedule[rowIndex][columnIndex]}</td>
    //             </>
    //           )}
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    //   : <>Loading..</>}
    //   <button
    //     className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
    //     onClick={() => generateSchedule()}
    //   >Go</button>
    // </>