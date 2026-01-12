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
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';

interface Matakuliah {
  id: number;
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  prodi: string;
  wajib: boolean;
  prasyarat?: string;
}

const demoData: Matakuliah[] = [
  { id: 1, kode: 'TIF101', nama: 'Algoritma & Pemrograman', sks: 4, semester: 1, prodi: 'Teknik Informatika', wajib: true },
  { id: 2, kode: 'TIF102', nama: 'Matematika Diskrit', sks: 3, semester: 1, prodi: 'Teknik Informatika', wajib: true },
  { id: 3, kode: 'TIF201', nama: 'Struktur Data', sks: 4, semester: 2, prodi: 'Teknik Informatika', wajib: true, prasyarat: 'TIF101' },
  { id: 4, kode: 'TIF202', nama: 'Basis Data', sks: 4, semester: 3, prodi: 'Teknik Informatika', wajib: true },
  { id: 5, kode: 'TIF301', nama: 'Pemrograman Web', sks: 3, semester: 4, prodi: 'Teknik Informatika', wajib: true, prasyarat: 'TIF201' },
  { id: 6, kode: 'TIF302', nama: 'Jaringan Komputer', sks: 3, semester: 4, prodi: 'Teknik Informatika', wajib: true },
  { id: 7, kode: 'TIF401', nama: 'Kecerdasan Buatan', sks: 3, semester: 5, prodi: 'Teknik Informatika', wajib: false, prasyarat: 'TIF201' },
  { id: 8, kode: 'SIF101', nama: 'Pengantar Sistem Informasi', sks: 3, semester: 1, prodi: 'Sistem Informasi', wajib: true },
  { id: 9, kode: 'SIF201', nama: 'Analisis Sistem', sks: 3, semester: 3, prodi: 'Sistem Informasi', wajib: true },
  { id: 10, kode: 'SIF301', nama: 'Manajemen Proyek TI', sks: 3, semester: 5, prodi: 'Sistem Informasi', wajib: false },
];

const MatakuliahPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns: Column<Matakuliah>[] = [
    {
      key: 'kode',
      header: 'Kode',
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <span className="font-mono font-medium">{item.kode}</span>
        </div>
      ),
    },
    {
      key: 'nama',
      header: 'Nama Mata Kuliah',
      render: (item) => (
        <div>
          <p className="font-medium">{item.nama}</p>
          {item.prasyarat && (
            <p className="text-xs text-muted-foreground">Prasyarat: {item.prasyarat}</p>
          )}
        </div>
      ),
    },
    {
      key: 'sks',
      header: 'SKS',
      render: (item) => (
        <Badge variant="outline" className="font-mono">
          {item.sks} SKS
        </Badge>
      ),
    },
    {
      key: 'semester',
      header: 'Semester',
      render: (item) => <span className="text-muted-foreground">Semester {item.semester}</span>,
    },
    {
      key: 'prodi',
      header: 'Program Studi',
      render: (item) => (
        <Badge className={item.prodi === 'Teknik Informatika' ? 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20' : 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20'}>
          {item.prodi === 'Teknik Informatika' ? 'TI' : 'SI'}
        </Badge>
      ),
    },
    {
      key: 'wajib',
      header: 'Jenis',
      render: (item) => (
        <Badge className={item.wajib ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' : 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20'}>
          {item.wajib ? 'Wajib' : 'Pilihan'}
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
          <h1 className="font-display text-3xl font-bold tracking-tight">Manajemen Mata Kuliah</h1>
          <p className="text-muted-foreground">Kelola daftar mata kuliah yang ditawarkan</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Mata Kuliah
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display">Tambah Mata Kuliah Baru</DialogTitle>
              <DialogDescription>
                Isi formulir berikut untuk menambahkan mata kuliah baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kode">Kode Mata Kuliah</Label>
                  <Input id="kode" placeholder="TIF101" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sks">SKS</Label>
                  <Input id="sks" type="number" min={1} max={6} placeholder="3" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Mata Kuliah</Label>
                <Input id="nama" placeholder="Algoritma & Pemrograman" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea id="deskripsi" placeholder="Deskripsi mata kuliah..." rows={3} />
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
                  <Label>Semester</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={String(sem)}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Jenis</Label>
                  <Select defaultValue="wajib">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wajib">Wajib</SelectItem>
                      <SelectItem value="pilihan">Pilihan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Prasyarat</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tidak ada" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak ada</SelectItem>
                      <SelectItem value="tif101">TIF101</SelectItem>
                      <SelectItem value="tif201">TIF201</SelectItem>
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

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Daftar Mata Kuliah</CardTitle>
          <CardDescription>Total {demoData.length} mata kuliah tersedia</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={demoData}
            searchPlaceholder="Cari kode atau nama..."
            searchKey="nama"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MatakuliahPage;
