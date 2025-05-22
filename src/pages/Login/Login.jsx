

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Login() {
  return (
    <section className="h-screen flex justify-center items-center border border-red-500">
      <Card>
        <CardContent>
          <form className="space-y-4">
            <h2 className="text-xl">Login</h2>
            <p>Ingresa tu correo y password para iniciar sesión.</p>
            <div>
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="example@gmail.com" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" />
            </div>
            <div>
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}