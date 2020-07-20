export default (message) => {
  document.getElementById("message").innerText = message;
  setTimeout(() => (document.getElementById("message").innerText = ""), 1000);
};
