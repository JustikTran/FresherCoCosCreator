import readline from "readline";

export function input(message) {
  const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((res) => {
    io.question(message, (value) => {
      res(value);
      io.close();
    });
  });
}
