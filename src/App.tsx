import React, { useEffect, useState } from 'react';
import './index.css';

interface Employee {
  name: string,
  grade: string,
}

const employees: Employee[] = [
  { name: 'Yvette King', grade: 'FNP' },
  { name: 'Jullet Buchanan', grade: 'CNM' },
  { name: 'Olivia Williams-Coombs', grade: 'CNM' },
  { name: 'Latoya Chevannes', grade: 'CN' },
  { name: 'Grace Levy-Baldwin', grade: 'CN' },
];

const App = () => {
  const [schedule, setSchedule] = useState<any>(null)

  useEffect(() => {
    let grid: any = [];

    for (const _ of employees) grid.push([])

    for (let row = 0; row < employees.length; row++) {
      for (let col = 0; col < 7; col++) {
        grid[row].push('D')
      }  
    }

    setSchedule(grid)
  }, [employees])

  const generateSchedule = () => {

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
                <td key={columnIndex}>{schedule[rowIndex][columnIndex]}</td>
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
