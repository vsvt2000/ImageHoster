package main

import (
   "fmt"
   "log"
   "os"

   "github.com/gofiber/fiber/v2"
   "github.com/gofiber/fiber/v2/middleware/cors"
)

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello World!")
}

func handleLogin(c *fiber.Ctx) error {
	return c.SendString("Login")
}

func handleRegister(c *fiber.Ctx) error {
	return c.SendString("Register")
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