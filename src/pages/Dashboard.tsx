import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Award,
} from 'lucide-react';

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color = 'primary',
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: { value: number; label: string };
  color?: 'primary' | 'accent' | 'success' | 'warning';
}) => {
  const colorClasses = {
    primary: 'from-primary/10 to-primary/5 text-primary',
    accent: 'from-accent/20 to-accent/10 text-accent-foreground',
    success: 'from-green-500/10 to-green-500/5 text-green-600',
    warning: 'from-yellow-500/10 to-yellow-500/5 text-yellow-600',
  };

  const iconBgClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/20 text-accent-foreground',
    success: 'bg-green-500/10 text-green-600',
    warning: 'bg-yellow-500/10 text-yellow-600',
  };

  return (
    <Card className="hover-lift overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-display font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500 font-medium">+{trend.value}%</span>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Mahasiswa"
        value="1,234"
        description="Mahasiswa aktif"
        icon={GraduationCap}
        trend={{ value: 12, label: 'dari tahun lalu' }}
        color="primary"
      />
      <StatCard
        title="Total Dosen"
        value="86"
        description="Dosen pengajar aktif"
        icon={Users}
        color="accent"
      />
      <StatCard
        title="Mata Kuliah"
        value="124"
        description="Mata kuliah tersedia"
        icon={BookOpen}
        color="success"
      />
      <StatCard
        title="Program Studi"
        value="2"
        description="TI dan SI"
        icon={Award}
        color="warning"
      />
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Aktivitas Terkini</CardTitle>
          <CardDescription>Ringkasan aktivitas sistem hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: '45 mahasiswa mengisi KRS', time: '2 jam lalu', status: 'success' },
              { icon: FileText, text: '12 nilai mata kuliah diinput', time: '3 jam lalu', status: 'info' },
              { icon: Users, text: '3 dosen baru ditambahkan', time: '5 jam lalu', status: 'info' },
              { icon: AlertCircle, text: '8 KRS menunggu persetujuan', time: '1 hari lalu', status: 'warning' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <activity.icon
                  className={`h-5 w-5 ${
                    activity.status === 'success'
                      ? 'text-green-500'
                      : activity.status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Kalender Akademik</CardTitle>
          <CardDescription>Semester Genap 2025/2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Mulai Kuliah', date: '3 Feb 2026', status: 'completed' },
              { label: 'Pengisian KRS', date: '27 Jan - 2 Feb 2026', status: 'active' },
              { label: 'UTS', date: '16-28 Mar 2026', status: 'upcoming' },
              { label: 'UAS', date: '25 Mei - 6 Jun 2026', status: 'upcoming' },
              { label: 'Input Nilai', date: '8-20 Jun 2026', status: 'upcoming' },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    event.status === 'completed'
                      ? 'bg-green-500'
                      : event.status === 'active'
                      ? 'bg-accent animate-pulse'
                      : 'bg-muted-foreground/30'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.label}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                {event.status === 'active' && (
                  <Badge className="bg-accent text-accent-foreground">Aktif</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const DosenDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Mata Kuliah Diampu" value="4" description="Semester ini" icon={BookOpen} color="primary" />
      <StatCard title="Total Mahasiswa" value="156" description="Di semua kelas" icon={GraduationCap} color="accent" />
      <StatCard title="Jadwal Mengajar" value="12" description="Pertemuan/minggu" icon={Clock} color="success" />
      <StatCard title="Nilai Belum Input" value="2" description="Kelas" icon={FileText} color="warning" />
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="font-display">Jadwal Mengajar Hari Ini</CardTitle>
        <CardDescription>Senin, 12 Januari 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { time: '08:00 - 10:30', course: 'Pemrograman Web', room: 'Lab Komputer 1', class: 'TI-2021-A' },
            { time: '13:00 - 15:30', course: 'Basis Data', room: 'Ruang A201', class: 'TI-2021-B' },
          ].map((schedule, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="text-center min-w-[80px]">
                <p className="text-xs text-muted-foreground">Pukul</p>
                <p className="font-medium text-sm">{schedule.time}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium">{schedule.course}</p>
                <p className="text-sm text-muted-foreground">{schedule.class} • {schedule.room}</p>
              </div>
              <Badge variant="outline">Aktif</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const MahasiswaDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="SKS Diambil" value="21" description="Semester ini" icon={BookOpen} color="primary" />
      <StatCard title="IPK" value="3.67" description="Kumulatif" icon={Award} color="accent" />
      <StatCard title="Mata Kuliah" value="7" description="Terdaftar" icon={FileText} color="success" />
      <StatCard title="Kehadiran" value="94%" description="Rata-rata" icon={CheckCircle2} color="warning" />
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Jadwal Hari Ini</CardTitle>
          <CardDescription>Senin, 12 Januari 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '08:00 - 10:30', course: 'Pemrograman Web', room: 'Lab Komputer 1', lecturer: 'Dr. Budi Santoso' },
              { time: '10:30 - 12:00', course: 'Jaringan Komputer', room: 'Ruang B101', lecturer: 'Ir. Ahmad Yani' },
              { time: '13:00 - 15:30', course: 'Basis Data', room: 'Ruang A201', lecturer: 'Dr. Budi Santoso' },
            ].map((schedule, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="text-center min-w-[80px]">
                  <p className="font-medium text-sm">{schedule.time}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{schedule.course}</p>
                  <p className="text-sm text-muted-foreground">{schedule.lecturer}</p>
                  <p className="text-xs text-muted-foreground">{schedule.room}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Nilai Terbaru</CardTitle>
          <CardDescription>Mata kuliah semester lalu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { course: 'Algoritma & Pemrograman', grade: 'A', score: 88 },
              { course: 'Matematika Diskrit', grade: 'B+', score: 78 },
              { course: 'Struktur Data', grade: 'A-', score: 82 },
              { course: 'Sistem Operasi', grade: 'A', score: 90 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{item.course}</p>
                  <p className="text-xs text-muted-foreground">Nilai: {item.score}</p>
                </div>
                <Badge
                  className={
                    item.grade.startsWith('A')
                      ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                      : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                  }
                >
                  {item.grade}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const greetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {greetings()}, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Berikut ringkasan aktivitas akademik Anda hari ini
        </p>
      </div>

      {user.role === 'administrator' || user.role === 'akademik' ? (
        <AdminDashboard />
      ) : user.role === 'dosen' ? (
        <DosenDashboard />
      ) : (
        <MahasiswaDashboard />
      )}
    </div>
  );
};

export default Dashboard;
