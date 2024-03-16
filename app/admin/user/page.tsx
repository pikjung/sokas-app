'use client'

import Content from "../components/Content"
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <main className="flex w-full h-full shadow-lg rounded-3xl">
      <Navbar />
      <Content header="Account" desc="Kelola akun disini!">
        test
      </Content>
    </main>
  )
}
