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

var db *sql.DB

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello World!")
}

func handleLogin(c *fiber.Ctx) error {
   req:=struct {
      Username string `json:"username"`
      Password string `json:"password"`
   }{}

   if err:=c.BodyParser(&req); err!=nil{
      return err
   }

   validatestmt:=fmt.Sprintf(`select * from "UserDetails"."Users" where "username"='%s' and "password"='%s'`,req.Username,req.Password)

   rows,e:=db.Query(validatestmt)
   Checkerror(e)
   var i int
   for rows.Next() {
      i=i+1
   }
   if(i==0) {
      return c.SendString("Login Failed")
   }
	return c.SendString("Login Successful")
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

 insertstmt:=fmt.Sprintf(`insert into "UserDetails"."Users" ("name", "username","password") values('%s', '%s','%s')`,req.Name,req.Username,req.Password)
 //panic(insertstmt)
 fmt.Print()
 _,e:=db.Exec(insertstmt)
 Checkerror(e)

  return c.SendString("Data entered")
}

func handleImg(c *fiber.Ctx) error {
   req:=struct{
      Query string `json:"query"`
   }{}
   if err := c.BodyParser(&req); err != nil {
      return err
   }
   
   querystmt:=fmt.Sprintf(`select "image" from "UserDetails"."Images" where "key"='%s'`,req.Query)

   result,e:=db.Query(querystmt)
   Checkerror(e)
   var temp []byte
   for result.Next() {
      result.Scan(&temp)
   }
   fmt.Println(*result)
	return c.Send(temp)
}

func uploadImg(c *fiber.Ctx) error {
   req:=struct {
      Username string `json:"username"`
      Key string `json:"key"`
      Image []byte `json:"image"`
   }{}
   if err := c.BodyParser(&req); err != nil {
      return err
   }

   insertstmt:=fmt.Sprintf(`insert into "UserDetails"."Images"("username","key","image") values ('%s','%s','%s')`,req.Username,req.Key,req.Image)
   _,e:=db.Exec(insertstmt)
   Checkerror(e)
   return c.SendString("Image Upload Successful")
}

func main() {
   app := fiber.New()

   app.Use(cors.New())
   
   //Entering DB credentials
   const (
     host     = "localhost"
     sqlport     = 5432
     user     = "postgres"
     password = "1234"
     dbname   = "ImageHoster"
   )

   psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, sqlport, user, password, dbname)
   dbobj, err := sql.Open("postgres", psqlconn)
   db=dbobj
   Checkerror(err)
   defer db.Close()

   app.Get("/",helloWorld)
   app.Post("/login",handleLogin)
   app.Post("/register",handleRegister)
   app.Post("/upload",uploadImg)
   app.Post("/img",handleImg)

   port := os.Getenv("PORT")
   if port == "" {
       port = "5000"
   }

   log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}