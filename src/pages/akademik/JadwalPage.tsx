import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Clock, BookOpen, Users } from 'lucide-react';

const scheduleData = [
  { day: 'Senin', schedules: [
    { time: '08:00 - 10:30', course: 'Pemrograman Web', room: 'Lab Komputer 1', class: 'TI-2021-A', lecturer: 'Dr. Budi Santoso' },
    { time: '10:30 - 12:00', course: 'Jaringan Komputer', room: 'Ruang A201', class: 'TI-2021-A', lecturer: 'Ir. Ahmad Yani' },
    { time: '13:00 - 15:30', course: 'Basis Data', room: 'Ruang A201', class: 'TI-2021-B', lecturer: 'Dr. Budi Santoso' },
  ]},
  { day: 'Selasa', schedules: [
    { time: '08:00 - 10:30', course: 'Struktur Data', room: 'Lab Komputer 2', class: 'TI-2022-A', lecturer: 'Prof. Dr. Hendra Wijaya' },
    { time: '13:00 - 15:30', course: 'Kecerdasan Buatan', room: 'Ruang B101', class: 'TI-2021-A', lecturer: 'Dr. Rudi Hartono' },
  ]},
  { day: 'Rabu', schedules: [
    { time: '08:00 - 10:30', course: 'Sistem Operasi', room: 'Ruang A101', class: 'TI-2022-A', lecturer: 'Ir. Ahmad Yani' },
    { time: '10:30 - 12:00', course: 'Matematika Diskrit', room: 'Ruang A102', class: 'TI-2024-A', lecturer: 'Dra. Siti Aminah' },
    { time: '13:00 - 15:30', course: 'Analisis Sistem', room: 'Ruang B201', class: 'SI-2022-A', lecturer: 'Dra. Siti Aminah' },
  ]},
  { day: 'Kamis', schedules: [
    { time: '08:00 - 10:30', course: 'Pemrograman Web', room: 'Lab Komputer 1', class: 'TI-2021-B', lecturer: 'Dr. Budi Santoso' },
    { time: '10:30 - 12:00', course: 'Manajemen Proyek TI', room: 'Ruang C101', class: 'SI-2021-A', lecturer: 'Dewi Lestari' },
  ]},
  { day: 'Jumat', schedules: [
    { time: '08:00 - 10:30', course: 'Algoritma & Pemrograman', room: 'Lab Komputer 1', class: 'TI-2024-A', lecturer: 'Prof. Dr. Hendra Wijaya' },
    { time: '13:00 - 14:30', course: 'Pengantar Sistem Informasi', room: 'Ruang A201', class: 'SI-2024-A', lecturer: 'Dra. Siti Aminah' },
  ]},
];

const JadwalPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Jadwal Kuliah</h1>
          <p className="text-muted-foreground">Semester Genap 2025/2026</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Minggu 2, Januari 2026</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">42</p>
                <p className="text-sm text-muted-foreground">Total Jadwal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/20">
                <BookOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">28</p>
                <p className="text-sm text-muted-foreground">Mata Kuliah</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">12</p>
                <p className="text-sm text-muted-foreground">Dosen Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">16</p>
                <p className="text-sm text-muted-foreground">Pertemuan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Grid */}
      <div className="grid gap-4 lg:grid-cols-5">
        {scheduleData.map((day) => (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="bg-muted/50 py-3">
              <CardTitle className="font-display text-lg text-center">{day.day}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {day.schedules.map((schedule, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-background border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <p className="text-xs font-medium text-primary mb-1">{schedule.time}</p>
                  <p className="font-medium text-sm leading-tight">{schedule.course}</p>
                  <p className="text-xs text-muted-foreground mt-1">{schedule.lecturer}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      {schedule.class}
                    </Badge>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      {schedule.room}
                    </Badge>
                  </div>
                </div>
              ))}
              {day.schedules.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">
                  Tidak ada jadwal
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Detailed Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Jadwal Hari Ini - Senin</CardTitle>
          <CardDescription>Detail jadwal perkuliahan hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleData[0].schedules.map((schedule, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="text-center min-w-[100px]">
                  <p className="text-xs text-muted-foreground">Waktu</p>
                  <p className="font-medium">{schedule.time}</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="flex-1">
                  <p className="font-medium text-lg">{schedule.course}</p>
                  <p className="text-sm text-muted-foreground">{schedule.lecturer}</p>
                </div>
                <div className="text-right">
                  <Badge>{schedule.class}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{schedule.room}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JadwalPage;
