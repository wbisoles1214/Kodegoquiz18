function showToast() {
  var toast = document.getElementById("toast");
  toast.className = "toast show";
  toast.textContent = "All data is already loaded!.";

  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

async function loadData() {
  const url = "https://api.coingecko.com/api/v3/exchange_rates";
  const response = await fetch(url).then((response) => {
    showToast();
    return response.json();
  });
  const items = response.rates;
  const keys = Object.keys(items);
  const list = document.getElementById("list");
  const searchbar = document.getElementById("searchbar");
  let cache = "";
  let idx = 0;
  const showData = () => {
    if (searchbar.value != "") {
      list.innerHTML = "";
      const searchTerm = searchbar.value.toLowerCase();
      const contents = Array.from(
        new DOMParser().parseFromString(cache, "text/html").body.childNodes
      );
      contents.forEach((content) => {
        const id = content.id;
        const name = content.childNodes[2].childNodes[3].innerHTML.slice(13);
        if (
          id.toLowerCase().includes(searchTerm) ||
          name.toLowerCase().includes(searchTerm)
        ) {
          list.appendChild(content);
        }
      });
      return;
    }
    list.innerHTML = cache;
    while (
      idx < keys.length &&
      window.innerHeight + window.scrollY + 100 > document.body.offsetHeight
    ) {
      const item = items[keys[idx]];
      const container = document.createElement("div");
      container.id = keys[idx];
      container.className = "container";
      container.innerHTML = `<img class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX///8AAADHx8fQ0NC2tratra3Y2Ni+vr7Ly8vU1NS7u7uzs7MfHx+hoaGUlJSGhoZ5eXmKGnusAAAEs0lEQVR4nN3b2XLaQBBGYRQI3rK9/9OmyIltDEKaraf/7nNjX4riK0Ca7sOP50PmXn4cXpdv3ldh2HF5OxxOy9H7Osw6L98vf57SvovH5cQ/p6Qv8cg7eCkn1PPnC8wJ9YMo5YN6vH4HL2WDer59gdmg3hClTFDviFIeqCtEKQvUVaKUA+oDopQB6kOiFB/qBlGKDnWTKMWGukOUIkPdJUpxoRYQpahQi4hSTKiFRCki1GKiFA9qBVGKBrWKKMWCWkmUIkGtJkpxoDYQpShQm4hSDKiNRCkC1GaipA+1gyipQ+0iStpQO4mSMtRuoqQLdQBRUoU6hChpQh1ElBShDiNKelAHEiU1qEOJkhbUwURJCepwoqQD1YAoqUA1IUoaUI2IkgJUM6LkD9WQKHlDNSVKvlCNiZInVHOi5Ad1AlHygjqFKPlAnUSUPKBOI0rzoU4kSrOhTiVKc6FOJkozoU4nSvOgOhClWVBdiNIcqE5EaQZUN6JkD9WRKFlDdSVKtlCdiZIlVHeiZAdVgChZQZUgSjZQRYiSBVQZojQeqhBRGg1ViiiNhSpGlEZClSNK46AKEqVRUCWJ0hiookRpBFRZotQPVZgo9UKVJkp9UMWJUg9UeaLUDjUAUWqFGoIotUENQpRaoIYhSvVQAxGlWqihiFId1GBEqQZqOKJUDjUgUSqFGpIolUENSpRKoIYlSvtQAxOlPaihidI21OBEaQtqeKL0GGoCovQIagqitA41CVFag5qGKN1DTUSUbqGmIkpfoSYjStdQ0xGlT6gJidI71JRECahJidIFalqi9LT8zEuUfi2/vS/BtvPyx30L1bTLp6j3FqppfIoqrEsb9f4p6r8ubdTnF31SqNdf9Cmhfv2iTwj19rdoOqj3v0WTQV37LZoK6vrtUiKoj26X0kB9fLuUBOrWHX0KqNt39Amg7t3Rh4e6/9ApONSSh06hoZY9dAoMtfS5aFio5c9Fg0KteS4aEmrdo/uAUGsf3YeDWv/oPhjUltOlUFDbTpcCQW09XQoDtf0ANAjUngPQEFD7DkADQO09o5eH2n9GLw51xBm9NNQxYyTCUEeNkchCHTdGIgp15KSTJNSxk06CUEdPOslBHT+MJwbVYhhPCqrNMJ4QVKt5URmodvOiIlAt50UloNqONAtAtR5pdodqP9LsDHXG1L0r1DlT945QZ03du0GdtxjiBHXmYogL1LmLIQ5QZ+8uTYc6f3dpMlSP3aWpUH3W6yZC9VqvmwbVb71uElTPDdApUH03QCdA9d4ANYfqv6RsDFVhSdkUqjdRMoTqT5TMoCoQJSOoGkTJBKoKUTKAqkOUhkNVIkqDoWoRpaFQ1YjSQKh6RGkYVEWiNAiqJlEaAlWVKA2AqkuUuqEqE6VOqNpEqQuqOlHqgKpPlJqhRiBKjVBjEKUmqFGIUgPUOESpGmokolQJNRZRqoIajShVQI1HlIqhRiRKhVBjEqUiqFGJUgHUuERpF2pkorQDNTZR2oQanShtQI1PlB5CzUCUHkDNQZRWoWYhSitQ8xClO6iZiNIN1FxE6QvUbETpCmo+ovQBNSNR+g81J1H6B/Ul7Tt46bQ8H5Y376sw7XX5Czk8ECIxM1tbAAAAAElFTkSuQmCC">
              <div class="details">
                  <div class="rate">Rate: ${item.value}</div>
                  <div class="name">Crypto name: ${item.name}</div>
                  <div class="unit">Crypto unit: ${item.unit}</div>
              </div>`;
      list.appendChild(container);
      idx++;
    }
    cache = list.innerHTML;
  };
  showData();
  searchbar.addEventListener("input", showData);
  window.addEventListener("scroll", showData);
}

loadData();
