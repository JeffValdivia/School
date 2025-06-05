
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import {
  Users, BookOpen, FileText, DollarSign, Settings, Library, ClipboardList, Award,
  Clock, Building, Calculator, BarChartIcon as ChartBar, User, LogOut, ChevronDown,
  MoreHorizontal, School,
} from "lucide-react"
import { logoutUser } from "@/redux/authSlice"
import { toast } from "sonner"

// 📋 CONFIGURACIÓN DE MENÚ - Estructura de datos para todas las secciones
const menuSections = [
  {
    id: "register",
    title: "Registro",
    icon: Users,
    subItems: [
      {
        title: "Registro de Personal",
        icon: Users,
        path: "/personal/register",
      },
      {
        title: "Registro de Areas",
        icon: Award,
        path: "/students/grades",
      },
    ],
  },
  {
    id: "teachers",
    title: "Profesores",
    icon: Users,
    subItems: [
      {
        title: "Gestión de Docentes",
        icon: Users,
        path: "/teachers/management",
      },
      {
        title: "Horarios",
        icon: Clock,
        path: "/teachers/schedules",
      },
    ],
  },
  {
    id: "courses",
    title: "Cursos",
    icon: BookOpen,
    subItems: [
      {
        title: "Registrar Cursos",
        icon: BookOpen,
        path: "/courses/register-course",
      },
      {
        title: "Lista de Cursos",
        icon: Building,
        path: "/courses/list-course",
      },
    ],
  },
  {
    id: "admin",
    title: "Administración",
    icon: Calculator,
    subItems: [
      {
        title: "Finanzas y Pagos",
        icon: DollarSign,
        path: "/admin/finances",
      },
      {
        title: "Reportes",
        icon: ChartBar,
        path: "/admin/reports",
      },
    ],
  },
]

function SidebarContentBody({ onItemClick }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 🔐 Obtener datos del usuario autenticado desde Redux store
  const user = useSelector((state) => state.auth.user)

  // 🎯 ESTADO PARA CONTROL DE ACORDEÓN - Solo una sección abierta a la vez
  // Inicializa con "students" como sección por defecto abierta
  const [openSection, setOpenSection] = useState("students")

  const handleLogout = async () => {
    const response = dispatch(logoutUser())

    if (!response.success) {
      toast.error(response.error.message)
      return
    }

    navigate("/login")
    onItemClick?.()
  }

  // FUNCIÓN PARA MANEJAR EL COMPORTAMIENTO DE ACORDEÓN
  // Si la sección ya está abierta, la cierra. Si no, abre la nueva y cierra las demás
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section)
  }

  // 🎨 FUNCIÓN PARA RENDERIZAR CADA SECCIÓN DEL MENÚ
  const renderMenuSection = (section) => {
    const IconComponent = section.icon

    return (
      <Collapsible
        key={section.id}
        open={openSection === section.id}
        onOpenChange={() => toggleSection(section.id)}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <IconComponent className="size-4" />
              <span>{section.title}</span>
              {/* 🔄 Chevron que rota según el estado abierto/cerrado */}
              <ChevronDown className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="transition-all duration-1000">
            <SidebarMenuSub>
              {/* 📝 Renderizar subitems dinámicamente */}
              {section.subItems.map((subItem, index) => {
                const SubIconComponent = subItem.icon
                return (
                  <SidebarMenuSubItem key={index}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        to={subItem.path}
                        onClick={onItemClick}
                        className="text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
                      >
                        <SubIconComponent className="size-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    // 🎨 CONTENEDOR PRINCIPAL CON DEGRADADO VERDE Y LAYOUT FLEX
    // flex-col para distribución vertical, h-full para ocupar toda la altura
    <div className="bg-gradient-to-b from-green-600 via-green-700 to-green-800 h-full flex flex-col">
      {/* 📱 HEADER DEL SIDEBAR - Branding del colegio */}
      <SidebarHeader className="flex flex-row items-center text-center mt-5">
                  {/* 🏫 Icono del colegio con fondo translúcido */}
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                    <School className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold text-xs text-white">I.E. Santo Tomas de Aquino</span>
                    <span className="text-xs opacity-80 text-white">Sistema Académico</span>
                  </div>
      </SidebarHeader>

      {/* 📚 CONTENIDO PRINCIPAL DEL SIDEBAR - flex-1 para ocupar espacio disponible */}
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 font-medium">Gestión Académica</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 🔄 RENDERIZAR TODAS LAS SECCIONES DINÁMICAMENTE */}
              {menuSections.map(renderMenuSection)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 👤 FOOTER CON INFORMACIÓN DEL USUARIO - Siempre visible en la parte inferior */}
      {/* mt-auto empuja el footer al bottom, border-t crea separación visual */}
      <SidebarFooter className="mt-auto border-t border-white/10 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* 🎨 Botón del usuario con diseño mejorado y animaciones */}
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-white/20 data-[state=open]:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 text-white p-3"
                >
                  {/* 🖼️ Avatar más grande con borde translúcido */}
                  <Avatar className="h-10 w-10 rounded-lg border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuario" />
                    <AvatarFallback className="rounded-lg bg-white/20 text-white text-lg">
                      {/* 🔤 Inicial del nombre del usuario o 'U' por defecto */}
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {/* 👤 Nombre del usuario desde Redux store */}
                    <span className="truncate font-semibold text-base">{user?.name || "Usuario"}</span>
                    {/* 📧 Email real del usuario logueado */}
                    <span className="truncate text-sm opacity-80">{user?.email || "admin@colegio.edu"}</span>
                  </div>
                  <MoreHorizontal className="ml-auto size-5" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {/* 📋 Dropdown que se abre hacia arriba (side="top") */}
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top" // 🔝 Se abre hacia arriba porque está en el footer
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    onClick={onItemClick}
                    className="hover:bg-green-50 transition-colors duration-200"
                  >
                    <User className="size-4" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 transition-colors duration-200">
                  <LogOut className="size-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  )
}

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="border-r">
        <SidebarContentBody />
      </Sidebar>
    </SidebarProvider>
  )
}
