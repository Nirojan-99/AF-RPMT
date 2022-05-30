function TimeRemains(date, time) {
  const current = new Date();

  const date2 = new Date(`${date} ${time}`);

  const diffTime = Math.abs(current - date2);

  const diffMinutes = Math.ceil(diffTime / (1000 * 60));

  if (date2 > current) {
    
    let val;

    if (diffMinutes / (60 * 24) > 1) {
      val = Math.floor(diffMinutes / (60 * 24));
      return `${val} Days`;
    } else if (diffMinutes / 60 > 1) {
      const minute = diffMinutes - Math.floor(diffMinutes / 60) * 60;
      const hour = Math.floor(diffMinutes / 60);
      return `${hour}:${minute} Hours`;
    } else {
      return `${diffMinutes} Minutes`;
    }
  } else {
    return false;
  }
}

export default TimeRemains;
