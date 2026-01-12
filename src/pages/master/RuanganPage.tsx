import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, DoorOpen, Monitor, Users } from 'lucide-react';

interface Ruangan {
  id: number;
  kode: string;
  nama: string;
  gedung: string;
  lantai: number;
  kapasitas: number;
  jenis: 'kelas' | 'laboratorium' | 'kantor';
  fasilitas: string;
}

const demoData: Ruangan[] = [
  { id: 1, kode: 'A101', nama: 'Ruang Kelas A101', gedung: 'Gedung A', lantai: 1, kapasitas: 40, jenis: 'kelas', fasilitas: 'AC, Proyektor, Whiteboard' },
  { id: 2, kode: 'A201', nama: 'Ruang Kelas A201', gedung: 'Gedung A', lantai: 2, kapasitas: 40, jenis: 'kelas', fasilitas: 'AC, Proyektor, Whiteboard' },
  { id: 3, kode: 'B101', nama: 'Lab Komputer 1', gedung: 'Gedung B', lantai: 1, kapasitas: 35, jenis: 'laboratorium', fasilitas: 'AC, 35 PC, Proyektor' },
  { id: 4, kode: 'B102', nama: 'Lab Komputer 2', gedung: 'Gedung B', lantai: 1, kapasitas: 35, jenis: 'laboratorium', fasilitas: 'AC, 35 PC, Proyektor' },
  { id: 5, kode: 'B201', nama: 'Lab Jaringan', gedung: 'Gedung B', lantai: 2, kapasitas: 30, jenis: 'laboratorium', fasilitas: 'AC, Router, Switch, Kabel UTP' },
  { id: 6, kode: 'C101', nama: 'Ruang Dosen TI', gedung: 'Gedung C', lantai: 1, kapasitas: 20, jenis: 'kantor', fasilitas: 'AC, Meja Kerja' },
];

const getJenisBadge = (jenis: Ruangan['jenis']) => {
  const variants = {
    kelas: { className: 'bg-blue-500/10 text-blue-600', icon: DoorOpen },
    laboratorium: { className: 'bg-green-500/10 text-green-600', icon: Monitor },
    kantor: { className: 'bg-yellow-500/10 text-yellow-600', icon: Users },
  };
  const { className } = variants[jenis];
  const labels = { kelas: 'Kelas', laboratorium: 'Lab', kantor: 'Kantor' };
  return <Badge className={className}>{labels[jenis]}</Badge>;
};

const RuanganPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: Column<Ruangan>[] = [
    {
      key: 'kode',
      header: 'Kode',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            item.jenis === 'kelas' ? 'bg-blue-500/10' :
            item.jenis === 'laboratorium' ? 'bg-green-500/10' : 'bg-yellow-500/10'
          }`}>
            {item.jenis === 'kelas' ? <DoorOpen className="h-4 w-4 text-blue-600" /> :
             item.jenis === 'laboratorium' ? <Monitor className="h-4 w-4 text-green-600" /> :
             <Users className="h-4 w-4 text-yellow-600" />}
          </div>
          <span className="font-mono font-medium">{item.kode}</span>
        </div>
      ),
    },
    {
      key: 'nama',
      header: 'Nama Ruangan',
    },
    {
      key: 'gedung',
      header: 'Lokasi',
      render: (item) => (
        <div>
          <p>{item.gedung}</p>
          <p className="text-xs text-muted-foreground">Lantai {item.lantai}</p>
        </div>
      ),
    },
    {
      key: 'jenis',
      header: 'Jenis',
      render: (item) => getJenisBadge(item.jenis),
    },
    {
      key: 'kapasitas',
      header: 'Kapasitas',
      render: (item) => <span>{item.kapasitas} orang</span>,
    },
    {
      key: 'fasilitas',
      header: 'Fasilitas',
      render: (item) => (
        <p className="text-sm text-muted-foreground max-w-[200px] truncate">{item.fasilitas}</p>
      ),
    },
    {
      key: 'actions',
      header: 'Aksi',
      className: 'text-right',
      render: () => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Manajemen Ruangan</h1>
          <p className="text-muted-foreground">Kelola ruang kelas, laboratorium, dan kantor</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Ruangan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display">Tambah Ruangan Baru</DialogTitle>
              <DialogDescription>
                Isi formulir berikut untuk menambahkan ruangan baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kode">Kode Ruangan</Label>
                  <Input id="kode" placeholder="A101" />
                </div>
                <div className="space-y-2">
                  <Label>Jenis Ruangan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kelas">Ruang Kelas</SelectItem>
                      <SelectItem value="laboratorium">Laboratorium</SelectItem>
                      <SelectItem value="kantor">Kantor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Ruangan</Label>
                <Input id="nama" placeholder="Ruang Kelas A101" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gedung">Gedung</Label>
                  <Input id="gedung" placeholder="Gedung A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lantai">Lantai</Label>
                  <Input id="lantai" type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kapasitas">Kapasitas</Label>
                  <Input id="kapasitas" type="number" placeholder="40" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fasilitas">Fasilitas</Label>
                <Textarea id="fasilitas" placeholder="AC, Proyektor, Whiteboard" rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setIsOpen(false)}>Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <DoorOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {demoData.filter(r => r.jenis === 'kelas').length}
                </p>
                <p className="text-sm text-muted-foreground">Ruang Kelas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {demoData.filter(r => r.jenis === 'laboratorium').length}
                </p>
                <p className="text-sm text-muted-foreground">Laboratorium</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/10">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {demoData.filter(r => r.jenis === 'kantor').length}
                </p>
                <p className="text-sm text-muted-foreground">Kantor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Daftar Ruangan</CardTitle>
          <CardDescription>Total {demoData.length} ruangan tersedia</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={demoData}
            searchPlaceholder="Cari ruangan..."
            searchKey="nama"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RuanganPage;
