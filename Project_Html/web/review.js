function interval(page) {
  fetch("/output")
    .then((out) => out.json())
    .then((data) => {
      review(data);
      buttons(data);
    });

  function review(data) {
    console.log(data);

    let rev = `<div class="title-user" style="color: white; padding-top: 100px">
    <p style="font-weight: bold">User Reviews</p>
  </div>`;
    let template = ``;

    var start = (page - 1) * 3;
    var end = start + 3;

    var sliced_data = [];
    sliced_data = data.slice(start, end);

    for (x = 0; x < sliced_data.length; x++) {
      template = `
      <div
      class = "review_exterior"
      >
        <div class="review_back">
          <div class="text_review">
            <h2
            class = "review_name_surname"
            >
              ${sliced_data[x].Name}: ${sliced_data[x].Date}
            </h2>

            <div class = "review_content">
              <div>
                ${sliced_data[x].Review}
              </div>
            </div>
          </div>
        </div>
      </div>`;
      rev = rev + template;
    }
    document.getElementById("review").innerHTML = rev;
  }

  function buttons(data) {
    let forward = page + 1;
    let backwards = page - 1;
    let page_num = Math.ceil(data.length / 3);

    template = ``;

    let start = Math.max(page - 1, 1);
    let end = Math.min(start + 2, page_num);

    if (page_num - page <= 1) {
      start = Math.max(page_num - 2, 1);
      end = page_num;
    }

    if (backwards >= 1) {
      template += `<button class="page-select-arrow-left" onclick="interval(${backwards}); scrollup();"><</button>`;
    } else {
      template += `<button class="page-select-arrow-left" onclick="scrollup();"><</button>`;
    }

    for (x = start; x <= end; x++) {
      template += `<button onclick= "interval(${x}); scrollup();">${x}</p>`;
    }

    if (forward <= page_num) {
      template += `<button class = "page-select-arrow-right" onclick= "interval(${forward}); scrollup();">> </p>`;
    } else {
      template += `<button class = "page-select-arrow-right" onclick = "scrollup();">></p>`;
    }

    document.getElementById("pagination").innerHTML = template;

    const textarea = document.getElementById("review_text_area");

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }
}
interval(1);

function scrollup() {
  var element = document.getElementById("pagination");

  if (element) {
    setTimeout(() => {
      element.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, 100);
  }
}
