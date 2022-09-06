fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

try {
  const url = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
} catch {}

setTimeout(() => {
  console.log(2);
}, 3000);
console.log(3);
