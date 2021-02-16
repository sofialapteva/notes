const Note = (props) => {
  const styles = {
    button: 'text-sm bg-green-400 rounded-full px-1 mx-1 hover:bg-green-500 focus:outline-none'
  }
  function msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return 'Created ' + hours + ":" + minutes + ":" + seconds + ' ago';
  }
  const dateOfCreation = new Date(Date.parse(props.date) + new Date().getTimezoneOffset() * 3600).toLocaleString() || 'none'
  const since = new Date().getTime() - props.timeMark
  const sinceTime = msToTime(since)

  return (<div className='my-10 border-2 border-gray-200 p-5 hover:bg-gray-100'>
    <strong>{props.title}</strong> <i>{dateOfCreation}</i> <i> {sinceTime}</i>
    <button onClick={async () => { await fetch(`http://localhost:3001/delete/${props.id}`); document.location.reload(); }} className={styles.button}>Delete</button>
    <button className={styles.button}>Edit</button>
    <hr />
    <p>{props.text}</p>
    <small>{props.tags[0].map(el => (<a href={`/tags/${el}`} className='pr-2'>{el}</a>))}</small>
  </div>);
}

export default Note;
