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
    <>
      {schedule ?
      <table>
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
        {employees.map((employee: Employee, rowIndex: number) =>
          <tr key={rowIndex}>
            <td>{employee.name}</td>
            <td>{employee.grade}</td>
            {[0, 1, 2, 3, 4, 5, 6].map((columnIndex: number) => 
              <>
                <td key={rowIndex + '_' + columnIndex}>{schedule[rowIndex][columnIndex]}</td>
              </>
            )}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </table>
      : <>Loading..</>}
      <button onClick={() => generateSchedule()}>Go</button>
    </>
  )
}

export default App;
