import { Carousel } from "@/components/layout/Carousel";
import slide1 from "@/assets/img/bg1.jpg"
import slide2 from "@/assets/img/bg2.jpg"
import slide3 from "@/assets/img/bg3.jpg"
import slide4 from "@/assets/img/bg4.jpg"
import slide5 from "@/assets/img/bg5.jpg"
import { useNavigate } from "react-router";

const slides = [
    { id: 1,
      image: slide1,
      title: "Bienvenido",
      description: "Explora nuestra plataforma educativa",
    },
    { id: 2,
      image: slide2,
      title: "Aprende sin límites",
      description: "Recursos 24/7 desde cualquier lugar",
    },
    { id: 3,
      image: slide3,
      title: "Tu futuro comienza aquí",
      description: "Conéctate con el conocimiento",
    },
    { id: 4,
      image: slide4,
      title: "Conectados y empoderados",
      description: "Conectamos educación con tecnología",
    },
    { id: 5,
      image: slide5,
      title: "Educación del futuro",
      description: "Descubre nuevas formas de aprender",
    },
]

export function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Button clicked, navigating to /login");
    navigate("/login");
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      <Carousel autoSlide autoSlideInterval={4000}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative z-0 w-full h-full flex-shrink-0 border border-red-500"
          >
            {/* Imagen de fondo oculta en pantallas muy pequeñas */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute w-full h-full object-cover hidden min-[500px]:block"
            />

            {/* Capa de contenido centrado */}
            <div className="w-screen h-screen relative z-10 flex flex-col items-center justify-center 
                           text-white px-6 text-center ">
              <h1 className="text-3xl md:text-5xl font-bold drop-shadow">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg md:text-2xl drop-shadow">
                {slide.description}
              </p>
              <button
                onClick={handleClick}
                className="cursor-pointer relative z-50 mt-6 px-6 py-2 bg-green-800 hover:bg-green-900 
                text-white font-semibold rounded-full shadow"
              >
                Saber más
              </button>
            </div>
            {/* Capa oscura para contraste */}
            <div className="absolute inset-0 bg-black/55 z-0 hidden min-[500px]:block" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

