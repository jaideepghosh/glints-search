export default function Schedule() {
    return (
        <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/3 px-4 py-2">Day</th>
            <th className="w-1/5 px-4 py-2">Opening Hour</th>
            <th className="w-1/5 px-4 py-2">Closing Hour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Monday</td>
            <td className="border px-4 py-2">09:00 am</td>
            <td className="border px-4 py-2">11:00 pm</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2">Tuesday</td>
            <td className="border px-4 py-2">09:00 am</td>
            <td className="border px-4 py-2">11:00 pm</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Wednesday</td>
            <td className="border px-4 py-2">09:00 am</td>
            <td className="border px-4 py-2">11:00 pm</td>
          </tr>
        </tbody>
      </table>     
    );
}