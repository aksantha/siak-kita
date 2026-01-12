import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  Settings,
  Home,
  School,
  DoorOpen,
  UserCog,
  FileText,
  Award,
  Clock,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  roles: UserRole[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    label: 'Umum',
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: Home, roles: ['administrator', 'akademik', 'dosen', 'mahasiswa'] },
    ],
  },
  {
    label: 'Master Data',
    items: [
      { title: 'Institusi', url: '/master/institusi', icon: Building2, roles: ['administrator'] },
      { title: 'Program Studi', url: '/master/prodi', icon: School, roles: ['administrator'] },
      { title: 'Kelas', url: '/master/kelas', icon: Users, roles: ['administrator', 'akademik'] },
      { title: 'Ruangan', url: '/master/ruangan', icon: DoorOpen, roles: ['administrator', 'akademik'] },
      { title: 'Mata Kuliah', url: '/master/matakuliah', icon: BookOpen, roles: ['administrator', 'akademik'] },
      { title: 'Dosen', url: '/master/dosen', icon: UserCog, roles: ['administrator', 'akademik'] },
      { title: 'Mahasiswa', url: '/master/mahasiswa', icon: GraduationCap, roles: ['administrator', 'akademik'] },
    ],
  },
  {
    label: 'Akademik',
    items: [
      { title: 'Kalender Akademik', url: '/akademik/kalender', icon: Calendar, roles: ['administrator', 'akademik', 'dosen', 'mahasiswa'] },
      { title: 'Jadwal Kuliah', url: '/akademik/jadwal', icon: Clock, roles: ['administrator', 'akademik', 'dosen', 'mahasiswa'] },
      { title: 'KRS', url: '/akademik/krs', icon: ClipboardList, roles: ['akademik', 'mahasiswa'] },
      { title: 'Input Nilai', url: '/akademik/nilai', icon: FileText, roles: ['dosen'] },
      { title: 'KHS', url: '/akademik/khs', icon: Award, roles: ['mahasiswa'] },
      { title: 'Transkrip', url: '/akademik/transkrip', icon: FileText, roles: ['mahasiswa'] },
    ],
  },
  {
    label: 'Laporan',
    items: [
      { title: 'Statistik', url: '/laporan/statistik', icon: BarChart3, roles: ['administrator', 'akademik'] },
    ],
  },
  {
    label: 'Pengaturan',
    items: [
      { title: 'Pengaturan', url: '/settings', icon: Settings, roles: ['administrator'] },
    ],
  },
];

export const AppSidebar = () => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      administrator: 'bg-red-500/20 text-red-300',
      akademik: 'bg-blue-500/20 text-blue-300',
      dosen: 'bg-green-500/20 text-green-300',
      mahasiswa: 'bg-yellow-500/20 text-yellow-300',
    };
    return colors[role];
  };

  const getRoleLabel = (role: UserRole) => {
    const labels: Record<UserRole, string> = {
      administrator: 'Administrator',
      akademik: 'Staff Akademik',
      dosen: 'Dosen',
      mahasiswa: 'Mahasiswa',
    };
    return labels[role];
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-accent">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-sidebar-foreground">SIAK</span>
            <span className="text-xs text-sidebar-foreground/60">Sistem Akademik</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigation.map((group) => {
          const filteredItems = group.items.filter(item => item.roles.includes(user.role));
          if (filteredItems.length === 0) return null;

          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs font-medium uppercase tracking-wider px-3">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={cn(
                            'transition-all duration-200',
                            isActive && 'bg-sidebar-accent text-sidebar-primary'
                          )}
                        >
                          <Link to={item.url}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
              <Avatar className="h-9 w-9 border-2 border-sidebar-primary">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground text-sm font-medium">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start text-left">
                <span className="text-sm font-medium text-sidebar-foreground truncate max-w-[140px]">
                  {user.name}
                </span>
                <span className={cn('text-xs px-2 py-0.5 rounded-full', getRoleBadgeColor(user.role))}>
                  {getRoleLabel(user.role)}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              Demo: Ganti Role
            </div>
            <DropdownMenuSeparator />
            {(['administrator', 'akademik', 'dosen', 'mahasiswa'] as UserRole[]).map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => switchRole(role)}
                className={cn(user.role === role && 'bg-accent')}
              >
                {getRoleLabel(role)}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
