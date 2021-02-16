import { useState, useEffect } from 'react'
import Note from '../components/Note'
const AllTags = () => {
  const styles = {

  }
  const [notes, setNotes] = useState([])

  useEffect(() => {
    (async () => {
      const req = await fetch('http://localhost:3001/notes')
      const res = await req.json()
      setNotes(res)
      console.log(notes)
    })()
  }, [])

  return (
    <main className='m-4 text-black'>
      <div className={styles.card}>
        {notes.map((el, index) => (<Note {...el} key={index} />))}
      </div>

    </main>);
}

export default AllTags;

