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
import { Plus, Pencil, Trash2, School, Users, BookOpen } from 'lucide-react';

interface Prodi {
  id: number;
  kode: string;
  nama: string;
  ketua: string;
  mahasiswa: number;
  matakuliah: number;
  akreditasi: string;
}

const demoData: Prodi[] = [
  { id: 1, kode: 'TIF', nama: 'Teknik Informatika', ketua: 'Dr. Budi Santoso, M.Kom', mahasiswa: 456, matakuliah: 62, akreditasi: 'A' },
  { id: 2, kode: 'SIF', nama: 'Sistem Informasi', ketua: 'Dra. Siti Aminah, M.Si', mahasiswa: 389, matakuliah: 58, akreditasi: 'B' },
];

const ProdiPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: Column<Prodi>[] = [
    {
      key: 'kode',
      header: 'Kode',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg gradient-primary">
            <School className="h-5 w-5 text-white" />
          </div>
          <span className="font-mono font-bold text-lg">{item.kode}</span>
        </div>
      ),
    },
    {
      key: 'nama',
      header: 'Program Studi',
      render: (item) => (
        <div>
          <p className="font-medium">{item.nama}</p>
          <p className="text-sm text-muted-foreground">Ketua: {item.ketua}</p>
        </div>
      ),
    },
    {
      key: 'mahasiswa',
      header: 'Mahasiswa',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{item.mahasiswa}</span>
        </div>
      ),
    },
    {
      key: 'matakuliah',
      header: 'Mata Kuliah',
      render: (item) => (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span>{item.matakuliah}</span>
        </div>
      ),
    },
    {
      key: 'akreditasi',
      header: 'Akreditasi',
      render: (item) => (
        <Badge className={item.akreditasi === 'A' ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'}>
          Akreditasi {item.akreditasi}
        </Badge>
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
          <h1 className="font-display text-3xl font-bold tracking-tight">Program Studi</h1>
          <p className="text-muted-foreground">Kelola program studi yang tersedia</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Program Studi
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display">Tambah Program Studi</DialogTitle>
              <DialogDescription>
                Isi formulir berikut untuk menambahkan program studi baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kode">Kode Program</Label>
                  <Input id="kode" placeholder="TIF" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="akreditasi">Akreditasi</Label>
                  <Input id="akreditasi" placeholder="A" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Program Studi</Label>
                <Input id="nama" placeholder="Teknik Informatika" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ketua">Ketua Program</Label>
                <Input id="ketua" placeholder="Nama ketua program" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea id="deskripsi" placeholder="Deskripsi program studi..." rows={3} />
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

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <School className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">2</p>
                <p className="text-sm text-muted-foreground">Program Studi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/20">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">845</p>
                <p className="text-sm text-muted-foreground">Total Mahasiswa</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">120</p>
                <p className="text-sm text-muted-foreground">Total Mata Kuliah</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Daftar Program Studi</CardTitle>
          <CardDescription>Semua program studi terdaftar di institusi</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={demoData}
            searchPlaceholder="Cari program studi..."
            searchKey="nama"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProdiPage;
