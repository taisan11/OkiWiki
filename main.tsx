import { Hono } from 'hono'
import {jsxRenderer} from "hono/jsx-renderer"
import type {MiddlewareHandler} from "hono"

const app = new Hono()

//Plugin Type
type Plugin = () => {HonoMiddleware: MiddlewareHandler}

app.use(jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <title>Hono</title>
        <meta />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/login",(c)=>{
  return c.render(<>
    <form action="/login" method="post">
      <input type="text" name="uname" id="uname" />
      <input type="password" name="password" id="password" />
      <button type="submit">Login</button>
    </form>
  </>)
})

Deno.serve(app.fetch)
