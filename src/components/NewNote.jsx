const Review = () => {
  const styles = {
    button: 'h-8 w-48 mx-auto rounded-md border-2 bg-green-400 border-green-400 h-10 hover:bg-green-500 text-gray-900',
    field: 'text-black outline-none'
  }

  const handleReview = async (e) => {
    if (e.target.text.value === '') {
      alert('Insert the text of the note');
      return
    }
    e.preventDefault()
    await fetch('http://localhost:3001/newNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: e.target.title.value,
        text: e.target.text.value,
        tags: [e.target.tags.value.split(',').map(el => el.trim())],
      })
    })
    e.target.text.value = '';
    e.target.title.value = '';
    e.target.tags.value = '';
  }

  return (
    <div>
      <form onSubmit={handleReview} className='grid grid-rows-5 h-screen'>
        <input type='text' placeholder='Title' name='title' className={styles.field + ' text-xl'} />
        <textarea placeholder='Enter the text of a new note ' className={styles.field + ' row-span-2'} name='text' />
        <input placeholder='tags' name='tags' className={styles.field} />
        <button type='submit' className={styles.button}>Save the note</button>
      </form>
    </div>
  );
}

export default Review;
