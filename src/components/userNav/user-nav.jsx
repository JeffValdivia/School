import { Bell, LogOut } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

const notifications = [
  {
    id: 1,
    title: "Nueva actualización disponible",
    description: "Versión 2.1.0 está lista para instalar",
    time: "hace 5 min",
    unread: true,
  },
  {
    id: 2,
    title: "Backup completado",
    description: "El backup automático se ejecutó correctamente",
    time: "hace 1 hora",
    unread: true,
  },
  {
    id: 3,
    title: "Nuevo comentario",
    description: "Juan comentó en tu proyecto",
    time: "hace 2 horas",
    unread: false,
  },
]

export function UserNav() {
  const userName = "María García"
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    console.log("Usuario desconectado")
  }

  return (
    <div className="flex items-center gap-4">
      {/* Welcome message */}
      <div className="hidden md:block">
        <span className="text-sm text-muted-foreground">
          Bienvenid@ <span className="font-medium text-foreground">{userName}</span>
        </span>
      </div>

      {/* Notifications dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            Notificaciones
            {unreadCount > 0 && <Badge variant="secondary">{unreadCount} nuevas</Badge>}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
              <div className="flex w-full items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {notification.unread && <div className="h-2 w-2 bg-blue-500 rounded-full ml-2 mt-1" />}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-center text-sm text-muted-foreground">
            Ver todas las notificaciones
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout button with confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder a tu
              cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Cerrar sesión</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}