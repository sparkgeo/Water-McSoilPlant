console.clear();
const key = "6c6b5e9309d621e642ddc1c3f9518685";
const ll = [43.24989, -79.81289];
const greyRBG = "34,34,34";
const url = `https://api.openweathermap.org/data/2.5/onecall`;
let grads = [];
function getDate(timestamp) {
  timestamp = timestamp * 1000;
  const d = new Date(timestamp);
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${dayOfWeek[d.getDay()]} ${d.getHours()}:00`;
}
$(document).ready(function () {
  $.get(
    url,
    {
      lat: ll[0],
      lon: ll[1],
      appid: key,
      units: "metric",
      exclude: "minutely,daily",
    },
    function (d) {
      $(".cloud-wrapper").html(Mustache.render($("template").html(), d));
      $.each(d.hourly, function (key, value) {
        grads.push(`rgba(${greyRBG}, ${value.clouds / 100})`);
      });
    }
  ).done(function () {
    $(".cloud-wrapper").attr(
      "style",
      `background: linear-gradient(90deg, ${grads.join(",")});`
    );
    $(".time").each(function () {
      $(this).html(getDate($(this).html()));
    });
  });
});
