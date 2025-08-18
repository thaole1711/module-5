
import './App.css'
const Customers=[
    { id: 1,name:"Trí Đông",phone:"0123456789",email:"dong@gmail.com",rank:"Vàng"},
    { id: 2,name:"Vương",phone:"01234565789",email:"vuong@gmail.com",rank:"Bạc"},
    { id: 3,name:"Thảo",phone:"0123456789",email:"thao@gmail.com",rank:"Vàng"},
    { id: 4,name:"Chiến",phone:"0123456789",email:"chien@gmail.com",rank:"Bạc"},
    { id: 5,name:"Hà",phone:"0123456789",email:"ha@gmail.com",rank:"Vàng"},
];
function App() {
  return (
      <>
          <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
              <table className="w-full table-fixed">
                  <thead>
                  <tr className="bg-gray-100">
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Tên</th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">SDT</th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Loại</th>
                  </tr>
                  </thead>
                  {Customers.map((c)=>(
                      <tbody className="bg-white">
                      <tr>
                          <td className="py-4 px-6 border-b border-gray-200">{c.name}</td>
                          <td className="py-4 px-6 border-b border-gray-200 truncate">{c.email}</td>
                          <td className="py-4 px-6 border-b border-gray-200">{c.phone}</td>
                          <td className="py-4 px-6 border-b border-gray-200">
                              <span className={`${c.rank==="Vàng" ? "bg-green-500" : "bg-red-500"} 
                              text-white py-1 px-2 rounded-full text-xs`}>{c.rank}</span>

                          </td>
                      </tr>
                      </tbody>
                  ))}




              </table>
          </div>
      </>
  )
}

export default App
