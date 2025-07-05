console.log("Start");
throw new Error("This is an error!");
console.log("End"); // จะไม่ทำงาน เพราะ Error ดักไว้แล้ว
app.use(express.json());
app.use(express.urlencoded({ extended: true }));