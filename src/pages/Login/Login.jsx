import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import logo from "../../assets/img/logo_sta.png";
import { FaUser , FaLock, FaUserGraduate } from "react-icons/fa"; // Asegúrate de instalar react-icons

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(login(values.email, values.password));

    if (!response.success) {
      toast.error(response.error.message);
      return;
    }

    toast.success("Bievenido!");
    navigate("/products");
  };

  return (
      <section className="bg-[url(/src/assets/img/bg_major.jpg)] h-screen bg-cover 
                          flex justify-center items-center">
      <Card className="bg-white/50 backdrop-invert backdrop-opacity-20">
        <CardContent className="flex flex-row items-center">
          <div >
            <img src={logo} alt="Logo" className="w-80" />
          </div>
          <form 
            onSubmit={handleSubmit}
            className="space-y-3 p-6 bg-white/60 rounded-lg shadow-md">
            <div className=" flex flex-col items-center">
              <FaUserGraduate className="text-green-900 scale-200 mb-4" />
              <h2 className="text-l font-medium text-gray-500 text-center">Accede a tu cuenta</h2> 
            </div>
            <div className="flex items-center border-b border-gray-300">              
              <FaUser  className="text-gray-500 mr-2" />
              <label 
                htmlFor="email" 
                className="sr-only">
                  Usuario
              </label>
              <Input id="email" 
                     type="email" 
                     name="email"
                     placeholder="email" 
                     onChange={handleInputChange} />
            </div>
            <div className="flex items-center border-b border-gray-300">
              <FaLock className="text-gray-500 mr-2" />
              <label 
                htmlFor="password" 
                className="sr-only">
                  Password
              </label>
              <Input 
              id="password" 
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Password"  
               />
            </div>
            <div>
              <Button 
              className="bg-green-800 w-full hover:bg-green-700 transition duration-200"
              type="submit"
              >Ingresar</Button>
            </div>  
            <div className="text-center space-y-2">
              <p className="text-green-800 text-sm font-bold hover:underline" onClick={() => alert('Recuperar contraseña')}>¿Olvidaste tu contraseña?</p>
              <p className="text-xs text-center text-gray-500">Plataforma de Gestión Educativa</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
      );
}
