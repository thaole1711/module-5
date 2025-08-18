
import './App.css'
const Students = [
  {
    id:1,
    company: 'Alfreds Futterkiste',
    contact: 'Maria Anders',
    country: 'Germany'
  },
  {
    id:2,
    company: 'Centro comercial Moctezuma',
    contact: 'Francisco Chang',
    country: 'Mexico'
  },
  {
    id:3,
    company: 'Ernst Handel',
    contact: 'Roland Mendel',
    country: 'Austria'
  },
  {
    id:4,
    company: 'Island Trading',
    contact: 'Helen Bennett',
    country: 'UK'
  },
  {
    id:5,
    company: 'Laughing Bacchus Winecellars',
    contact: 'Yoshi Tannamuri',
    country: 'Canada'
  },
  {
    id:6,
    company: 'Magazzini Alimentari Riuniti',
    contact: 'Giovanni Rovelli',
    country: 'Italy'
  }
]
function App() {


  return (
    <>

<table>
  <thead>
  <tr>
    <th>No</th>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  </thead>
  <tbody>
  {Students.map((student,index)=>(
      <tr key={student.id}>
        <td>{index+1}</td>
        <td>{student.company}</td>
        <td>{student.contact}</td>
        <td>{student.country}</td>
      </tr>
  ))}
  </tbody>
</table>
    </>
  )
}

export default App
