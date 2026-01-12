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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Download, Upload, Pencil, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Mahasiswa {
  id: number;
  nim: string;
  nama: string;
  email: string;
  prodi: string;
  kelas: string;
  tahun_masuk: number;
  status: 'aktif' | 'nonaktif' | 'lulus' | 'cuti';
}

const demoData: Mahasiswa[] = [
  { id: 1, nim: '2021001', nama: 'Ahmad Rizki Pratama', email: '2021001@mahasiswa.siak.ac.id', prodi: 'Teknik Informatika', kelas: '2021-A', tahun_masuk: 2021, status: 'aktif' },
  { id: 2, nim: '2021002', nama: 'Siti Nurhaliza', email: '2021002@mahasiswa.siak.ac.id', prodi: 'Teknik Informatika', kelas: '2021-A', tahun_masuk: 2021, status: 'aktif' },
  { id: 3, nim: '2021003', nama: 'Budi Setiawan', email: '2021003@mahasiswa.siak.ac.id', prodi: 'Sistem Informasi', kelas: '2021-B', tahun_masuk: 2021, status: 'aktif' },
  { id: 4, nim: '2021004', nama: 'Dewi Lestari', email: '2021004@mahasiswa.siak.ac.id', prodi: 'Teknik Informatika', kelas: '2021-A', tahun_masuk: 2021, status: 'cuti' },
  { id: 5, nim: '2020001', nama: 'Rudi Hartono', email: '2020001@mahasiswa.siak.ac.id', prodi: 'Sistem Informasi', kelas: '2020-A', tahun_masuk: 2020, status: 'aktif' },
  { id: 6, nim: '2020002', nama: 'Maya Sari', email: '2020002@mahasiswa.siak.ac.id', prodi: 'Teknik Informatika', kelas: '2020-B', tahun_masuk: 2020, status: 'lulus' },
  { id: 7, nim: '2022001', nama: 'Andi Firmansyah', email: '2022001@mahasiswa.siak.ac.id', prodi: 'Teknik Informatika', kelas: '2022-A', tahun_masuk: 2022, status: 'aktif' },
  { id: 8, nim: '2022002', nama: 'Putri Anggraini', email: '2022002@mahasiswa.siak.ac.id', prodi: 'Sistem Informasi', kelas: '2022-A', tahun_masuk: 2022, status: 'aktif' },
];

const getStatusBadge = (status: Mahasiswa['status']) => {
  const variants: Record<typeof status, { className: string; label: string }> = {
    aktif: { className: 'bg-green-500/10 text-green-600 hover:bg-green-500/20', label: 'Aktif' },
    nonaktif: { className: 'bg-red-500/10 text-red-600 hover:bg-red-500/20', label: 'Non-aktif' },
    lulus: { className: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20', label: 'Lulus' },
    cuti: { className: 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20', label: 'Cuti' },
  };
  const { className, label } = variants[status];
  return <Badge className={className}>{label}</Badge>;
};

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const MahasiswaPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: Column<Mahasiswa>[] = [
    {
      key: 'nama',
      header: 'Mahasiswa',
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {getInitials(item.nama)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.nama}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'nim',
      header: 'NIM',
      render: (item) => <span className="font-mono">{item.nim}</span>,
    },
    {
      key: 'prodi',
      header: 'Program Studi',
    },
    {
      key: 'kelas',
      header: 'Kelas',
    },
    {
      key: 'tahun_masuk',
      header: 'Angkatan',
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => getStatusBadge(item.status),
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
          <h1 className="font-display text-3xl font-bold tracking-tight">Manajemen Mahasiswa</h1>
          <p className="text-muted-foreground">Kelola data mahasiswa terdaftar</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Mahasiswa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="font-display">Tambah Mahasiswa Baru</DialogTitle>
                <DialogDescription>
                  Isi formulir berikut untuk menambahkan mahasiswa baru
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nim">NIM</Label>
                    <Input id="nim" placeholder="Masukkan NIM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input id="nama" placeholder="Masukkan nama" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@mahasiswa.siak.ac.id" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Program Studi</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih prodi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ti">Teknik Informatika</SelectItem>
                        <SelectItem value="si">Sistem Informasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Kelas</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-a">2024-A</SelectItem>
                        <SelectItem value="2024-b">2024-B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tahun">Tahun Masuk</Label>
                    <Input id="tahun" type="number" placeholder="2024" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue="aktif">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="nonaktif">Non-aktif</SelectItem>
                        <SelectItem value="cuti">Cuti</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Daftar Mahasiswa</CardTitle>
          <CardDescription>Total {demoData.length} mahasiswa terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={demoData}
            searchPlaceholder="Cari nama atau NIM..."
            searchKey="nama"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MahasiswaPage;
