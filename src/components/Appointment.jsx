import { Reply, Trash2 } from "lucide-react";

const Appointment = () => {
  const columns = ["Name", "Email", "Phone", "Massage", "Action"];

  const data = [
    {
      name: "Hussain",
      massage: "Sample your website is fast",
      email: "hussain@gmail.com",
      phone: 9898983434,
    },
    {
      name: "Ram",
      massage: "Hello I want to make website",
      email: "ram@gmail.com",
      phone: 9898983434,
    },
  ];
  return (
    <>
      <form className="w-full card-container max-w-[1550px] mx-auto min-h-screen bg-white rounded-xl border border-gray-200 shadow-md mb-8 px-1 py-6 md:p-6">
        <div className="overflow-x-auto mt-5 px-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="py-2 px-4 text-center">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-2 px-4 text-center">{item.name}</td>
                  <td className="py-2 px-4 text-center">{item.email}</td>
                  <td className="py-2 px-4 text-center">{item.phone}</td>
                  <td className="py-2 px-4 text-center">{item.massage}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <div>
                        <button className="text-blue-600 flex flex-col items-center hover:underline cursor-pointer">
                          <Reply size={18} />
                        </button>
                      </div>
                      |
                      <div>
                        <button className="text-red-600 flex flex-col items-center hover:underline cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default Appointment;
