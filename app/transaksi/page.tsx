import Container from "../components/Container"
import HeaderPage from "../components/HeaderPage"
import Card from "../components/Card"

const Home = () => {

  async function handleFilter(value: any) {
    'use server'
    console.log(value)
  }

  return (
    <Container flex={false} wrap={false} >
      <HeaderPage title="Transaksi" filter={true} handleFilter={handleFilter}>
        Keseluruhan transaksi anda
      </HeaderPage>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">
        <Card header="Transaksi Selesai">
          <ul className="divide-y divide-slate-200">
            <li className="flex py-4 first:pt-0 last:pb-0">
              <p className="text-blue-500 flex-1">PHILIPS</p>
              <div className="ml-3 overflow-hidden flex-1">
                <p className="text-sm font-medium text-slate-900">KAS-PHILIPS-SO-00000001</p>
                <p className="text-sm text-slate-500 truncate">Order date: 18-02-2024</p>
              </div>
              <span className="flex-none rounded-lg py-2 px-4 text-sm bg-green-200 text-green-700">
                Success
              </span>
            </li>
            <li className="flex py-4 first:pt-0 last:pb-0">
              <p className="text-blue-700 flex-1">PANASONIC</p>
              <div className="ml-3 overflow-hidden flex-1">
                <p className="text-sm font-medium text-slate-900">KAS-PAN-SO-00000001</p>
                <p className="text-sm text-slate-500 truncate">Order date: 18-02-2024</p>
              </div>
              <span className="flex-none rounded-lg py-2 px-4 text-sm bg-green-200 text-green-700">
                Success
              </span>
            </li>
            <li className="flex py-4 first:pt-0 last:pb-0">
              <p className="text-green-500 flex-1">SCHNEIDER</p>
              <div className="ml-3 overflow-hidden flex-1">
                <p className="text-sm font-medium text-slate-900">KAS-SCH-SO-00000001</p>
                <p className="text-sm text-slate-500 truncate">Order date: 18-02-2024</p>
              </div>
              <span className="flex-none rounded-lg py-2 px-4 text-sm bg-green-200 text-green-700">
                Success
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </Container>
  )
}

export default Home