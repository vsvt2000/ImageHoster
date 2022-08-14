package main

import (
   "database/sql"
   "fmt"
   "log"
   "os"
   _ "github.com/lib/pq"
   "github.com/gofiber/fiber/v2"
   "github.com/gofiber/fiber/v2/middleware/cors"
)

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello World!")
}

func handleLogin(c *fiber.Ctx) error {
	return c.SendString("Login")
}
func Checkerror(err error) {
   if err != nil {
       panic(err)
   }
}
func handleRegister(c *fiber.Ctx) error {
   
   //Creating a structure that resembles the request body that arrives into this function
	req := struct {
      Name string `json:"name"`
      Username string `json:"username"`
      Password string `json:"password"`
   }{}
   //if condition serves to send error message in case the object sent doesnt match struct
   //else the data is mapped with this struct and can be used for further ops
   if err := c.BodyParser(&req); err != nil {
      return err
  }
  //if the req object has passed till this point, it means the data is ready to be used
  //Entering DB credentials
  const (
   host     = "localhost"
   port     = 5432
   user     = "postgres"
   password = "1234"
   dbname   = "ImageHoster"
 )

 psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
 db, err := sql.Open("postgres", psqlconn)
 Checkerror(err)
 defer db.Close()

 insertstmt:=fmt.Sprintf(`insert into "UserDetails"."Users" ("name", "username","password") values('%s', '%s','%s')`,req.Name,req.Username,req.Password)
 //panic(insertstmt)
 fmt.Print()
 _,e:=db.Exec(insertstmt)
 Checkerror(e)

  return c.SendString("Data entered")
}

func handleImg(c *fiber.Ctx) error {
	return c.SendString("Img")
}

func main() {
   app := fiber.New()

   app.Use(cors.New())
   
   app.Get("/",helloWorld)
   app.Post("/login",handleLogin)
   app.Post("/register",handleRegister)
   app.Get("/img",handleImg)

   port := os.Getenv("PORT")
   if port == "" {
       port = "5000"
   }

   log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}