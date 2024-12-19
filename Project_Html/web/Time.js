function time_date() {
  const today = new Date();

  const yy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const hh = String(today.getHours()).padStart(2, "0");
  const min = String(today.getMinutes()).padStart(2, "0");
  const sec = String(today.getSeconds()).padStart(2, "0");

  let Time = `${yy}-${mm}-${dd} ${hh}:${min}:${sec}`;
  document.getElementById("dates").value = Time;
}

setInterval(time_date, 1000);
