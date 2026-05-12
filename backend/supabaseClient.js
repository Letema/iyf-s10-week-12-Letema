import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('notes').select('*')
      if (error) console.log('Error:', error)
      else setData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {data.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  )
}