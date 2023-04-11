document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    document.querySelectorAll("script").forEach(elt => {
      console.log("Add nonce before interactive", elt);
      elt.setAttribute("nonce", elt.getAttribute("nonce") || document.querySelector("head").getAttribute("nonce"));
    });
  }
};
